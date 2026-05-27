import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { domainAPI } from '../../api/services';
import CompactDomainTicker from '../home/domainTicker/CompactDomainTicker';

export default function DomainSearchBar({ className = '', embedded = false }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [tldOptions, setTldOptions] = useState([]);
  const [searchExtensions, setSearchExtensions] = useState([]);
  const [registerUrl, setRegisterUrl] = useState('');
  const [configError, setConfigError] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    domainAPI
      .getConfig()
      .then(({ data }) => {
        if (cancelled) return;
        const options = Array.isArray(data.tldOptions) ? data.tldOptions : [];
        const extensions = Array.isArray(data.searchExtensions) ? data.searchExtensions : [];
        setTldOptions(options);
        setSearchExtensions(extensions);
        setRegisterUrl(typeof data.registerUrl === 'string' ? data.registerUrl : '');
        setConfigError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setConfigError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            'Could not load domain search settings from server'
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const buildRegisterUrl = (name, ext) => {
    if (!registerUrl) return null;
    const sep = registerUrl.includes('?') ? '&' : '?';
    return `${registerUrl}${sep}domain=${encodeURIComponent(name)}&tld=${encodeURIComponent(ext)}`;
  };

  const parseQuery = (raw) => {
    if (!searchExtensions.length && !tldOptions.length) return null;
    const q = raw.trim().toLowerCase();
    if (!q) return null;
    const dot = q.indexOf('.');
    if (dot !== -1) {
      const name = q.slice(0, dot).replace(/[^a-z0-9-]/g, '');
      const ext = q.slice(dot + 1).replace(/[^a-z0-9-]/g, '');
      if (!name || !ext) return null;
      return [{ name, ext }];
    }
    const label = q.replace(/[^a-z0-9-]/g, '');
    if (!label) return null;
    // All registrar-style TLDs from server config (no dropdown)
    const exts = tldOptions.length ? tldOptions : searchExtensions;
    return exts.map((ext) => ({ name: label, ext }));
  };

  const mapApiRow = (row) => ({
    domain: row.domain || `${row.name}.${row.extension || row.ext}`,
    name: row.name,
    ext: row.extension || row.ext,
    status: row.status,
    price: row.price ?? null,
    listing: row.listing ?? null,
    message: row.message ?? null,
  });

  const checkOne = async ({ name, ext }) => {
    const fullDomain = `${name}.${ext}`;
    try {
      const { data } = await domainAPI.check(fullDomain);
      return mapApiRow({ ...data, name, ext, domain: fullDomain });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Could not reach domain check service';
      return { domain: fullDomain, name, ext, status: 'error', price: null, listing: null, message };
    }
  };

  const checkMany = async (pairs) => {
    if (pairs.length === 1) {
      return [await checkOne(pairs[0])];
    }
    const label = pairs[0].name;
    const extensions = pairs.map((p) => p.ext).join(',');
    try {
      const { data } = await domainAPI.checkBulk(label, extensions);
      const rows = Array.isArray(data.results) ? data.results.map(mapApiRow) : [];
      if (rows.length > 0) return rows;
    } catch {
      // Production may not have /check-bulk yet — fall back to per-TLD checks
    }
    return Promise.all(pairs.map((pair) => checkOne(pair)));
  };

  const doSearch = async (raw) => {
    const pairs = parseQuery(raw);
    if (!pairs) return;
    setLoading(true);

    const skeleton = pairs.map(({ name, ext }) => ({
      domain: `${name}.${ext}`,
      name,
      ext,
      status: 'loading',
      price: null,
      listing: null,
      message: null,
    }));
    setResults(skeleton);

    const rows = await checkMany(pairs);
    // Keep same order as skeleton (com, net, …)
    const byDomain = Object.fromEntries(rows.map((r) => [r.domain, r]));
    setResults(skeleton.map((s) => byDomain[s.domain] ?? { ...s, status: 'error', message: 'No result' }));

    setLoading(false);
  };

  useEffect(() => {
    if (!query.trim() || configError || (!searchExtensions.length && !tldOptions.length)) {
      setResults([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 700);
    return () => clearTimeout(debounceRef.current);
  }, [query, searchExtensions, tldOptions, configError]);

  const handleSearch = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    doSearch(query);
  };

  const goToMarketplace = (listing) => {
    window.location.href = `/domains?highlight=${listing.id}`;
  };

  const goRegister = (name, ext) => {
    const url = buildRegisterUrl(name, ext);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  /** Single explicit domain (e.g. foo.com) → one hero card; label-only → grid of all TLDs */
  const multiTldSearch = results.length > 1;

  // ── Sub-components ──────────────────────────────────────────────────────────
  const Badge = ({ status }) => {
    const map = {
      loading:     ['bg-gray-100 text-gray-400',     'CHECKING…'],
      marketplace: ['bg-indigo-100 text-indigo-700', '🏪 ON OUR MARKETPLACE'],
      available:   ['bg-emerald-100 text-emerald-700','✓ AVAILABLE'],
      taken:       ['bg-red-100 text-red-500',        'TAKEN'],
      error:       ['bg-gray-100 text-gray-400',      'UNAVAILABLE'],
    };
    const [cls, label] = map[status] ?? map.taken;
    return (
      <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3 ${cls}`}>
        {label}
      </span>
    );
  };

  const Price = ({ result, large }) => {
    if (result.price == null || Number(result.price) <= 0) return null;
    const p = Number(result.price);
    return (
      <div className="mb-4">
        <p className={`text-gray-400 line-through ${large ? 'text-base' : 'text-xs'}`}>
          ₹{Math.round(p * 1.8).toLocaleString('en-IN')}
        </p>
        <p className={`font-extrabold text-gray-900 ${large ? 'text-3xl' : 'text-xl'}`}>
          ₹{p.toLocaleString('en-IN')}
          <span className={`font-normal text-gray-400 ml-1 ${large ? 'text-sm' : 'text-xs'}`}>/yr</span>
        </p>
      </div>
    );
  };

  const Action = ({ result, large }) => {
    const base = large
      ? 'px-8 py-3 rounded-xl font-bold text-base transition-all'
      : 'px-5 py-2 rounded-lg font-bold text-sm transition-all';

    if (result.status === 'loading')
      return <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />;

    if (result.status === 'marketplace' && result.listing?.id)
      return (
        <button onClick={() => goToMarketplace(result.listing)}
          className={`bg-indigo-600 text-white hover:bg-indigo-700 ${base}`}>
          View on Marketplace →
        </button>
      );

    if (result.status === 'error')
      return (
        <p className={`text-gray-500 ${large ? 'text-sm' : 'text-xs'} max-w-md`}>
          {result.message || 'Domain check unavailable. Try again later.'}
        </p>
      );

    if (result.status === 'available')
      return (
        <button onClick={() => goRegister(result.name, result.ext)}
          className={`bg-gray-900 text-white hover:bg-gray-700 ${base}`}>
          {large ? 'Register Now →' : 'Register'}
        </button>
      );

    return (
      <button disabled className={`bg-gray-100 text-gray-400 cursor-not-allowed ${base}`}>
        Taken
      </button>
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      className={`domain-search-bar relative z-20 w-full min-w-0 ${embedded ? 'py-0' : 'py-3 pl-4 pr-4 sm:py-4 sm:pl-6 sm:pr-5 md:pl-10 lg:pl-20 lg:pr-8'} ${className}`.trim()}
    >
      <div className={`w-full ${embedded ? '' : 'mx-auto max-w-[1200px]'}`}>

        {/* Desktop: compact search beside live domain feed */}
        <div className={`hidden lg:flex lg:flex-row lg:items-end gap-4 xl:gap-5 ${embedded ? 'lg:justify-start' : 'lg:justify-center'}`}>
          <form onSubmit={handleSearch}
            className="search-glow-focus flex w-full max-w-[700px] flex-[1_1_640px] flex-row items-center gap-2 overflow-hidden rounded-2xl border border-indigo-400/40 bg-black py-2 pl-4 pr-2 shadow-[0_4px_24px_rgba(99,102,241,0.12)] transition-all duration-300 sm:pl-5 sm:rounded-full xl:max-w-[740px]">
            <Search className="h-5 w-5 shrink-0 text-slate-400" strokeWidth={2} />
            <input
              type="text"
              className="min-w-0 flex-1 border-none bg-transparent py-3 text-[15px] text-white outline-none placeholder:text-gray-400 focus:ring-0 sm:text-base"
              placeholder={t('domainSearchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
  type="submit"
  className="shrink-0 rounded-full bg-white/95 backdrop-blur-md border border-purple-200 px-7 py-3 text-[14px] font-semibold text-gray-900 shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg"
>
  {t('search')}
</button>
          </form>
          <CompactDomainTicker className="hidden lg:block w-full max-w-[390px] flex-[0_1_390px] self-end xl:max-w-[430px] xl:basis-[430px]" />
        </div>

        {/* Mobile / tablet */}
        <div className="domain-search-bar-mobile lg:hidden flex flex-col items-stretch gap-3 sm:gap-4">
          <form
            onSubmit={handleSearch}
            className={`domain-search-bar-form search-glow-focus w-full min-w-0 flex flex-row items-center gap-2 bg-white rounded-full shadow-[0_8px_40px_rgba(99,102,241,0.2)] border-2 border-indigo-300/50 hover:border-indigo-400 hover:shadow-[0_12px_60px_rgba(99,102,241,0.35)] overflow-hidden pl-4 pr-2 py-2 sm:pl-5 sm:pr-2.5 sm:py-2 transition-all duration-300 ${embedded ? '' : 'mx-auto max-w-[760px]'}`}
          >
            <Search className="domain-search-bar-icon h-5 w-5 shrink-0 text-slate-400" strokeWidth={2} aria-hidden />
            <input
              type="text"
              className="domain-search-bar-input min-w-0 flex-1 border-none bg-transparent text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
              placeholder={t('domainSearchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="domain-search-bar-submit shrink-0 rounded-full bg-[#232f3e] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-700 sm:px-6 sm:py-2.5 sm:text-base"
            >
              {t('search')}
            </button>
          </form>
        </div>

        {configError && (
          <p className="mt-4 text-center text-sm text-red-500">{configError}</p>
        )}

        {/* Results */}
        <div className="mt-8">
          {loading && results.length > 0 && results.every((r) => r.status === 'loading') && (
            <p className="text-center text-gray-400 text-sm mb-6">Checking domains…</p>
          )}

          {multiTldSearch && results.length > 0 && results[0]?.name && (
            <p className="text-center text-gray-500 text-sm mb-4">
              <span className="font-semibold text-gray-700">{results[0].name}</span>
              {' · '}availability and pricing across extensions
            </p>
          )}

          {/* Single explicit domain (e.g. name.com): one featured card */}
          {!multiTldSearch && results[0] && (
            <div
              className={`mb-8 bg-white rounded-3xl p-8 shadow-xl border-2 transition-all ${
                results[0].status === 'marketplace'
                  ? 'border-indigo-400'
                  : results[0].status === 'available'
                    ? 'border-emerald-400'
                    : results[0].status === 'loading'
                      ? 'border-gray-200'
                      : 'border-red-200'
              }`}
            >
              <Badge status={results[0].status} />
              <h2
                className={`text-4xl font-extrabold mb-4 ${
                  results[0].status === 'taken' || results[0].status === 'error'
                    ? 'text-gray-300 line-through'
                    : 'text-gray-900'
                }`}
              >
                {results[0].name}
                <span
                  className={
                    results[0].status === 'taken' || results[0].status === 'error'
                      ? 'text-purple-200'
                      : 'text-purple-600'
                  }
                >
                  .{results[0].ext}
                </span>
              </h2>

              {results[0].status === 'marketplace' && results[0].listing && (
                <p className="text-indigo-600 font-semibold mb-5">
                  Asking ₹{Number(results[0].listing.askingPrice).toLocaleString('en-IN')}
                  {results[0].listing.pricingDemand ? ` · ${results[0].listing.pricingDemand}` : ''}
                </p>
              )}

              {results[0].status === 'available' && <Price result={results[0]} large />}

              <Action result={results[0]} large />
            </div>
          )}

          {/* Label-only search: registrar-style grid of every TLD + price */}
          {multiTldSearch && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((item, i) => (
                <div
                  key={item.domain || i}
                  className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all ${
                    item.status === 'taken'
                      ? 'border-gray-100 opacity-60'
                      : item.status === 'error'
                        ? 'border-gray-100 opacity-60'
                        : item.status === 'marketplace'
                          ? 'border-indigo-200'
                          : item.status === 'available'
                            ? 'border-emerald-200'
                            : 'border-gray-200'
                  }`}
                >
                  <Badge status={item.status} />
                  <h2
                    className={`text-lg font-extrabold mb-2 ${
                      item.status === 'taken' || item.status === 'error'
                        ? 'text-gray-300 line-through'
                        : 'text-gray-900'
                    }`}
                  >
                    {item.name}
                    <span
                      className={
                        item.status === 'taken' || item.status === 'error'
                          ? 'text-purple-200'
                          : 'text-purple-500'
                      }
                    >
                      .{item.ext}
                    </span>
                  </h2>

                  {item.status === 'marketplace' && item.listing && (
                    <p className="text-indigo-600 text-sm font-semibold mb-2">
                      ₹{Number(item.listing.askingPrice).toLocaleString('en-IN')} · Marketplace
                    </p>
                  )}

                  {item.status === 'available' && <Price result={item} large={false} />}

                  <Action result={item} large={false} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .search-glow-focus {
          box-shadow:
            -12px 0 20px -6px rgba(0,195,255,0.35),
            12px 0 20px -6px rgba(255,48,108,0.35),
            0 0 14px -3px rgba(120,80,220,0.25);
          border-color: rgba(120,80,220,0.35);
        }
      `}</style>
    </div>
  );
}
