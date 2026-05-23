import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { publicAPI } from '../../api/services';
import { filterFeaturedListings } from '../../utils/homepageListings';
import { navigateToListingDetail, isLoggedIn } from '../../utils/listingNavigation';
import { asArray } from '../../utils/asArray';
import { useLikes } from '../../hooks/useLikes';
import TechnologyListingCard from '../listings/TechnologyListingCard';
import '../../styles/technology-listing-cards.css';

export default function TechnologySection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getSoftwares();
        setSoftwares(asArray(response.data));
      } catch (error) {
        console.error('Failed to fetch software:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSoftwares();
  }, []);

  const featuredSoftwares = useMemo(
    () => filterFeaturedListings(softwares, 'software'),
    [softwares],
  );

  const loggedIn = isLoggedIn();
  const { toggle: toggleLike, get: getLike } = useLikes('SOFTWARE', featuredSoftwares);

  const handleViewDetails = (softwareId) => {
    navigateToListingDetail(navigate, 'software', softwareId);
  };

  if (loading) {
    return (
      <section className="bg-white py-4 md:py-6 ">
        <div className="w-full">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('technologySoftware')}
          </h3>
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (featuredSoftwares.length === 0) {
    return (
      <section className="bg-white py-4 md:py-6 ">
        <div className="w-full">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('technologySoftware')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('noSoftware')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6 ">
      <div className="w-full">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('technologySoftware')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {featuredSoftwares.slice(0, 8).map((item) => (
              <div key={item.id} className="technology-listing-card-shell">
                <TechnologyListingCard
                  browseMode
                  item={item}
                  likeState={getLike(item.id)}
                  onLike={loggedIn ? () => toggleLike(item.id) : undefined}
                  onView={() => handleViewDetails(item.id)}
                />
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
