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
            const techTags = item.techStack
              ? item.techStack.split(',').map(tech => tech.trim()).filter(Boolean).slice(0, 3)
              : [];

            return (
              <div
                key={item.id}
                className="group relative rounded-[24px] overflow-hidden cursor-pointer flex flex-col border border-sky-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_44px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300"
                onClick={handleCardClick}
              >
                <div className="relative overflow-hidden px-4 pt-4 pb-4 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
                  <div className="absolute inset-0 opacity-70" style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.07) 0%, rgba(99,102,241,0.025) 45%, rgba(255,255,255,0) 100%)' }} />
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name}
                      className="absolute top-0 right-0 w-full h-full object-cover opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300" />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name}
                            className="w-12 h-12 rounded-2xl object-cover shadow-md ring-1 ring-white" />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-sky-700 bg-white border border-sky-100 shadow-sm">
                            TECH
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-display text-[1rem] font-bold text-gray-900 truncate leading-snug">
                            {item.name}
                          </h3>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {item.category?.replace(/_/g, ' ') || 'Technology'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide border"
                          style={{ color: s.color, background: s.bg, borderColor: s.border }}
                        >
                          {item.softwareStatus}
                        </span>
                        {item.official && (
                          <span className="px-2 py-[3px] bg-amber-50 text-amber-700 text-[9px] font-bold rounded-full uppercase tracking-wide border border-amber-200">
                            {t('technologyPage.official')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 bg-white text-sky-700 text-[10px] font-semibold rounded-full border border-sky-100 shadow-sm">
                        Digital Product
                      </span>
                      {techTags.map(tech => (
                        <span key={tech} className="text-[10px] px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200 font-medium">
                          {tech}
                        </span>
                      ))}
                      {item.techStack && item.techStack.split(',').map(tech => tech.trim()).filter(Boolean).length > 3 && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-white text-gray-500 border border-gray-200 font-medium">
                          +more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative px-4 pb-4 pt-3 flex flex-col flex-1">
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-4 min-h-[36px]">
                    {item.description || <span className="italic text-gray-300">{t('common.noDescription')}</span>}
                  </p>

                  <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-100 px-4 py-3 mb-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-sky-500 font-semibold mb-1">
                          {t('home.askingPrice')}
                        </div>
                        <span className="text-[1.65rem] font-extrabold text-slate-900 tracking-tight">
                          ₹{Number(item.price).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wide border border-sky-100 whitespace-nowrap">
                        {item.purchaseType || item.pricingDemand || 'Fixed'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium py-2 border-t border-gray-100 mt-auto">
                    <span className="flex items-center gap-1">👁 {item.views || 0}</span>
                    <button className="ml-auto px-3 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-[11px] font-bold rounded-lg transition-all hover:opacity-95">
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
