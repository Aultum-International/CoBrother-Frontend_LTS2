import { useState, useEffect } from 'react';

const searchDomainRedirect = (domainQuery, selectedExtension = ".com") => {
  const value = domainQuery.trim().toLowerCase();

  if (!value) {
    throw new Error("Please enter a domain name");
  }

  const fullDomainRegex = /^[a-z0-9-]+(\.(com|in|ai|io))?$/;
  let finalDomain = "";

  if (fullDomainRegex.test(value) && value.includes(".")) {
    finalDomain = value;
  } else {
    const nameRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

    if (!nameRegex.test(value)) {
      throw new Error("Invalid domain name");
    }

    finalDomain = value + selectedExtension;
  }

  return `https://www.secureserver.net/products/domain-registration/find?plid=600394&domainToCheck=${finalDomain}`;
};

export default function DomainSearchBar() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // const tlds = ["com", "net", "org", "in", "co", "io", "ai"];

  const handleSearch = (e) => {
  if (e) e.preventDefault();

  try {
    const url = searchDomainRedirect(query, ".com");
    window.open(url, "_blank");
  } catch (error) {
    alert(error.message);
  }
};

  const bestDomain = result.find(item => item.status === "available") || result[0];
  const popularTlds = ["com", "io", "ai"];

  const TldIcon = ({ tld, available }) => {
    const color = available ? '#7c3aed' : '#9ca3af';
    const bg = available ? '#f3f0ff' : '#f9fafb';
    return (
      <span style={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.04em',
        color,
        background: bg,
        borderRadius: 8,
        padding: '3px 6px',
        fontFamily: 'monospace',
        lineHeight: 1,
      }}>
        .{tld.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="max-w-[1200px] mx-auto">

        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-6">
          Domains
        </h3>

        {/* Search bar + promo row */}
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="search-glow-focus w-full max-w-[880px] flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full shadow-[0_4px_32px_rgba(0,0,0,0.12)] border border-gray-200 overflow-hidden px-4 sm:pl-6 sm:pr-3 py-3 sm:py-2.5 gap-3 sm:gap-0 transition-all duration-300 relative flex-1"
          >
            <input
              type="text"
              className="w-full min-w-0 flex-1 bg-transparent border-none outline-none text-gray-800 text-base sm:text-lg placeholder:text-gray-400 py-2.5 sm:py-3 focus:ring-0"
              placeholder="Search your next big domain..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#232f3e] text-white border-none py-3 px-6 sm:px-7 rounded-full text-sm sm:text-base font-semibold cursor-pointer transition-all duration-200 w-full sm:w-auto self-stretch sm:self-start hover:bg-[#374151] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Desktop promo card */}
          <div className="hidden lg:flex flex-col items-center px-6 py-4 min-w-[220px] bg-gradient-to-br from-indigo-50 via-white to-pink-50 rounded-[28px] border border-indigo-100 shadow-[0_20px_60px_rgba(99,102,241,0.12)] relative swing-hover hover:shadow-[0_22px_66px_rgba(99,102,241,0.2)] transition-shadow duration-300">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-[0_0_20px_rgba(99,102,241,0.35)]" />
            <span className="text-[11px] uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-transparent bg-clip-text font-semibold mb-2">Promotional Offer</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900">.com</span>
              <span className="text-2xl font-extrabold text-slate-900">₹999</span>
              <span className="text-[11px] text-slate-500">/year</span>
            </div>
          </div>

          {/* Mobile promo banner */}
          <div className="lg:hidden flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-50 via-white to-pink-50 rounded-2xl border border-indigo-100 shadow-[0_14px_40px_rgba(99,102,241,0.12)] w-full sm:w-auto relative swing-hover">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-[0_0_14px_rgba(99,102,241,0.35)]" />
            <span className="text-[11px] uppercase tracking-[0.12em] bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-transparent bg-clip-text font-semibold">Limited Offer</span>
            <span className="text-[12px] font-bold text-slate-900">.com ₹999/yr</span>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">

          {/* Skeleton shimmer while first batch loads */}
          {loading && result.every(r => r.status === "loading") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="h-1 bg-gray-100" />
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between">
                      <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-8 w-8 bg-gray-100 rounded-xl animate-pulse" />
                    </div>
                    <div className="h-8 w-40 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-5 w-24 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── FEATURED / BEST MATCH ── */}
          {bestDomain && bestDomain.status !== "loading" && (
            <div className={`mb-10 relative overflow-hidden rounded-3xl p-7 sm:p-8 border-2 transition-all duration-300 ${
              bestDomain.status === "available"
                ? 'border-purple-300 bg-gradient-to-br from-purple-50 via-white to-indigo-50 shadow-[0_8px_40px_rgba(124,58,237,0.18)]'
                : 'border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50 shadow-[0_8px_40px_rgba(239,68,68,0.10)]'
            }`}>

              {/* Watermark TLD behind content */}
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[7rem] sm:text-[9rem] font-black opacity-[0.035] select-none pointer-events-none text-gray-900 leading-none">
                .{bestDomain.domain.split(".")[1]}
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
                <div className="flex-1 min-w-0">

                  {/* Badge row */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {bestDomain.status === "available" ? (
                      <>
                        <span className="inline-flex items-center gap-1.5 bg-purple-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide shadow-sm">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.1,10 5,7.6 1.9,10 3,6.2 0,3.8 3.8,3.8"/></svg>
                          Best Match
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          Available
                        </span>
                        {popularTlds.includes(bestDomain.domain.split(".")[1]) && (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1.5 rounded-full border border-amber-200">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="#92400e"><path d="M5 0C5 0 3 3 3 5a2 2 0 004 0c0-.8-.4-1.5-.4-1.5S7.5 5 7.5 6.5A2.5 2.5 0 015 9a2.5 2.5 0 01-2.5-2.5C2.5 4 5 0 5 0z"/></svg>
                            Popular TLD
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                        Taken / Sold
                      </span>
                    )}
                  </div>

                  {/* Domain name */}
                  {(() => {
                    const [name, tld] = bestDomain.domain.split(".");
                    return (
                      <>
                        <h2 className={`text-4xl sm:text-5xl font-black tracking-tight leading-none mb-2 ${
                          bestDomain.status === "available" ? 'text-gray-900' : 'text-gray-400 line-through decoration-red-300 decoration-2'
                        }`}>
                          {name}
                          <span className={bestDomain.status === "available" ? 'text-purple-600' : 'text-purple-300'}>
                            .{tld}
                          </span>
                        </h2>
                        {bestDomain.status === "available" && (
                          <p className="text-sm text-gray-400 mt-2 flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="6"/><path d="M7 4v3l2 2"/></svg>
                            Secure before someone else does
                          </p>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Price + CTA column */}
                <div className="flex flex-col items-start sm:items-end gap-4 flex-shrink-0">
                  {bestDomain.status === "available" && bestDomain.price && (
                    <div className="sm:text-right">
                      <div className="flex sm:justify-end items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-gray-900 leading-none">
                          {bestDomain.price}
                        </span>
                        <span className="text-gray-400 line-through text-base">
                          ₹{Math.round(parseInt(bestDomain.price?.replace("₹", "") || 1000) * 1.8)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 flex items-center sm:justify-end gap-1">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5.5 1v4.5L8 8"/><circle cx="5.5" cy="5.5" r="4.5"/></svg>
                        per year + taxes
                      </p>
                    </div>
                  )}

                  {bestDomain.status === "available" ? (
                    <button
                      onClick={() => handleBuyNow(bestDomain.domain)}
                      className="group bg-purple-600 hover:bg-purple-700 active:scale-[0.97] text-white px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      Make it Yours
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuyNow(bestDomain.domain)}
                      className="bg-gray-100 hover:bg-gray-200 active:scale-[0.97] text-gray-600 px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      Check Alternatives →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── DOMAIN GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {result
              .filter(item => item !== bestDomain)
              .map((item, index) => {
                const [name, tld] = item.domain.split(".");
                const isAvailable = item.status === "available";
                const isTaken = item.status === "taken";
                const isChecking = item.status === "loading";
                const isPopular = popularTlds.includes(tld);

                return (
                  <div
                    key={index}
                    className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                      isAvailable
                        ? 'border-purple-200 hover:border-purple-400 hover:shadow-[0_8px_32px_rgba(124,58,237,0.14)] hover:-translate-y-1'
                        : isTaken
                        ? 'border-gray-100 opacity-55 hover:opacity-75 hover:shadow-sm'
                        : 'border-gray-200'
                    }`}
                    style={{ willChange: 'transform' }}
                  >
                    {/* Top accent bar */}
                    <div className={`h-[3px] w-full flex-shrink-0 ${
                      isAvailable
                        ? 'bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400'
                        : isTaken
                        ? 'bg-gray-100'
                        : 'bg-gray-100 animate-pulse'
                    }`} />

                    <div className="p-5 flex flex-col flex-1">

                      {/* Header: badge left, icon right */}
                      <div className="flex items-center justify-between mb-3">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                            Available
                          </span>
                        ) : isTaken ? (
                          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-500 border border-red-100 text-[11px] font-bold px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                            Taken
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-400 border border-gray-100 text-[11px] font-medium px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" style={{ animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />
                            Checking...
                          </span>
                        )}

                        <div className="flex items-center gap-1.5">
                          {isPopular && isAvailable && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                              Popular
                            </span>
                          )}
                          <TldIcon tld={tld} available={isAvailable} />
                        </div>
                      </div>

                      {/* Domain name */}
                      <div className="flex-1 mb-4">
                        <h2 className={`text-2xl font-black tracking-tight leading-tight ${
                          isTaken
                            ? 'text-gray-300 line-through decoration-red-200 decoration-2'
                            : 'text-gray-900'
                        }`}>
                          {name}
                          <span className={
                            isAvailable ? 'text-purple-500' :
                            isTaken ? 'text-purple-200' : 'text-gray-400'
                          }>
                            .{tld}
                          </span>
                        </h2>

                        {isAvailable && item.price && (
                          <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-xl font-black text-gray-900">
                              {item.price}
                            </span>
                            <span className="text-gray-400 line-through text-sm">
                              ₹{Math.round(parseInt(item.price?.replace("₹", "") || 1000) * 1.8)}
                            </span>
                            <span className="text-xs text-gray-400">/yr</span>
                          </div>
                        )}

                        {isTaken && (
                          <p className="text-xs text-gray-400 mt-2">This domain is already registered</p>
                        )}

                        {isChecking && (
                          <div className="mt-3 flex gap-1.5">
                            {[1, 2, 3].map(d => (
                              <div
                                key={d}
                                className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-bounce"
                                style={{ animationDelay: `${d * 0.15}s` }}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Divider + CTA */}
                      <div className="border-t border-gray-100 pt-4">
                        {isAvailable ? (
                          <button
                            onClick={() => handleBuyNow(item.domain)}
                            className="w-full group/btn bg-gray-900 hover:bg-purple-600 active:scale-[0.97] text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_4px_16px_rgba(124,58,237,0.25)]"
                          >
                            Buy Now
                            <span className="group-hover/btn:translate-x-1 transition-transform duration-200 text-xs">→</span>
                          </button>
                        ) : isTaken ? (
                          <button
                            onClick={() => handleBuyNow(item.domain)}
                            className="w-full bg-gray-50 hover:bg-gray-100 active:scale-[0.97] text-gray-400 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 border border-gray-100 flex items-center justify-center gap-1.5"
                          >
                            Check Alternatives <span className="text-xs">→</span>
                          </button>
                        ) : (
                          <div className="w-full bg-gray-50 py-2.5 px-4 rounded-xl border border-gray-100">
                            <div className="flex gap-1 justify-center">
                              {[0, 1, 2].map(d => (
                                <div
                                  key={d}
                                  className="w-1 h-3 rounded-full bg-gray-300 animate-pulse"
                                  style={{ animationDelay: `${d * 0.2}s` }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Empty state */}
          {!loading && result.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#7c3aed" strokeWidth="1.5">
                  <circle cx="13" cy="13" r="9"/><path d="M22 22l4 4"/>
                </svg>
              </div>
              <p className="text-lg font-bold text-gray-600">Search for a domain</p>
              <p className="text-sm text-gray-400 mt-1">Type a name above to check availability across all major TLDs</p>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .search-glow-focus {
          width: 100%;
          box-shadow:
            -12px 0 20px -6px rgba(0, 195, 255, 0.35),
            12px 0 20px -6px rgba(255, 48, 108, 0.35),
            0 0 14px -3px rgba(120, 80, 220, 0.25);
          border-color: rgba(120, 80, 220, 0.35);
          transform: translateY(-1px);
          transition: all 0.4s ease;
          animation: glow-spread 6s ease-in-out infinite;
        }
        @keyframes glow-spread {
          0%, 100% {
            box-shadow:
              -12px 0 20px -6px rgba(0, 195, 255, 0.35),
              12px 0 20px -6px rgba(255, 48, 108, 0.35),
              0 0 14px -3px rgba(120, 80, 220, 0.25);
          }
          50% {
            box-shadow:
              -16px 0 28px -8px rgba(0, 195, 255, 0.5),
              16px 0 28px -8px rgba(255, 48, 108, 0.5),
              0 0 20px -4px rgba(120, 80, 220, 0.4);
          }
        }
        @media (max-width: 639px) {
          .search-glow-focus { padding: 0.9rem; gap: 0.85rem; }
        }
        .swing-hover {
          transform-origin: top center;
          animation: swing 3s ease-in-out infinite;
        }
        @keyframes swing {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>
    </div>
  );
}