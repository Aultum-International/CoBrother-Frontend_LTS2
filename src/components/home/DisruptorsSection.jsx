import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { communityAPI, publicAPI } from '../../api/services';
import HomeListingSkeleton from './HomeListingSkeleton';

function normalizeProfiles(raw) {
  const list = Array.isArray(raw)
    ? raw
    : raw?.data?.data ?? raw?.data?.content ?? raw?.data ?? raw?.content ?? [];
  if (!list.length) return [];
  return list.filter((p) => {
    const isFeatured =
      p.featuredOnHomepage === true ||
      p.featured_on_homepage === true ||
      p.featuredOnHome === true ||
      p.homeFeatured === true ||
      p.showOnHome === true ||
      p.communityHomeFeatured === true ||
      p.featuredOnCommunityHome === true ||
      p.showOnCommunityHome === true ||
      p.disruptorHomeFeatured === true ||
      p.featuredOnDisruptorHome === true ||
      p.showOnDisruptorHome === true ||
      p.featured === true;

    const listedByRole = (p.listedBy?.role || p.createdBy?.role || p.appUser?.role || '').toUpperCase();
    const isAdminListed = listedByRole === 'ADMIN';

    return isFeatured || isAdminListed;
  });
}

export default function DisruptorsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const blockResponse = await publicAPI.getCommunityBlock('disruptors');
        const blockProfiles = normalizeProfiles(blockResponse.data);

        if (blockProfiles.length > 0) {
          setProfiles(blockProfiles);
          return;
        }

        const fallbackResponse = await publicAPI.getCommunity();
        const fallbackProfiles = normalizeProfiles(fallbackResponse.data);
        if (fallbackProfiles.length > 0) {
          setProfiles(fallbackProfiles);
          return;
        }

        // Last fallback: use full community endpoint if available in current session.
        const allResponse = await communityAPI.getAll();
        setProfiles(normalizeProfiles(allResponse.data));
      } catch (error) {
        console.error('Failed to fetch featured disruptors:', error);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleCardClick = () => {
    navigate('/community');
  };

  if (loading) {
    return (
      <section className=" py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.disruptorsHeading')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <HomeListingSkeleton key={`disruptor-skeleton-${idx}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (profiles.length === 0) {
    return (
      <section className=" py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.disruptorsHeading')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('home.noDisruptors')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className=" py-4 md:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('home.disruptorsHeading')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {profiles.slice(0, 8).map((profile) => {
            const skills = profile.skills
              ? profile.skills.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 3)
              : [];
            const bio = profile.whyImHere || '';
            const shortBio = bio.length > 110 ? `${bio.slice(0, 110)}…` : bio;

            return (
              <div
                key={profile.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCardClick();
                }}
                className="group relative rounded-[24px] overflow-hidden cursor-pointer flex flex-col border border-violet-100 bg-white shadow-[0_10px_30px_rgba(91,33,182,0.06)] hover:shadow-[0_20px_44px_rgba(124,58,237,0.14)] hover:-translate-y-1 transition-all duration-300"
                onClick={handleCardClick}
              >
                <div className="w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />

                <div className="relative px-4 pt-4 pb-3 bg-gradient-to-br from-violet-50/90 via-white to-fuchsia-50/50">
                  <div className="flex items-start gap-3">
                    {profile.imageUrl ? (
                      <img
                        src={profile.imageUrl}
                        alt={profile.name || ''}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-violet-100 shadow-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-violet-700 bg-violet-100 border border-violet-200 flex-shrink-0">
                        {(profile.name || '?')[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[1rem] font-bold text-gray-900 truncate leading-snug">
                        {profile.name || t('community.anonymous', 'Anonymous')}
                      </h3>
                      {profile.role && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-violet-100 text-violet-800 text-[10px] font-bold rounded-md uppercase tracking-wide border border-violet-200/80">
                          {profile.role.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {profile.industry && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-amber-50 text-amber-800 border border-amber-100 font-medium">
                        {profile.industry.replace(/_/g, ' ')}
                      </span>
                    )}
                    {profile.location && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-600">
                        {profile.location}
                      </span>
                    )}
                  </div>

                  {shortBio ? (
                    <p className="text-[12px] text-gray-600 leading-relaxed line-clamp-3 mb-3 flex-1 min-h-[48px]">
                      {shortBio}
                    </p>
                  ) : (
                    <p className="text-[12px] text-gray-400 italic line-clamp-2 mb-3 min-h-[36px]">
                      {t('home.disruptorNoBio')}
                    </p>
                  )}

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[10px] text-gray-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100">
                    <span className="text-[11px] text-violet-600 font-semibold">
                      {t('home.disruptorBadge')}
                    </span>
                    <span className="px-3 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-bold rounded-lg">
                      {t('home.viewDetails')}
                    </span>
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
