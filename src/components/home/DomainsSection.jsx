import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { publicAPI } from '../../api/services';
import { filterFeaturedListings } from '../../utils/homepageListings';
import { navigateToListingDetail, isLoggedIn } from '../../utils/listingNavigation';
import { asArray } from '../../utils/asArray';
import { useLikes } from '../../hooks/useLikes';
import DomainListingCard from '../listings/DomainListingCard';
import '../../styles/domain-listing-cards.css';

export default function DomainsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getDomains();
        setDomains(asArray(response.data));
      } catch {
        setDomains([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  const premiumDomains = useMemo(
    () => filterFeaturedListings(domains, 'domain'),
    [domains],
  );

  const loggedIn = isLoggedIn();
  const { toggle: toggleLike, get: getLike } = useLikes('DOMAIN', premiumDomains);

  const handleViewDetails = (domainId) => {
    navigateToListingDetail(navigate, 'domain', domainId);
  };

  if (loading) {
    return (
      <section className="bg-white py-4 md:py-6 ">
        <div className="w-full">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('premiumDomains')}
          </h3>
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (premiumDomains.length === 0) {
    return (
      <section className="bg-white py-4 md:py-6 ">
        <div className="w-full">
          <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
            {t('premiumDomains')}
          </h3>
          <p className="text-center text-gray-500 py-12">{t('noDomains')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 md:py-6 ">
      <div className="w-full">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {t('premiumDomains')}
        </h3>
        <div className="domain-listing-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {premiumDomains.slice(0, 8).map((domain) => (
              <div key={domain.id} className="domain-listing-card-shell">
                <DomainListingCard
                  browseMode
                  domain={domain}
                  likeState={getLike(domain.id)}
                  onLike={loggedIn ? () => toggleLike(domain.id) : undefined}
                  onView={() => handleViewDetails(domain.id)}
                />
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
