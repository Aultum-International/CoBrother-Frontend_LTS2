import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import coBrotherLogo from '../../assets/Cobrother_logo.png';
import coBrotherLogoPurple from '../../assets/Cobrother_logo2.png';

export default function HomeNavbar({
  navRef,
  openDropdown,
  setOpenDropdown,
  navigate,
}) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="w-full bg-white border-b-0 sticky top-[40px] md:top-[45px] z-50" ref={navRef}>
      <div className="px-4 sm:px-6 lg:px-8 h-[60px] md:h-[70px] flex items-center justify-between relative">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative group cursor-pointer" onClick={() => navigate('/')}>
            <img src={coBrotherLogo} alt="CoBrother" className="h-8 md:h-10 w-auto transition-opacity duration-300 group-hover:opacity-0" />
            <img src={coBrotherLogoPurple} alt="CoBrother" className="h-8 md:h-10 w-auto absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="hidden lg:flex items-center gap-1 lg:gap-4">
            <div className="relative">
              <button
                className={`group relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-[14px] lg:text-[15px] font-semibold cursor-pointer transition-all duration-200 overflow-hidden bg-white ${
                  openDropdown === 'domains'
                    ? 'text-black'
                    : 'text-black hover:text-gray-900'
                }`}
                onClick={() => setOpenDropdown(openDropdown === 'domains' ? null : 'domains')}
              >
                <span className="relative z-10">{t('domains')}</span> <ChevronDown size={14} className="relative z-10" />
                <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
                <span className={`absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-opacity duration-300 ${openDropdown === 'domains' ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
              </button>
              {openDropdown === 'domains' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/domains');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('exploreDomains')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/domains/dashboard');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('listDomains')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/auctions');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('bidDomains')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`group relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-[14px] lg:text-[15px] font-semibold cursor-pointer transition-all duration-200 overflow-hidden bg-white ${
                  openDropdown === 'venture'
                    ? 'text-black'
                    : 'text-black hover:text-gray-900'
                }`}
                onClick={() => setOpenDropdown(openDropdown === 'venture' ? null : 'venture')}
              >
                <span className="relative z-10">{t('Ventures')}</span> <ChevronDown size={14} className="relative z-10" />
                <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
                <span className={`absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-opacity duration-300 ${openDropdown === 'venture' ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
              </button>
              {openDropdown === 'venture' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/ventures');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('exploreVenture')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/ventures/new');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('listVenture')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/auctions');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('bidVenture')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`group relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-[14px] lg:text-[15px] font-semibold cursor-pointer transition-all duration-200 overflow-hidden bg-white ${
                  openDropdown === 'auctions'
                    ? 'text-black'
                    : 'text-black hover:text-gray-900'
                }`}
                onClick={() => setOpenDropdown(openDropdown === 'auctions' ? null : 'auctions')}
              >
                <span className="relative z-10">{t('auctions')}</span> <ChevronDown size={14} className="relative z-10" />
                <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
                <span className={`absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-opacity duration-300 ${openDropdown === 'auctions' ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
              </button>
              {openDropdown === 'auctions' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/auctions');
                      setOpenDropdown(null);
                    }}
                  >
                    Domain Auction
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/venture-auction');
                      setOpenDropdown(null);
                    }}
                  >
                    Venture Auction
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/disruptors');
                      setOpenDropdown(null);
                    }}
                  >
                    Disruptor Auction
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`group relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-[14px] lg:text-[15px] font-semibold cursor-pointer transition-all duration-200 overflow-hidden bg-white ${
                  openDropdown === 'technology'
                    ? 'text-black'
                    : 'text-black hover:text-gray-900'
                }`}
                onClick={() => setOpenDropdown(openDropdown === 'technology' ? null : 'technology')}
              >
                <span className="relative z-10">{t('technologies')}</span> <ChevronDown size={14} className="relative z-10" />
                <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
                <span className={`absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-opacity duration-300 ${openDropdown === 'technology' ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
              </button>
              {openDropdown === 'technology' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/cocreation');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('exploreTechnology')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`group relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-[14px] lg:text-[15px] font-semibold cursor-pointer transition-all duration-200 overflow-hidden bg-white ${
                  openDropdown === 'disruptors'
                    ? 'text-black'
                    : 'text-black hover:text-gray-900'
                }`}
                onClick={() => setOpenDropdown(openDropdown === 'disruptors' ? null : 'disruptors')}
              >
                <span className="relative z-10">{t('disruptors')}</span> <ChevronDown size={14} className="relative z-10" />
                <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
                <span className={`absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-opacity duration-300 ${openDropdown === 'disruptors' ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="absolute inset-[2px] rounded-full bg-white"></span>
                </span>
              </button>
              {openDropdown === 'disruptors' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-50 overflow-hidden">
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/join-form');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('beTheDisruptors')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/community');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('exploreDisruptors')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                  <button
                    className="group relative block w-full px-4 py-3 border-none text-left text-sm text-gray-700 bg-transparent cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 overflow-hidden"
                    onClick={() => {
                      navigate('/auctions');
                      setOpenDropdown(null);
                    }}
                  >
                    {t('bidDisruptors')}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button
            className="lg:hidden bg-transparent border-none text-gray-900 cursor-pointer transition-colors duration-200 hover:text-gray-900"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex items-center gap-2 lg:gap-3">
            <button className="btn-glow btn-glow-md" onClick={() => navigate('/join-form')}>
              {t('joinUs')}
            </button>

            {!user ? (
              <button className="btn-glow btn-glow-md" onClick={() => navigate('/login')}>
                {t('signIn')}
              </button>
            ) : (
              <button
                className="btn-glow btn-glow-md"
                onClick={() => setShowLogoutConfirm(true)}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-6 max-w-sm w-full animate-slideUp">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 text-sm mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed top-[100px] inset-x-0 bottom-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="lg:hidden fixed top-[100px] left-0 w-[290px] max-w-[90vw] h-[calc(100dvh-100px)] bg-white shadow-2xl z-50 animate-[slideInLeft_0.3s_ease-out] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 m-0">Menu</h3>
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
                onClick={() => {
                  navigate('/domains');
                  closeMobileMenu();
                }}
              >
                {t('domains')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => {
                  navigate('/ventures');
                  closeMobileMenu();
                }}
              >
                {t('venture')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => {
                  navigate('/auctions');
                  closeMobileMenu();
                }}
              >
                {t('auctions')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => {
                  navigate('/cocreation');
                  closeMobileMenu();
                }}
              >
                {t('technologies')}
              </button>
              <button
                className="w-full px-5 py-3.5 border-none text-left text-base text-gray-700 bg-transparent cursor-pointer transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-gray-50 hover:text-gray-900 hover:border-l-gray-900"
                onClick={() => {
                  navigate('/community');
                  closeMobileMenu();
                }}
              >
                {t('disruptors')}
              </button>
              <div className="px-5 pt-4 pb-2 grid grid-cols-1 gap-2">
                <button className="btn-glow btn-glow-md w-full" onClick={() => { navigate('/join-form'); closeMobileMenu(); }}>
                  {t('joinUs')}
                </button>
                {!user ? (
                  <button className="btn-glow btn-glow-md w-full" onClick={() => { navigate('/login'); closeMobileMenu(); }}>
                    {t('signIn')}
                  </button>
                ) : (
                  <button
                    className="btn-glow btn-glow-md w-full"
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      closeMobileMenu();
                    }}
                  >
                    Logout
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
