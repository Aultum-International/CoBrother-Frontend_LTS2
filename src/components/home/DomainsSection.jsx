import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { publicAPI } from '../../api/services';
import HomeListingSkeleton from './HomeListingSkeleton';

const STATUS_COLORS = {
  AVAILABLE: { color: '#6ec896', bg: 'rgba(110,200,150,0.1)', border: 'rgba(110,200,150,0.3)' },
  PENDING:   { color: '#c8a96e', bg: 'rgba(200,169,110,0.1)', border: 'rgba(200,169,110,0.3)' },
  SOLD:      { color: '#c86e6e', bg: 'rgba(200,110,110,0.1)', border: 'rgba(200,110,110,0.3)' },
};

export default function DomainsSection() {
  const { t } = useTranslation();
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getDomains();
        setDomains(response.data || []);
      } catch (error) {
        console.error('Failed to fetch domains:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  const handleCardClick = () => {
    window.location.href = '/domains';
  };

  if (loading) {
    return (
      <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.premiumDomains')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <HomeListingSkeleton key={`domain-skeleton-${idx}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (domains.length === 0) {
    return (
      <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.premiumDomains')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('home.noDomains')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('home.premiumDomains')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {domains.slice(0, 8).map((domain) => {
            const isAuction = domain.saleType === 'AUCTION';
            const isHighValue = !isAuction && domain.askingPrice >= 500000;
            const auction = domain.auction;
            const domainInitials = (domain.domainName || '')
              .replace(/[^a-zA-Z0-9]/g, '')
              .slice(0, 2)
              .toUpperCase() || '?';

            const accentGrad = isAuction
              ? 'from-purple-600 via-fuchsia-500 to-pink-500'
              : 'from-indigo-600 via-blue-500 to-cyan-400';

            return (
              <div
                key={domain.id}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300"
                onClick={handleCardClick}
              >
                {/* Gradient header */}
                <div className={`relative bg-gradient-to-r ${accentGrad} px-4 pt-3.5 pb-3.5 min-h-[90px] flex items-end`}>
                  {domain.logo && (
                    <img src={domain.logo} alt={domain.domainName}
                      className="absolute top-0 right-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                  )}
                  <div className="relative z-10 flex items-end justify-between w-full">
                    <div className="flex items-center gap-2">
                      {domain.logo ? (
                        <img src={domain.logo} alt={domain.domainName}
                          className="w-14 h-14 rounded-xl object-cover ring-[3px] ring-white/50 shadow-lg" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center font-display text-2xl font-extrabold text-white ring-[3px] ring-white/30 shadow-lg bg-white/15 backdrop-blur-sm">
                          {domainInitials}
                        </div>
                      )}
                      <div>
                        <span className={`px-2 py-[3px] text-[10px] font-bold rounded-md uppercase tracking-wide ${isAuction ? 'bg-yellow-400 text-gray-900' : 'bg-white/25 backdrop-blur-sm text-white'}`}>
                          {isAuction ? '🔨 Auction' : domain.domainExtension}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="relative px-4 pb-4 pt-3 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-[0.95rem] font-extrabold text-gray-900 truncate leading-snug">
                      {domain.domainName}{domain.domainExtension}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!isAuction && (
                        <span className={`px-1.5 py-[2px] text-[9px] font-bold rounded uppercase tracking-wide border ${
                          domain.domainStatus === 'AVAILABLE' ? 'bg-green-50 text-green-600 border-green-200' :
                          domain.domainStatus === 'SOLD'      ? 'bg-red-50 text-red-500 border-red-200' :
                                                                'bg-amber-50 text-amber-600 border-amber-200'
                        }`}>
                          {domain.domainStatus}
                        </span>
                      )}
                      <span className="px-1.5 py-[2px] bg-gray-100 text-gray-500 text-[9px] font-bold rounded uppercase tracking-wide whitespace-nowrap">
                        {domain.pricingDemand || 'Fixed'}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {domain.verified && (
                      <span className="px-2 py-[2px] text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md">
                        {t('domainsPage.verified')}
                      </span>
                    )}
                    {isHighValue && domain.domainStatus === 'AVAILABLE' && (
                      <span className="px-2 py-[2px] text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-200 rounded-md">
                        {t('domainsPage.premium')}
                      </span>
                    )}
                    {isAuction && auction && (
                      <>
                        {auction.status === 'ACTIVE'   && <span className="text-[10px] text-emerald-600 font-bold">🟢 Live</span>}
                        {auction.status === 'EXTENDED'  && <span className="text-[10px] text-amber-500 font-bold">⚡ Extended</span>}
                        {auction.status === 'DRAFT'     && <span className="text-[10px] text-gray-400">⏳ Draft</span>}
                      </>
                    )}
                  </div>

                  {/* Price block */}
                  {isAuction && auction ? (
                    <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 px-3 py-2 mb-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-purple-700 tracking-tight">
                          ₹{Number(auction.currentHighestBid > 0 ? auction.currentHighestBid : auction.minBidPrice).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-purple-400 font-semibold">
                          {auction.currentHighestBid > 0 ? t('home.highest') : t('home.minBid')}
                        </span>
                      </div>
                      <span className="text-[10px] text-purple-400">{auction.totalBids} bid{auction.totalBids !== 1 ? 's' : ''}</span>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-3 py-2 mb-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-emerald-700 tracking-tight">
                          ₹{Number(domain.askingPrice).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">{t('home.askingPrice')}</span>
                      </div>
                    </div>
                  )}

                  {/* Stats + View Details */}
                  <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium py-2 border-t border-gray-100 mt-auto">
                    <span className="flex items-center gap-1">👁 {domain.views || 0}</span>
                    <span className="flex items-center gap-1">{domain.domainExtension}</span>
                    <button className={`ml-auto px-3 py-1.5 bg-gradient-to-r ${accentGrad} text-white text-[11px] font-bold rounded-lg transition-all hover:opacity-90`}>
                      {t('home.viewDetails')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
