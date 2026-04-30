import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { publicAPI } from '../../api/services';
import { useLikes } from '../../hooks/useLikes';
import LikeButton from '../common/LikeButton';
import HomeListingSkeleton from './HomeListingSkeleton';

function LinkedInGlyph({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function normalizeCommunityList(raw) {
  const list = Array.isArray(raw) ? raw : raw?.data ?? [];
  if (!list.length) return [];
  const flagged = list.filter(
    (p) =>
      p.communityHomeFeatured === true ||
      p.featuredOnCommunityHome === true ||
      p.showOnCommunityHome === true
  );
  return flagged.length ? flagged : list;
}

export default function CommunitySection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { toggle: toggleLike, get: getLike } = useLikes('COMMUNITY', profiles);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await publicAPI
          .getCommunityBlock('community')
          .catch(() => publicAPI.getCommunity());
        const raw = response.data;
        setProfiles(normalizeCommunityList(raw));
      } catch (error) {
        console.error('Failed to fetch community profiles:', error);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-sky-50/50 to-white py-4 md:py-8 px-4 sm:px-6 lg:px-8 border-t border-sky-100/80">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {t('home.communityHeading')}
          </h3>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-2xl">
            {t('home.communitySubheading')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <HomeListingSkeleton key={`community-skeleton-${idx}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (profiles.length === 0) {
    return (
      <section className="bg-gradient-to-b from-sky-50/50 to-white py-4 md:py-8 px-4 sm:px-6 lg:px-8 border-t border-sky-100/80">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {t('home.communityHeading')}
          </h3>
          <p className="text-slate-600 text-sm md:text-base mb-6 max-w-2xl">
            {t('home.communitySubheading')}
          </p>
          <p className="text-center text-slate-500 py-12">{t('home.noCommunity')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-sky-50/50 to-white py-4 md:py-8 px-4 sm:px-6 lg:px-8 border-t border-sky-100/80">
      <div className="max-w-[1200px] mx-auto">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {t('home.communityHeading')}
        </h3>
        <p className="text-slate-600 text-sm md:text-base mb-8 max-w-2xl">
          {t('home.communitySubheading')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {profiles.slice(0, 8).map((profile) => {
            const skills =
              profile.skills?.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 4) || [];
            const likeState = getLike(profile.id);

            return (
              <div
                key={profile.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') navigate('/community');
                }}
                className="group relative flex flex-col rounded-2xl border border-sky-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-sky-300 cursor-pointer text-left"
                onClick={() => navigate('/community')}
              >
                <div className="flex items-start gap-3 mb-4">
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt={profile.name || ''}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-sky-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-lg font-bold text-sky-700 flex-shrink-0">
                      {(profile.name || '?')[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display font-bold text-slate-900 text-[0.95rem] leading-snug m-0">
                      {profile.name || t('community.anonymous', 'Anonymous')}
                    </h4>
                    {profile.role && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-[0.65rem] font-bold text-sky-700 uppercase tracking-wide">
                        {profile.role.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  <span className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">
                    {t('community.industryAndLocation', 'Industry & Location')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.industry && (
                      <span className="px-2 py-0.5 rounded-md text-xs bg-amber-50 text-amber-800 border border-amber-100 font-medium">
                        {profile.industry.replace(/_/g, ' ')}
                      </span>
                    )}
                    {profile.location && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-700 border border-slate-200">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" aria-hidden />
                        {profile.location}
                      </span>
                    )}
                  </div>
                </div>

                {skills.length > 0 && (
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">
                      {t('community.skills', 'Skills')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.linkedInProfileUrl && (
                  <a
                    href={profile.linkedInProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A66C2] hover:text-[#004182] no-underline mb-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkedInGlyph size={14} />
                    {t('community.linkedInLink', 'LinkedIn')}
                    <span aria-hidden className="text-[0.7rem]">
                      ↗
                    </span>
                  </a>
                )}

                <div
                  className="mt-auto pt-3 border-t border-slate-100 flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LikeButton
                    liked={likeState?.liked}
                    count={likeState?.count ?? 0}
                    onToggle={() => toggleLike(profile.id)}
                    forceRed
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
