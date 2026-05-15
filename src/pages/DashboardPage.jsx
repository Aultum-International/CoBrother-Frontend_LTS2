import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import AppLayout from '../components/layout/AppLayout';
import VentureIcon from '../assets/Coventure_logo.png';
import CommunityIcon from '../assets/Cobrother_Profile.png';
import DomainsIcon from '../assets/CoBranding.png';
import TechnologyIcon from '../assets/CoCreation.png';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const cards = [
    {
      icon: VentureIcon,
      title: t('venture'),
      desc: t('ventureDesc'),
      to: '/ventures',
      cta: t('manageVentures'),
      accent: '#c8a96e',
    },
    {
      icon: CommunityIcon,
      title: 'Disruptors',
      desc: 'Connect with founders, investors, and operators',
      to: '/community',
      cta: 'Explore Disruptors',
      accent: '#6e9ec8',
    },
    {
      icon: DomainsIcon,
      title: t('domains'),
      desc: t('domainsDesc'),
      to: '/domains',
      cta: t('manageDomains'),
      accent: '#6e9ec8',
    },
    {
      icon: TechnologyIcon,
      title: t('technology'),
      desc: t('technologyDesc'),
      to: '/cocreation',
      cta: t('distributeSoftware'),
      accent: '#6e9ec8',
    }
  ];

  const firstName = user?.firstname || user?.firstName || user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Welcome back</p>
              <h1 className="text-2xl lg:text-3xl font-bold">Hello, {firstName}</h1>
              <p className="text-white/80 mt-2">What are you building today?</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-full">
                <span className="text-xs text-white/70">Role</span>
                <span className="ml-2 text-sm font-semibold">{user?.role || 'GUEST'}</span>
              </div>
              <div className="px-4 py-2 bg-green-500/20 backdrop-blur rounded-full">
                <span className="text-xs text-green-200">Profile</span>
                <span className="ml-2 text-sm font-semibold text-green-300">Complete ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid - glow border hover effect */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {cards.map((c) => (
            <div key={c.to} className="group bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col items-center text-center hover:shadow-[0_0_30px_rgba(99,102,241,0.3),0_0_60px_rgba(168,85,247,0.2)] hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300">
              <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mb-2 md:mb-4 bg-gray-50 rounded-xl md:rounded-2xl group-hover:scale-110 transition-transform">
                <img src={c.icon} alt={c.title} className="w-6 h-6 md:w-10 md:h-10 object-contain" />
              </div>
              <h3 className="font-display text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">{c.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4 flex-1 line-clamp-2 md:line-clamp-none">{c.desc}</p>
              <Link to={c.to} className="btn-glow btn-glow-sm w-full text-xs md:text-sm py-2 md:py-3 px-2 md:px-4 truncate">{c.cta} →</Link>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            <Link to="/ventures/new" className="btn-glow flex items-center justify-center gap-1.5 py-2 px-2 md:py-3 md:px-3 text-xs md:text-sm">
              <span className="text-base md:text-lg">+</span> <span className="truncate">List Ventures</span>
            </Link>
            <Link to="/community" className="btn-glow flex items-center justify-center gap-1.5 py-2 px-2 md:py-3 md:px-3 text-xs md:text-sm">
              <img src={CommunityIcon} alt="Disruptors" className="w-4 h-4 md:w-5 md:h-5" /> <span className="truncate">View Disruptors</span>
            </Link>
            <Link to="/domains" className="btn-glow flex items-center justify-center gap-1.5 py-2 px-2 md:py-3 md:px-3 text-xs md:text-sm">
              <img src={DomainsIcon} alt="Domains" className="w-4 h-4 md:w-5 md:h-5" /> <span className="truncate">Manage Domains</span>
            </Link>
            <Link to="/cocreation" className="btn-glow flex items-center justify-center gap-1.5 py-2 px-2 md:py-3 md:px-3 text-xs md:text-sm">
              <img src={TechnologyIcon} alt="Technology" className="w-4 h-4 md:w-5 md:h-5" /> <span className="truncate">Explore Tech</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-gray-400">
          <p>CoBrother Dashboard - Built for focused execution.</p>
        </footer>
      </div>
    </AppLayout>
  );
}
