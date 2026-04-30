import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import HomeListingSkeleton from './HomeListingSkeleton';

import { communityAPI } from '../../api/services';
import { CommunityCard } from '../../pages/CommunityPage';

export default function DisruptorsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [featuredDisruptors, setFeaturedDisruptors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDisruptors = async () => {
    try {
      const res = await communityAPI.getAll();

      const data =
        res?.data?.data ||
        res?.data ||
        [];

      // ✅ FILTER (ONLY ALLOWED USERS)
      const filtered = data.filter(
        (p) =>
          p.appUser?.role === 'ADMIN'   // 👈 if role exists
          // OR use name/email fallback below
      );

      setFeaturedDisruptors(filtered.slice(0, 4));
    } catch (err) {
      console.error('Error fetching disruptors:', err);
      setFeaturedDisruptors([]);
    } finally {
      setLoading(false);
    }
  };

  fetchDisruptors();
}, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <section className="py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.disruptorsHeading')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 4 }).map((_, idx) => (
              <HomeListingSkeleton key={idx} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ❌ EMPTY
  if (!featuredDisruptors.length) {
    return (
      <section className="py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('home.disruptorsHeading')}
          </h3>

          <p className="text-center text-gray-500 py-12">
            {t('home.noDisruptors')}
          </p>
        </div>
      </section>
    );
  }

  // ✅ DATA
  return (
    <section className="py-4 md:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-5 md:mb-6">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900">
            {t('home.disruptorsHeading')}
          </h3>

          <button
            onClick={() => navigate('/community')}
            className="text-sm text-indigo-600 font-medium hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {featuredDisruptors.map((profile) => (
            <CommunityCard
              key={profile.id}
              profile={profile}
              isMe={false}
              likeState={{ liked: false, count: profile.likes || 0 }}
              onLike={() => {}}
              onView={() => navigate('/community')}
              onEdit={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}