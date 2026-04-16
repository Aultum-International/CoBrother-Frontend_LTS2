import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { publicAPI } from '../../api/services';

const TYPE_LABELS = {
  STARTUP: 'Startup',
  BUSINESS: 'Business',
  PROJECT: 'Project',
  IDEA: 'Idea',
  FIFTY_FIFTY: '50:50',
  SIXTY_FORTY: '60:40',
  SEVENTY_THIRTY: '70:30',
  EIGHTY_TWENTY: '80:20',
  NINETY_TEN: '90:10',
  NEGOTIABLE: 'Negotiable',
};

export default function VenturesSection() {
  const { t } = useTranslation();
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getVentures();
        setVentures(response.data || []);
      } catch (error) {
        console.error('Failed to fetch ventures:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVentures();
  }, []);

  const handleCardClick = () => {
    window.location.href = '/ventures';
  };

  if (loading) {
    return (
      <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.coVentures')}
          </h3>
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (ventures.length === 0) {
    return (
      <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.coVentures')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('home.noVentures')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('home.coVentures')}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {ventures.slice(0, 8).map((venture) => {
            const b = venture.brandDetails || {};
            const shortDesc = `${b.description?.slice(0, 130) || ''}${b.description?.length > 130 ? '…' : ''}`;
            const isAuction = venture.saleType === 'AUCTION';
            const auction = venture.auction;

            const accentGrad = isAuction
              ? 'from-purple-600 via-fuchsia-500 to-pink-500'
              : 'from-indigo-600 via-blue-500 to-cyan-400';

            return (
              <div
                key={venture.id}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300"
                onClick={handleCardClick}
              >
                {/* Gradient header */}
                <div className={`relative bg-gradient-to-r ${accentGrad} px-4 pt-3.5 pb-3.5 min-h-[90px] flex items-end`}>
                  {b.ventureImageUrl && (
                    <img src={b.ventureImageUrl} alt={b.brandName}
                      className="absolute top-0 right-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                  )}
                  <div className="relative z-10 flex items-end justify-between w-full">
                    <div className="flex items-center gap-2">
                      {b.ventureImageUrl ? (
                        <img src={b.ventureImageUrl} alt={b.brandName}
                          className="w-14 h-14 rounded-xl object-cover ring-[3px] ring-white/50 shadow-lg" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center font-display text-2xl font-extrabold text-white ring-[3px] ring-white/30 shadow-lg bg-white/15 backdrop-blur-sm">
                          {b.brandName?.[0] || '?'}
                        </div>
                      )}
                      <div>
                        <span className={`px-2 py-[3px] text-[10px] font-bold rounded-md uppercase tracking-wide ${isAuction ? 'bg-yellow-400 text-gray-900' : 'bg-white/25 backdrop-blur-sm text-white'}`}>
                          {isAuction ? '🔨 Auction' : '🤝 Regular'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="relative px-4 pb-4 pt-3 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-[0.95rem] font-extrabold text-gray-900 truncate leading-snug">
                      {b.brandName}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {b.industry && (
                        <span className="px-1.5 py-[2px] bg-gray-100 text-gray-500 text-[9px] font-bold rounded uppercase tracking-wide whitespace-nowrap">
                          {b.industry.replace(/_/g, ' ')}
                        </span>
                      )}
                      {b.ventureType && (
                        <span className="px-1.5 py-[2px] bg-indigo-50 text-indigo-500 text-[9px] font-bold rounded uppercase tracking-wide whitespace-nowrap">
                          {TYPE_LABELS[b.ventureType] || b.ventureType}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                    {shortDesc || <span className="italic text-gray-300">{t('common.noDescriptionYet')}</span>}
                  </p>

                  {/* Price block */}
                  {isAuction && auction ? (
                    <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 px-3 py-2 mb-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-purple-700 tracking-tight">
                          ₹{Number(auction.currentHighestBid > 0 ? auction.currentHighestBid : (auction.minBidPrice || 0)).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-purple-400 font-semibold">
                          {auction.currentHighestBid > 0 ? t('home.highest') : t('home.minBid')}
                        </span>
                      </div>
                      <span className="text-[10px] text-purple-400">{auction.totalBids} bid{auction.totalBids !== 1 ? 's' : ''}</span>
                    </div>
                  ) : b.dealValue ? (
                    <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-3 py-2 mb-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-emerald-700 tracking-tight">
                          ₹{Number(b.dealValue).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">{t('home.dealValue')}</span>
                      </div>
                    </div>
                  ) : null}

                  {/* Stats + View Details */}
                  <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium py-2 border-t border-gray-100 mt-auto">
                    <span className="flex items-center gap-1">👁 {venture.views || 0}</span>
                    <span className="flex items-center gap-1">📋 {venture.coVentureApplicationCount || 0}</span>
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
