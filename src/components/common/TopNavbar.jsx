import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import cobrotherProfile from '../../assets/CoBrother_profileW.png';
import AnimatedLogoutButton from './AnimatedLogoutButton';
import CurrencyDropdown from './CurrencyDropdown';

export default function TopNavbar({ homeMobileMenu = false }) {
  const { t, i18n } = useTranslation();
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const languageRef = useRef(null);
  const profileRef = useRef(null);

  // Close language and profile dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Refresh user data when profile dropdown opens to get latest name
  useEffect(() => {
    if (profileDropdownOpen && refreshUser) {
      refreshUser();
    }
  }, [profileDropdownOpen, refreshUser]);

  const languages = [
    { code: 'en', name: 'English (IND)' },
    { code: 'hi', name: 'Hindi' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'ur', name: 'Urdu' },
    { code: 'zh', name: '中文' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
  ];

  const currentLanguageName = languages.find((l) => l.code === i18n.language)?.name || 'English (IND)';

  // Slow flip animation every 3 seconds when user is logged in
  useEffect(() => {
    if (!user) {
      setShowInitial(false);
      return;
    }

    // Start the flip effect after 1 second
    const startFlip = setTimeout(() => {
      setShowInitial(true);
    }, 1000);

    // Flip every 3 seconds
    const interval = setInterval(() => {
      setShowInitial(prev => !prev);
    }, 3000);

    return () => {
      clearTimeout(startFlip);
      clearInterval(interval);
    };
  }, [user]);

  const getUserInitial = () => {
    if (!user) return '';
    return user.fullName?.charAt(0)?.toUpperCase() || user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U';
  };

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <div
      className="home-top-nav sticky top-0 w-full z-[1001] border-b border-purple/[0.18] font-body"
      style={{ background: 'linear-gradient(90deg, #0e0b1e 0%, #130d28 60%, #0f1225 100%)' }}
    >
      <div className="home-top-nav-inner w-full h-10 md:h-11 flex items-center justify-end">
  <div className="flex items-center gap-1.5 sm:gap-3 md:gap-5 min-w-0 ml-auto">

<CurrencyDropdown variant="dark" />
    <div className="relative" ref={languageRef}>
            <button
              type="button"
              className="text-white text-xs md:text-sm font-normal no-underline flex items-center gap-1 px-2 sm:px-2.5 md:px-3 py-1.5 rounded transition-colors duration-200 cursor-pointer bg-transparent border-none font-body hover:bg-white/15 hover:text-gray-200 max-w-[min(100%,11rem)]"
              onClick={() => setLanguageOpen((prev) => !prev)}
              aria-expanded={languageOpen}
              aria-haspopup="listbox"
            >
              <Globe size={14} className="shrink-0 md:w-4 md:h-4" />
              <span className="hidden md:inline truncate">{currentLanguageName}</span>
              <ChevronDown size={14} className="shrink-0" />
            </button>
            {languageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px] overflow-hidden z-[1001]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`w-full px-4 py-2.5 bg-transparent border-none text-left text-sm cursor-pointer transition-colors duration-200 font-body ${
                      i18n.language === lang.code
                        ? 'bg-purple-50 text-purple font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLanguageOpen(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative hidden lg:block">
            <a
              href="/contact"
              className="text-white text-sm font-normal no-underline flex items-center gap-1 px-3 py-2 rounded transition-colors duration-200 cursor-pointer bg-transparent border-none font-body hover:bg-white/15 hover:text-gray-200"
            >
              {t('contactUs')}
            </a>
          </div>

          {/* Profile/Initial Icon with Slow Flip */}
          <div className="relative ml-1 md:ml-2" ref={profileRef}>
            <button
              type="button"
              className="block w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full cursor-pointer no-underline transition-all duration-500 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
              style={{
                perspective: '500px',
                transformStyle: 'preserve-3d',
              }}
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
            >
              {/* Front - Profile Icon */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center border border-white/25 bg-transparent transition-all duration-500"
                style={{
                  transform: showInitial ? 'rotateY(90deg) scale(0.55)' : 'rotateY(0deg) scale(0.9)',
                  opacity: showInitial ? 0 : 1,
                  backfaceVisibility: 'hidden',
                }}
              >
                <img src={cobrotherProfile} alt="Profile" className="w-full h-full object-contain p-1" />
              </div>

              {/* Back - User Initial Circle */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center border border-white/25 bg-gradient-to-br from-black-500 to-indigo-600 text-white font-bold text-lg transition-all duration-500"
                style={{
                  transform: showInitial ? 'rotateY(0deg) scale(0.9)' : 'rotateY(-90deg) scale(0.55)',
                  opacity: showInitial ? 1 : 0,
                  backfaceVisibility: 'hidden',
                }}
              >
                {getUserInitial()}
              </div>
            </button>

            {/* Profile Dropdown - Mobile/Tablet Only */}
            {/* Profile Dropdown - All screens */}
            {profileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[11rem] overflow-visible z-[1001]">
                {user ? (
                  <>
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
                        {(() => {
                          // Debug: log all user fields to console
                          console.log('User object:', user);
                          
                          // Check all possible field names from backend (case insensitive)
                          const fName = user.firstName || user.firstname || user.FIRSTNAME || user.FirstName || '';
                          const lName = user.lastName || user.lastname || user.LASTNAME || user.LastName || '';
                          const full = user.fullName || user.fullname || user.FULLNAME || user.name || user.NAME || user.Name || '';
                          
                          console.log('Extracted:', { fName, lName, full, email: user.email });
                          
                          if (full) return full;
                          if (fName && lName) return `${fName} ${lName}`;
                          if (fName) return fName;
                          if (lName) return lName;
                          
                          // Fallback to email username
                          if (user.email) {
                            const username = user.email.split('@')[0];
                            // Remove dots and capitalize first letter
                            const cleanUsername = username.replace(/\./g, ' ');
                            return cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1);
                          }
                          return 'User';
                        })()}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <a
  href="/profile"
  className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
  onClick={() => setProfileDropdownOpen(false)}
>
  Profile
</a>

<a
  href="/contact"
  className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
  onClick={() => setProfileDropdownOpen(false)}
>
  Contact Page
</a>

                    <a
                      href="/dashboard"
                      className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Dashboard
                    </a>

                    <a
                      href="/complete-profile"
                      className="menu-item-gradient block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Update Profile
                    </a>

                    {/* Contact Us - visible only on mobile (md has it in navbar) */}
                    <a
                      href="/contact"
                      className="menu-item-gradient md:hidden block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors no-underline font-medium"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      {t('contactUs')}
                    </a>

                    <div className="border-t border-gray-100 px-4 py-3 flex justify-center overflow-visible">
                      <AnimatedLogoutButton onClick={handleLogout} label="Logout" />
                    </div>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors no-underline"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Sign In
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

        </div>
      </div>

      {homeMobileMenu && mobileMenuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 px-4 py-3 bg-[#130d28] border-b border-white/10">
          <div className="w-full flex flex-col gap-2">
            <a
              href="/"
              className="text-white text-sm px-3 py-2 rounded hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
          </div>
        </div>
      )}

      <style>{`
        .menu-item-gradient {
          position: relative;
          overflow: hidden;
        }
        .menu-item-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: -1;
        }
        .menu-item-gradient:hover::before {
          opacity: 0.08;
        }
        .menu-item-gradient:hover {
          background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

