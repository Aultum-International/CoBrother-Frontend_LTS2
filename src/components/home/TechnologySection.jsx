import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { publicAPI } from '../../api/services';

const STATUS_COLORS = {
  AVAILABLE: { color: '#6ec896', bg: 'rgba(110,200,150,0.1)', border: 'rgba(110,200,150,0.3)' },
  PENDING:   { color: '#c8a96e', bg: 'rgba(200,169,110,0.1)', border: 'rgba(200,169,110,0.3)' },
  SOLD:      { color: '#c86e6e', bg: 'rgba(200,110,110,0.1)', border: 'rgba(200,110,110,0.3)' },
};

export default function TechnologySection() {
  const { t } = useTranslation();
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getSoftwares();
        setSoftwares(response.data || []);
      } catch (error) {
        console.error('Failed to fetch software:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSoftwares();
  }, []);

  const handleCardClick = () => {
    window.location.href = '/cocreation';
  };

  if (loading) {
    return (
      <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.technologySoftware')}
          </h3>
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (softwares.length === 0) {
    return (
      <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.technologySoftware')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('home.noSoftware')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('home.technologySoftware')}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {softwares.slice(0, 8).map((item) => {
            const s = STATUS_COLORS[item.softwareStatus] || STATUS_COLORS.AVAILABLE;
            const accentGrad = 'from-indigo-600 via-blue-500 to-cyan-400';

            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300"
                onClick={handleCardClick}
              >
                {/* Gradient header */}
                <div className={`relative bg-gradient-to-r ${accentGrad} px-4 pt-3.5 pb-3.5 min-h-[90px] flex items-end`}>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name}
                      className="absolute top-0 right-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                  )}
                  <div className="relative z-10 flex items-end justify-between w-full">
                    <div className="flex items-center gap-2">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover ring-[3px] ring-white/50 shadow-lg" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center font-display text-2xl font-extrabold text-white ring-[3px] ring-white/30 shadow-lg bg-white/15 backdrop-blur-sm">
                          ⧁
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-[3px] text-[10px] font-bold rounded-md uppercase tracking-wide bg-white/25 backdrop-blur-sm text-white">
                          {item.category?.replace(/_/g, ' ') || 'Technology'}
                        </span>
                        {item.official && (
                          <span className="px-2 py-[3px] bg-yellow-400 text-gray-900 text-[10px] font-bold rounded-md uppercase tracking-wide">
                            ✦ Official
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="relative px-4 pb-4 pt-3 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-[0.95rem] font-extrabold text-gray-900 truncate leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span
                        className="px-1.5 py-[2px] text-[9px] font-bold rounded uppercase tracking-wide border"
                        style={{ color: s.color, background: s.bg, borderColor: s.border }}
                      >
                        {item.softwareStatus}
                      </span>
                      <span className="px-1.5 py-[2px] bg-indigo-50 text-indigo-500 text-[9px] font-bold rounded uppercase tracking-wide whitespace-nowrap">
                        {item.purchaseType}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                    {item.description || <span className="italic text-gray-300">{t('common.noDescription')}</span>}
                  </p>

                  {/* Tech stack chips */}
                  {item.techStack && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.techStack.split(',').slice(0, 3).map(tech => (
                        <span key={tech} className="text-[0.7rem] px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200 font-semibold">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price block */}
                  <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-3 py-2 mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-emerald-700 tracking-tight">
                        ₹{Number(item.price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{t('home.askingPrice')}</span>
                    </div>
                  </div>

                  {/* Stats + View Details */}
                  <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium py-2 border-t border-gray-100 mt-auto">
                    <span className="flex items-center gap-1">👁 {item.views || 0}</span>
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
