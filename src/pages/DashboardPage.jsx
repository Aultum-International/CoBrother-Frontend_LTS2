import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { domainAPI } from '../api/services';
import AppLayout from '../components/layout/AppLayout';
import VentureIcon from '../assets/Coventure_logo.png';
import CommunityIcon from '../assets/Community-profileicon.png';
import DomainsIcon from '../assets/CoBranding.png';
import TechnologyIcon from '../assets/CoCreation.png';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [pendingDomainVerifyCount, setPendingDomainVerifyCount] = useState(0);

  useEffect(() => {
    domainAPI
      .getMyListings()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : data?.data ?? [];
        const n = list.filter(
          (d) =>
            d.domainStatus === 'AVAILABLE' &&
            !d.takenDown &&
            d.verified !== true
        ).length;
        setPendingDomainVerifyCount(n);
      })
      .catch(() => setPendingDomainVerifyCount(0));
  }, []);

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
        {pendingDomainVerifyCount > 0 && (
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-amber-50 border border-amber-200 rounded-[14px] shadow-sm"
            role="status"
          >
            <div className="flex gap-3 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800">
                <ShieldAlert className="w-5 h-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-base font-bold text-amber-950 m-0">
                  {t('dashboard.domainVerificationBannerTitle')}
                </h2>
                <p className="text-sm text-amber-900/90 mt-1 m-0 leading-relaxed">
                  {t('dashboard.domainVerificationBannerBody', { count: pendingDomainVerifyCount })}
                </p>
              </div>
            </div>
            <Link
              to="/domains/dashboard"
              className="btn-glow btn-glow-sm whitespace-nowrap flex-shrink-0 self-start sm:self-center"
            >
              {t('dashboard.domainVerificationBannerCta')} →
            </Link>
          </div>
        )}

        <header className="p-6 bg-white border border-gray-200 rounded-[14px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-fuchsia-50 px-4 py-2.5 shadow-sm shadow-indigo-100/60">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-500 text-white text-sm font-bold shadow-md">
                {(user?.firstname?.[0] || user?.email?.[0] || '?').toUpperCase()}
              </span>
              <h1 className="font-display text-3xl font-bold m-0 leading-tight">
                <span className="text-gray-900">Hello, </span>
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {user?.firstname || user?.email?.split('@')[0]}
                </span>
              </h1>
            </div>
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
      </div>
    </AppLayout>
  );
}
