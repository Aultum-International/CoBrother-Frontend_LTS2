import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { publicAPI } from '../../api/services';
import HomeListingSkeleton from './HomeListingSkeleton';

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <HomeListingSkeleton key={`venture-skeleton-${idx}`} />
            ))}
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
            const shortDesc = `${b.description?.slice(0, 120) || ''}${b.description?.length > 120 ? '…' : ''}`;
            const isAuction = venture.saleType === 'AUCTION';
            const auction = venture.auction;

            return (
              <div
                key={venture.id}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-row border border-gray-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(200,140,50,0.12)] hover:-translate-y-0.5 transition-all duration-300"
                onClick={handleCardClick}
              >
                <div className={`w-[5px] flex-shrink-0 ${isAuction ? 'bg-gradient-to-b from-amber-400 via-orange-400 to-rose-400' : 'bg-gradient-to-b from-orange-400 via-amber-400 to-yellow-300'}`} />

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="px-4 pt-4 pb-2 flex items-start gap-3">
                    {b.ventureImageUrl ? (
                      <img src={b.ventureImageUrl} alt={b.brandName}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-orange-100 shadow-sm flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl font-extrabold text-amber-700 bg-gradient-to-br from-amber-50 to-orange-100 ring-2 ring-orange-200/50 flex-shrink-0">
                        {b.brandName?.[0] || '?'}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[0.95rem] font-extrabold text-gray-900 truncate leading-snug mb-1">
                        {b.brandName}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-[3px] text-[9px] font-bold rounded-full uppercase tracking-wide ${
                          isAuction ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-orange-50 text-orange-600 border border-orange-200'
                        }`}>
                          {isAuction ? '🔨 Auction' : '🤝 Co-Venture'}
                        </span>
                        {b.industry && (
                          <span className="px-1.5 py-[2px] bg-gray-100 text-gray-500 text-[9px] font-bold rounded-full uppercase tracking-wide whitespace-nowrap">
                            {b.industry.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                    {b.ventureType && (
                      <span className="px-2 py-1 bg-orange-50 text-orange-500 text-[10px] font-bold rounded-lg border border-orange-200 whitespace-nowrap flex-shrink-0">
                        {TYPE_LABELS[b.ventureType] || b.ventureType}
                      </span>
                    )}
                  </div>

                  <div className="px-4">
                    <p className="text-[11.5px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                      {shortDesc || <span className="italic text-gray-300">{t('common.noDescriptionYet')}</span>}
                    </p>
                  </div>

                  <div className="px-4">
                    {isAuction && auction ? (
                      <div className="rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border border-amber-200/60 px-3.5 py-2.5 mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-amber-700 tracking-tight">
                            ₹{Number(auction.currentHighestBid > 0 ? auction.currentHighestBid : (auction.minBidPrice || 0)).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-amber-500 font-semibold">
                            {auction.currentHighestBid > 0 ? t('home.highest') : t('home.minBid')}
                          </span>
                        </div>
                        <span className="text-[10px] text-amber-400">{auction.totalBids} bid{auction.totalBids !== 1 ? 's' : ''}</span>
                      </div>
                    ) : b.dealValue ? (
                      <div className="rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 px-3.5 py-2.5 mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-amber-700 tracking-tight">
                            ₹{Number(b.dealValue).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-amber-500 font-semibold">{t('home.dealValue')}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium px-4 py-2.5 border-t border-gray-100 mt-auto">
                    <span className="flex items-center gap-1">👁 {venture.views || 0}</span>
                    <span className="flex items-center gap-1">📋 {venture.coVentureApplicationCount || 0}</span>
                    <button className={`ml-auto px-3 py-1.5 bg-gradient-to-r ${isAuction ? 'from-amber-500 to-orange-500' : 'from-orange-500 to-amber-500'} text-white text-[11px] font-bold rounded-lg transition-all hover:opacity-90`}>
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
