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
import FeedbackSection from '../components/home/FeedbackSection';
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
  const [isTopNavbarVisible, setIsTopNavbarVisible] = useState(true);
  const navRef = useRef(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    document.body.classList.add('home-page-body');
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (navRef.current) {
        if (currentY > 0) {
          navRef.current.classList.add('scrolled');
        } else {
          navRef.current.classList.remove('scrolled');
        }
      }

      if (currentY <= 4) {
        setIsTopNavbarVisible(true);
      } else {
        const delta = currentY - lastScrollYRef.current;
        if (delta > 6) setIsTopNavbarVisible(false);
        else if (delta < -6) setIsTopNavbarVisible(true);
      }
      lastScrollYRef.current = currentY;
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
      <TopNavbar homeMobileMenu isVisible={isTopNavbarVisible} />
      <HomeNavbar
        navRef={navRef}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        navigate={navigate}
        firstNavbarVisible={isTopNavbarVisible}
      />

      <HeroGlow />
      <DomainSearchBar />
      <ExploreSection />

{/* Homepage Cards Section */}
   <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
     {/* Heading */}
      <div className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
        <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-sky-100 to-emerald-100 text-sky-700 rounded-full shadow-sm">
          FEATURED TOOLS
    </span>

    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
      Explore the{" "}
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
          CoBrother
        </span>
        <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-gradient-to-r from-sky-200 to-emerald-200 blur-md opacity-70"></span>
      </span>{" "}
      pathways
    </h2>

    <p className="mt-5 text-gray-500 text-sm md:text-base">
      Discover powerful tools to build, scale, and dominate faster
    </p>
  </div>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card-glow-hover p-5 md:p-8 bg-white border border-gray-200 rounded-[16px] md:rounded-[20px] shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-purple mb-4 md:mb-5">{feature.icon}</div>
                <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{t(feature.titleKey)}</h3>
                <p className="text-lg text-gray-600 mb-5 md:mb-6 flex-1 leading-relaxed">{t(feature.descKey)}</p>
                <ExploreButton onClick={() => navigate(feature.link)}>
                  {t('home.explore')}
                </ExploreButton>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Feedback Section */}
      <section className="py-2 ">
        <FeedbackSection />
      </section>

      <HomeFooter />
    </div>
  );
}