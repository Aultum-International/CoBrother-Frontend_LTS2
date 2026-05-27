import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { publicAPI } from '../../api/services';
import { filterFeaturedListings } from '../../utils/homepageListings';
import { navigateToListingDetail, isLoggedIn } from '../../utils/listingNavigation';
import { asArray } from '../../utils/asArray';
import { useLikes } from '../../hooks/useLikes';
import CommunityListingCard from '../listings/CommunityListingCard';
import ListingCardShell from '../listings/ListingCardShell';
import HomeSectionCardSkeleton from './HomeSectionCardSkeleton';

export default function CommunitySection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getCommunities();
        setCommunities(asArray(response.data));
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, []);

  const featuredCommunities = useMemo(
    () => filterFeaturedListings(communities, 'community'),
    [communities],
  );

  const loggedIn = isLoggedIn();
  const { toggle: toggleLike, get: getLike } = useLikes('COMMUNITY', featuredCommunities);

  const handleViewProfile = (communityId) => {
    navigateToListingDetail(navigate, 'community', communityId);
  };

  if (loading) {
    return <HomeSectionCardSkeleton title={t('disruptors')} />;
  }

  if (featuredCommunities.length === 0) {
    return (
      <section className="bg-white py-4 md:py-6 ">
        <div className="w-full">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('disruptors')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('noDisruptors')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6 ">
      <div className="w-full">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('disruptors')}
        </h3>
        <div className="listing-card-glow-grid home-featured-listings-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-5">
          {featuredCommunities.slice(0, 8).map((item) => (
            <ListingCardShell key={item.id}>
            <CommunityListingCard
              browseMode
              profile={item}
              likeState={getLike(item.id)}
              onLike={loggedIn ? () => toggleLike(item.id) : undefined}
              onView={() => handleViewProfile(item.id)}
            />
            </ListingCardShell>
          ))}
        </div>
      </div>
    </section>
  );
}
