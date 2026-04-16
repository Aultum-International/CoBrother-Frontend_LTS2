import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import VentureIcon from '../assets/Coventure_logo.png';
import CommunityIcon from '../assets/Community-profileicon.png';
import DomainsIcon from '../assets/CoBranding.png';
import TechnologyIcon from '../assets/CoCreation.png';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const cards = [
    {
      icon: VentureIcon,
      titleKey: 'dashboard.ventureTitle',
      descKey: 'dashboard.ventureDesc',
      to: '/ventures',
      ctaKey: 'dashboard.ventureBtn',
      accent: '#c8a96e',
    },
    {
      icon: CommunityIcon,
      titleKey: 'dashboard.communityTitle',
      descKey: 'dashboard.communityDesc',
      to: '/community',
      ctaKey: 'dashboard.communityBtn',
      accent: '#6e9ec8',
    },
    {
      icon: DomainsIcon,
      titleKey: 'dashboard.domainsTitle',
      descKey: 'dashboard.domainsDesc',
      to: '/domains',
      ctaKey: 'dashboard.domainsBtn',
      accent: '#6e9ec8',
    },
    {
      icon: TechnologyIcon,
      titleKey: 'dashboard.technologyTitle',
      descKey: 'dashboard.technologyDesc',
      to: '/cocreation',
      ctaKey: 'dashboard.technologyBtn',
      accent: '#6e9ec8',
    }
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <header className="p-6 bg-white border border-gray-200 rounded-[14px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-md mb-3">{t('dashboard.badge')}</span>
            <h1 className="font-display text-3xl font-bold text-gray-900 m-0">{t('dashboard.hello', { name: user?.firstname || user?.email?.split('@')[0] })}</h1>
            <p className="text-gray-600 mt-1">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
              <span className="text-xs text-gray-500 font-medium">{t('dashboard.role')}</span>
              <span className="text-sm text-gray-900 font-semibold">{user?.role || 'USER'}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <span className="text-xs text-gray-500 font-medium">{t('nav.profile')}</span>
              <span className="text-sm text-green-600 font-semibold">{t('dashboard.profileComplete')}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div key={c.to} className="card-glow-hover p-6 bg-white border border-gray-200 rounded-[14px] flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center mb-4">
                <img src={c.icon} alt={t(c.titleKey)} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{t(c.titleKey)}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{t(c.descKey)}</p>
              <Link to={c.to} className="btn-glow btn-glow-sm">{t(c.ctaKey)} →</Link>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-[14px] shadow-sm">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">{t('dashboard.quickActions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/ventures/new" className="btn-glow flex items-center justify-center gap-2">
              <span>+</span> {t('dashboard.listVentures')}
            </Link>
            <Link to="/community" className="btn-glow flex items-center justify-center gap-2">
              <img src={CommunityIcon} alt="" style={{width: '20px', height: '20px'}} /> {t('dashboard.viewCommunities')}
            </Link>
            <Link to="/domains" className="btn-glow flex items-center justify-center gap-2">
              <img src={DomainsIcon} alt="" style={{width: '20px', height: '20px'}} /> {t('dashboard.manageDomains')}
            </Link>
            <Link to="/cocreation" className="btn-glow flex items-center justify-center gap-2">
              <img src={TechnologyIcon} alt="" style={{width: '20px', height: '20px'}} /> {t('dashboard.exploreTechnologies')}
            </Link>
          </div>
        </div>
        <footer className="text-center py-4 text-sm text-gray-500">
          <p>{t('dashboard.footerText')}</p>
        </footer>
      </div>
    </AppLayout>
  );
}
