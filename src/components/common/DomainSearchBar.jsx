import { useState, useEffect, useRef } from 'react';

const TLDS = ['com', 'net', 'org', 'in', 'co', 'io', 'ai'];
const OP_BASE = 'https://api.openprovider.eu/v1beta';
const PROXY   = 'https://corsproxy.io/?url=';

// Token cache
let _token  = null;
let _expiry = 0;

async function getToken() {
  if (_token && Date.now() < _expiry) return _token;
  const res  = await fetch(`https://backend.cobrother.com/api/v1/domain/check?name=${fullDomain}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const data = await res.json();
  
  if (data.code !== 0) throw new Error('Auth failed');
  _token  = data.data.token;
  _expiry = Date.now() + 20 * 60 * 1000;
  return _token;
}

async function opCheck(name, ext) {
  const token = await getToken();
  const res = await fetch(`${PROXY}${encodeURIComponent(`${OP_BASE}/domains/check`)}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body:    JSON.stringify({ domains: [{ name, extension: ext }], with_price: true }),
  });
  const data   = await res.json();
  const result = data.data?.results?.[0];
  return {
    available: result?.status === 'free',                          // "free" = available, "active" = taken
    price:     result?.price?.reseller?.price ?? null,             // INR price
  };
}

function buildRegisterUrl(name, ext) {
  return `https://cp.openprovider.eu/domain/register?domain=${encodeURIComponent(name)}&tld=${encodeURIComponent(ext)}`;
}

export default function DomainSearchBar() {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef           = useRef(null);

  const parseQuery = (raw) => {
    const q = raw.trim().toLowerCase();
    if (!q) return null;
    const dot = q.indexOf('.');
    if (dot !== -1) return [{ name: q.slice(0, dot), ext: q.slice(dot + 1) }];
    return TLDS.map(tld => ({ name: q, ext: tld }));
  };

  const doSearch = async (raw) => {
    const pairs = parseQuery(raw);
    if (!pairs) return;
    setLoading(true);

    // Seed skeleton rows
    setResults(pairs.map(({ name, ext }) => ({
      domain: `${name}.${ext}`, name, ext,
      status: 'loading', price: null, listing: null,
    })));

    await Promise.all(pairs.map(async ({ name, ext }) => {
      const fullDomain = `${name}.${ext}`;
      try {
        // 1. Check our marketplace first
        const mktRes  = await fetch(`https://backend.cobrother.com/api/v1/domain/all`);
        const mktData = await mktRes.json();
        const domains = Array.isArray(mktData) ? mktData : (mktData?.data ?? []);
        const match   = domains.find(
          d => d.domainName?.toLowerCase() === name &&
               d.domainExtension?.toLowerCase() === `.${ext}` &&
               !d.takenDown
        );

        if (match) {
          setResults(prev => prev.map(r => r.domain === fullDomain ? {
            ...r, status: 'marketplace',
            price:   match.askingPrice,
            listing: match,
          } : r));
          return;
        }

        // 2. Not in marketplace → check OpenProvider
        const { available, price } = await opCheck(name, ext);
        setResults(prev => prev.map(r => r.domain === fullDomain ? {
          ...r,
          status: available ? 'available' : 'taken',
          price:  available ? price : null,
        } : r));

      } catch (err) {
        console.error(fullDomain, err);
        setResults(prev => prev.map(r =>
          r.domain === fullDomain ? { ...r, status: 'error' } : r
        ));
      }
    }));

    setLoading(false);
  };

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 700);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    doSearch(query);
  };

  const goToMarketplace = (listing) => {
    window.location.href = `/domains?highlight=${listing.id}`;
  };

  const goRegister = (name, ext) => {
    window.open(buildRegisterUrl(name, ext), '_blank', 'noopener,noreferrer');
  };

  const best   = results.find(r => r.status === 'marketplace')
              || results.find(r => r.status === 'available')
              || results[0];
  const others = results.filter(r => r !== best);

  // ── Sub-components ──────────────────────────────────────────────────────────
  const Badge = ({ status }) => {
    const map = {
      loading:     ['bg-gray-100 text-gray-400',    'CHECKING…'],
      marketplace: ['bg-indigo-100 text-indigo-700','🏪 ON OUR MARKETPLACE'],
      available:   ['bg-emerald-100 text-emerald-700','✓ AVAILABLE'],
      taken:       ['bg-red-100 text-red-500',      'TAKEN'],
      error:       ['bg-gray-100 text-gray-400',    'UNAVAILABLE'],
    };
    const [cls, label] = map[status] ?? map.taken;
    return <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3 ${cls}`}>{label}</span>;
  };

  const Price = ({ result, large }) => {
    if (!result.price) return null;
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

    if (result.status === 'marketplace')
      return <button onClick={() => goToMarketplace(result.listing)}
        className={`bg-indigo-600 text-white hover:bg-indigo-700 ${base}`}>
        View on Marketplace →
      </button>;

    if (result.status === 'available')
      return <button onClick={() => goRegister(result.name, result.ext)}
        className={`bg-gray-900 text-white hover:bg-gray-700 ${base}`}>
        {large ? 'Register Now →' : 'Register'}
      </button>;

    if (result.status === 'loading')
      return <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />;

    return <button disabled className={`bg-gray-100 text-gray-400 cursor-not-allowed ${base}`}>
      Taken
    </button>;
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="max-w-[1200px] mx-auto">

        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-6">
          Domains
        </h3>

        {/* Search row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <form onSubmit={handleSearch}
            className="search-glow-focus w-full max-w-[880px] flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full shadow-[0_4px_32px_rgba(0,0,0,0.12)] border border-gray-200 overflow-hidden px-4 sm:pl-6 sm:pr-3 py-3 sm:py-2.5 gap-3 sm:gap-0 flex-1">
            <input type="text"
              className="w-full min-w-0 flex-1 bg-transparent border-none outline-none text-gray-800 text-base sm:text-lg placeholder:text-gray-400 py-2.5 sm:py-3 focus:ring-0"
              placeholder="Search your next big domain..."
              value={query} onChange={e => setQuery(e.target.value)} />
            <button type="submit"
              className="bg-[#232f3e] text-white py-3 px-6 sm:px-7 rounded-full text-sm sm:text-base font-semibold transition-all w-full sm:w-auto hover:bg-gray-700 hover:-translate-y-0.5 flex-shrink-0">
              Search
            </button>
          </form>

          {/* Promo — desktop */}
          <div className="hidden lg:flex flex-col items-center px-6 py-4 min-w-[220px] bg-gradient-to-br from-indigo-50 via-white to-pink-50 rounded-[28px] border border-indigo-100 shadow-[0_20px_60px_rgba(99,102,241,0.12)] relative swing-hover">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-[0_0_20px_rgba(99,102,241,0.35)]" />
            <span className="text-[11px] uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-transparent bg-clip-text font-semibold mb-2">Promotional Offer</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900">.com</span>
              <span className="text-2xl font-extrabold text-slate-900">₹999</span>
              <span className="text-[11px] text-slate-500">/year</span>
            </div>
          </div>

          {/* Promo — mobile */}
          <div className="lg:hidden flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-50 via-white to-pink-50 rounded-2xl border border-indigo-100 w-full sm:w-auto relative swing-hover">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <span className="text-[11px] uppercase tracking-[0.12em] bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-transparent bg-clip-text font-semibold">Limited Offer</span>
            <span className="text-[12px] font-bold text-slate-900">.com ₹999/year</span>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          {loading && results.every(r => r.status === 'loading') && (
            <p className="text-center text-gray-400 text-sm mb-6">Checking domains…</p>
          )}

          {/* Best match card */}
          {best && (
            <div className={`mb-8 bg-white rounded-3xl p-8 shadow-xl border-2 transition-all ${
              best.status === 'marketplace' ? 'border-indigo-400' :
              best.status === 'available'   ? 'border-emerald-400' :
              best.status === 'loading'     ? 'border-gray-200' :
                                              'border-red-200'
            }`}>
              <Badge status={best.status} />
              <h2 className={`text-4xl font-extrabold mb-4 ${
                best.status === 'taken' || best.status === 'error'
                  ? 'text-gray-300 line-through' : 'text-gray-900'
              }`}>
                {best.name}
                <span className={
                  best.status === 'taken' || best.status === 'error'
                    ? 'text-purple-200' : 'text-purple-600'
                }>.{best.ext}</span>
              </h2>

              {best.status === 'marketplace' && best.listing && (
                <p className="text-indigo-600 font-semibold mb-5">
                  Asking ₹{Number(best.listing.askingPrice).toLocaleString('en-IN')}
                  {best.listing.pricingDemand ? ` · ${best.listing.pricingDemand}` : ''}
                </p>
              )}

              {best.status === 'available' && <Price result={best} large />}

              <Action result={best} large />
            </div>
          )}

          {/* Grid of other TLDs */}
          {others.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((item, i) => (
                <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all ${
                  item.status === 'taken' || item.status === 'error'
                    ? 'border-gray-100 opacity-60'
                    : item.status === 'marketplace' ? 'border-indigo-200'
                    : item.status === 'available'   ? 'border-emerald-200'
                    : 'border-gray-200'
                }`}>
                  <Badge status={item.status} />
                  <h2 className={`text-xl font-extrabold mb-3 ${
                    item.status === 'taken' || item.status === 'error'
                      ? 'text-gray-300 line-through' : 'text-gray-900'
                  }`}>
                    {item.name}
                    <span className={
                      item.status === 'taken' || item.status === 'error'
                        ? 'text-purple-200' : 'text-purple-500'
                    }>.{item.ext}</span>
                  </h2>

                  {item.status === 'marketplace' && item.listing && (
                    <p className="text-indigo-600 text-sm font-semibold mb-3">
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
          animation: glow-spread 6s ease-in-out infinite;
        }
        @keyframes glow-spread {
          0%,100% {
            box-shadow: -12px 0 20px -6px rgba(0,195,255,0.35),12px 0 20px -6px rgba(255,48,108,0.35),0 0 14px -3px rgba(120,80,220,0.25);
          }
          50% {
            box-shadow: -16px 0 28px -8px rgba(0,195,255,0.5),16px 0 28px -8px rgba(255,48,108,0.5),0 0 20px -4px rgba(120,80,220,0.4);
          }
        }
        .swing-hover { transform-origin: top center; animation: swing 3s ease-in-out infinite; }
        @keyframes swing { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
      `}</style>
    </div>
  );
}