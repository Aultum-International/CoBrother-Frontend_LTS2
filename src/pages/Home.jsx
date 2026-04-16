import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import searchIcon from '../assets/Cobrother_Profile.png';
import communityIcon from '../assets/cobrother_community_profil.png';
import cobrotherProfile from '../assets/Community-profileicon.png';
import coBrandingIcon from '../assets/CoBranding.png';
import coVentureIcon from '../assets/Coventure_logo.png';
import coCreationIcon from '../assets/CoCreation.png';
import auctionIcon from '../assets/Auction.png';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HeroGlow from '../components/common/HeroGlow';
import ExploreSection from '../components/common/ExploreSection';
import DomainSearchBar from '../components/common/DomainSearchBar';
import HomeFooter from '../components/common/HomeFooter';
import ExploreButton from '../components/common/ExploreButton';

export const searchDomainRedirect = (domainQuery, selectedExtension = '.com') => {
  const value = domainQuery.trim().toLowerCase();

  if (!value) {
    throw new Error('Please enter a domain name');
  }

  const fullDomainRegex = /^[a-z0-9-]+(\.(com|in|ai|io))?$/;
  let finalDomain = '';

  if (fullDomainRegex.test(value) && value.includes('.')) {
    finalDomain = value;
  } else {
    const nameRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

    if (!nameRegex.test(value)) {
      throw new Error('Invalid domain name. Use only letters, numbers, and hyphens');
    }

    finalDomain = value + selectedExtension;
  }

  return `https://www.secureserver.net/products/domain-registration/find?plid=600394&domainToCheck=${finalDomain}`;
};

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('home-page-body');

    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 0) {
          navRef.current.classList.add('scrolled');
        } else {
          navRef.current.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.body.classList.remove('home-page-body');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');

    try {
      const url = searchDomainRedirect(searchQuery, '.com');
      window.open(url, '_blank');
      setSearchQuery('');
    } catch (error) {
      setSearchError(error.message);
    }
  };

  const features = [
    {
      icon: <img src={coBrandingIcon} alt="Domain" className="w-10 h-10 object-contain" />,
      titleKey: 'home.domainTitle',
      descKey: 'home.domainDesc',
      link: '/domains'
    },
    {
      icon: <img src={coVentureIcon} alt="Venture" className="w-10 h-10 object-contain" />,
      titleKey: 'home.ventureTitle',
      descKey: 'home.ventureDesc',
      link: '/ventures'
    },
    {
      icon: <img src={coCreationIcon} alt="Technology" className="w-10 h-10 object-contain" />,
      titleKey: 'home.technologyTitle',
      descKey: 'home.technologyDesc',
      link: '/cocreation'
    },
    // {
    //   icon: <img src={auctionIcon} alt="Auctions" className="w-10 h-10 object-contain" />,
    //   titleKey: 'auctionsTitle',
    //   descKey: 'auctionsDesc',
    //   link: '/auctions'
    // },
    {
      icon: <img src={cobrotherProfile} alt="Disruptors" className="community-profile-icon" />,
      titleKey: 'home.disruptorsTitle',
      descKey: 'home.disruptorsDesc',
      link: '/disruptors'
    }
  ];

  return (
    <div className="bg-white">
      <TopNavbar homeMobileMenu />
      <HomeNavbar
        navRef={navRef}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        navigate={navigate}
      />

      <HeroGlow />
      <DomainSearchBar />
      <ExploreSection />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 md:grid-cols-[1.1fr_.9fr] items-center">
            <div className="space-y-8">
              <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-100/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-700 shadow-sm">
                CoBrother home for domains, ventures, creation and community
              </div>
              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold tracking-tight text-slate-950">
                  Build your online identity, grow your venture, and connect with creators.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Discover domains, co-ventures, technology and community tools from a single polished homepage.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.12)]">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-700 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950 mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-sm leading-7 text-slate-600 mb-6">{t(feature.descKey)}</p>
                  <ExploreButton onClick={() => navigate(feature.link)}>
                    {t('exploreBtn')}
                  </ExploreButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
