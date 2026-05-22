import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import cobrotherProfile from '../../assets/cobrother_community_profil.png';
import AnimatedLogoutButton from './AnimatedLogoutButton';
import CurrencyDropdown from './CurrencyDropdown';
import LanguageDropdown from './LanguageDropdown';

export default function HomeTopNavActions() {
  const { t } = useTranslation();
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [showInitial, setShowInitial] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (profileDropdownOpen && refreshUser) {
      refreshUser();
    }
  }, [profileDropdownOpen, refreshUser]);

  useEffect(() => {
    if (!user) {
      setShowInitial(false);
      return undefined;
    }

    const startFlip = setTimeout(() => setShowInitial(true), 1000);
    const interval = setInterval(() => setShowInitial((prev) => !prev), 3000);

    return () => {
      clearTimeout(startFlip);
      clearInterval(interval);
    };
  }, [user]);

  const getUserInitial = () => {
    if (!user) return '';
    return (
      user.fullName?.charAt(0)?.toUpperCase() ||
      user.name?.charAt(0)?.toUpperCase() ||
      user.email?.charAt(0)?.toUpperCase() ||
      'U'
    );
  };

  const getDisplayName = () => {
    if (!user) return 'User';
    const fName = user.firstName || user.firstname || user.FIRSTNAME || user.FirstName || '';
    const lName = user.lastName || user.lastname || user.LASTNAME || user.LastName || '';
    const full = user.fullName || user.fullname || user.FULLNAME || user.name || user.NAME || user.Name || '';
    if (full) return full;
    if (fName && lName) return `${fName} ${lName}`;
    if (fName) return fName;
    if (lName) return lName;
    if (user.email) {
      const username = user.email.split('@')[0].replace(/\./g, ' ');
      return username.charAt(0).toUpperCase() + username.slice(1);
    }
    return 'User';
  };

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <CurrencyDropdown variant="light" className="home-nav-util-currency home-nav-util-trigger" />
      <LanguageDropdown variant="light" className="home-nav-util-language home-nav-util-trigger" />

      <div className="relative hidden lg:block">
        <a
          href="/contact"
          className="flex cursor-pointer items-center gap-1 rounded border-none bg-transparent px-3 py-2 text-sm font-normal text-slate-700 no-underline transition-colors duration-200 font-body hover:bg-blue-100/70 hover:text-blue-900"
        >
          {t('contactUs')}
        </a>
      </div>

      <div className="home-top-nav-profile relative shrink-0" ref={profileRef}>
        <button
          type="button"
          className="home-top-nav-profile-btn relative block h-8 w-8 shrink-0 cursor-pointer rounded-full border-2 border-slate-300 bg-white shadow-sm no-underline transition-[box-shadow] duration-300 hover:border-slate-400 hover:bg-white hover:shadow-md focus:outline-none md:h-9 md:w-9"
          style={{
            perspective: '500px',
            transformStyle: 'preserve-3d',
          }}
          onClick={() => setProfileDropdownOpen((prev) => !prev)}
          aria-label="Account menu"
          aria-expanded={profileDropdownOpen}
        >
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-white transition-transform duration-500"
            style={{
              transform: showInitial ? 'rotateY(90deg) scale(0.55)' : 'rotateY(0deg) scale(1)',
              opacity: showInitial ? 0 : 1,
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={cobrotherProfile}
              alt="CoBrother profile"
              className="h-[85%] w-[85%] object-contain brightness-0"
            />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full border border-blue-300/80 bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white transition-all duration-500"
            style={{
              transform: showInitial ? 'rotateY(0deg) scale(0.9)' : 'rotateY(-90deg) scale(0.55)',
              opacity: showInitial ? 1 : 0,
              backfaceVisibility: 'hidden',
            }}
          >
            {getUserInitial()}
          </div>
        </button>

        {profileDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[11rem] overflow-visible z-[1001]">
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <a
                  href="/profile"
                  className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {t('profile')}
                </a>
                <a
                  href="/contact"
                  className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {t('contactPage')}
                </a>
                <a
                  href="/dashboard"
                  className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {t('dashboard')}
                </a>
                <a
                  href="/complete-profile"
                  className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {t('updateProfile')}
                </a>
                <a
                  href="/contact"
                  className="menu-item-gradient md:hidden block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {t('contactUs')}
                </a>
                <div className="border-t border-gray-100 px-4 py-3 flex justify-center overflow-visible">
                  <AnimatedLogoutButton onClick={handleLogout} label={t('logout')} />
                </div>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors no-underline"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {t('signIn')}
                </a>
                <a
                  href="/contact"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors no-underline"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {t('contactUs')}
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
