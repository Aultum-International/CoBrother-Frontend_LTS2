import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { publicAPI } from '../../api/services';
import { filterFeaturedListings } from '../../utils/homepageListings';
import { navigateToListingDetail, isLoggedIn } from '../../utils/listingNavigation';
import { asArray } from '../../utils/asArray';
import { useLikes } from '../../hooks/useLikes';
import VentureListingCard from '../listings/VentureListingCard';
import ListingCardShell from '../listings/ListingCardShell';
import HomeSectionCardSkeleton from './HomeSectionCardSkeleton';

export default function VenturesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getVentures();
        setVentures(asArray(response.data));
      } catch {
        setVentures([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVentures();
  }, []);

  const featuredVentures = useMemo(
    () => filterFeaturedListings(ventures, 'venture'),
    [ventures],
  );

  const loggedIn = isLoggedIn();
  const { toggle: toggleLike, get: getLike } = useLikes('VENTURE', featuredVentures);

  const handleViewDetails = (ventureId) => {
    navigateToListingDetail(navigate, 'venture', ventureId);
  };

  if (loading) {
    return <HomeSectionCardSkeleton title={t('coVentures')} />;
  }

  if (featuredVentures.length === 0) {
    return (
      <section className="bg-white py-4 md:py-6 ">
        <div className="w-full">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('coVentures')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('noVentures')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6 ">
      <div className="w-full">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('coVentures')}
        </h3>
        <div className="listing-card-glow-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {featuredVentures.slice(0, 8).map((venture) => (
              <ListingCardShell key={venture.id}>
              <VentureListingCard
                browseMode
                venture={venture}
                likeState={getLike(venture.id)}
                onLike={loggedIn ? () => toggleLike(venture.id) : undefined}
                onView={() => handleViewDetails(venture.id)}
              />
              </ListingCardShell>
          ))}
        </div>
      </div>
    </section>
  );
}
