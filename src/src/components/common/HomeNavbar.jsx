import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import coBrotherLogo from '../../assets/Cobrother_logo.png';
import coBrotherLogoHover from '../../assets/Cobrother_logo2.png';

export default function HomeNavbar({
  navRef,
  openDropdown,
  setOpenDropdown,
  navigate,
  firstNavbarVisible = true,
}) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const getNavButtonClass = (menuKey) =>
    `nav-pill-glow flex items-center gap-2 px-3 lg:px-4 py-2 border rounded-full text-[14px] lg:text-[15px] font-semibold cursor-pointer transition-all duration-300 ${
      openDropdown === menuKey
        ? 'nav-pill-glow-active bg-white text-gray-900 border-[#1f2937]'
        : 'bg-transparent text-gray-900 border-transparent'
    }`;

  const getNavTextClass = (menuKey) =>
    `nav-pill-text ${openDropdown === menuKey ? 'nav-pill-text-active' : ''}`;

  return (
    <nav
      className={`w-full bg-white border-b-0 sticky z-50 transition-[top] duration-300 ${firstNavbarVisible ? 'top-[40px] md:top-[45px]' : 'top-0'}`}
      ref={navRef}
    >
      <div className="px-4 sm:px-6 lg:px-8 h-[60px] md:h-[70px] flex items-center justify-between relative">
        <div className="flex items-center gap-3 md:gap-6">
          <img
            src={logoHovered ? coBrotherLogoHover : coBrotherLogo}
            alt="CoBrother"
            className="h-8 md:h-10 w-auto cursor-pointer transition-all duration-200"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={() => navigate('/')}
          />

          <div className="hidden xl:flex items-center gap-1 xl:gap-4">
            <div className="relative">
              <button
                className={getNavButtonClass('domains')}
                onClick={() => setOpenDropdown(openDropdown === 'domains' ? null : 'domains')}
              >
                <span className={getNavTextClass('domains')}>{t('homeNav.domains')}</span>
                <ChevronDown size={14} />
              </button>
              {openDropdown === 'domains' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/domains'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.exploreDomains')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/domains/dashboard'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.listDomains')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/auctions'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.bidDomains')}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={getNavButtonClass('venture')}
                onClick={() => setOpenDropdown(openDropdown === 'venture' ? null : 'venture')}
              >
                <span className={getNavTextClass('venture')}>{t('homeNav.ventures')}</span>
                <ChevronDown size={14} />
              </button>
              {openDropdown === 'venture' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/ventures'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.exploreVenture')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/ventures/new'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.listVenture')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/auctions'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.bidVenture')}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={getNavButtonClass('auctions')}
                onClick={() => setOpenDropdown(openDropdown === 'auctions' ? null : 'auctions')}
              >
                <span className={getNavTextClass('auctions')}>{t('homeNav.auctions')}</span>
                <ChevronDown size={14} />
              </button>
              {openDropdown === 'auctions' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/auctions'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.domainAuction')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/venture-auction'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.ventureAuction')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/disruptors'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.disruptorAuction')}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={getNavButtonClass('technology')}
                onClick={() => setOpenDropdown(openDropdown === 'technology' ? null : 'technology')}
              >
                <span className={getNavTextClass('technology')}>{t('homeNav.technologies')}</span>
                <ChevronDown size={14} />
              </button>
              {openDropdown === 'technology' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/cocreation'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.exploreTechnology')}
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={getNavButtonClass('disruptors')}
                onClick={() => setOpenDropdown(openDropdown === 'disruptors' ? null : 'disruptors')}
              >
                <span className={getNavTextClass('disruptors')}>{t('homeNav.disruptors')}</span>
                <ChevronDown size={14} />
              </button>
              {openDropdown === 'disruptors' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-50 overflow-hidden">
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/join-form'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.beTheDisruptors')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/community'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.exploreDisruptors')}
                  </button>
                  <button
                    className="nav-dropdown-item block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => { navigate('/auctions'); setOpenDropdown(null); }}
                  >
                    {t('homeNav.bidDisruptors')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button
            className="xl:hidden bg-transparent border-none text-gray-900 cursor-pointer transition-colors duration-200 hover:text-gray-900"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden xl:flex items-center gap-2 xl:gap-3">
            <button className="btn-glow btn-glow-md" onClick={() => navigate('/join-form')}>
              {t('homeNav.joinUs')}
            </button>
            {!user ? (
              <button className="btn-glow btn-glow-md" onClick={() => navigate('/login')}>
                {t('homeNav.signIn')}
              </button>
            ) : (
              <button
                className="btn-glow btn-glow-md"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
              >
                {t('homeNav.logout')}
              </button>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="xl:hidden fixed top-[100px] inset-x-0 bottom-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="xl:hidden fixed top-[100px] left-0 w-[290px] max-w-[90vw] h-[calc(100dvh-100px)] bg-white shadow-2xl z-50 animate-[slideInLeft_0.3s_ease-out] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 m-0">{t('nav.menu')}</h3>
              <button
                className="bg-transparent border-none cursor-pointer text-gray-600 transition-colors duration-200 hover:text-gray-900"
                onClick={closeMobileMenu}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col py-2">
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => { navigate('/domains'); closeMobileMenu(); }}
              >
                {t('homeNav.domains')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => { navigate('/ventures'); closeMobileMenu(); }}
              >
                {t('homeNav.ventures')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => { navigate('/auctions'); closeMobileMenu(); }}
              >
                {t('homeNav.auctions')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => { navigate('/cocreation'); closeMobileMenu(); }}
              >
                {t('homeNav.technologies')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => { navigate('/community'); closeMobileMenu(); }}
              >
                {t('homeNav.disruptors')}
              </button>
              <div className="px-5 pt-4 pb-2 grid grid-cols-1 gap-2">
                <button className="btn-glow btn-glow-md w-full" onClick={() => { navigate('/join-form'); closeMobileMenu(); }}>
                  {t('homeNav.joinUs')}
                </button>
                {!user ? (
                  <button className="btn-glow btn-glow-md w-full" onClick={() => { navigate('/login'); closeMobileMenu(); }}>
                    {t('homeNav.signIn')}
                  </button>
                ) : (
                  <button
                    className="btn-glow btn-glow-md w-full"
                    onClick={() => { localStorage.clear(); window.location.href = '/'; closeMobileMenu(); }}
                  >
                    {t('homeNav.logout')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
