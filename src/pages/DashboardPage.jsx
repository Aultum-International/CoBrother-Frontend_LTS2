import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import { useTranslation } from 'react-i18next';

import AppLayout from '../components/layout/AppLayout';

import VentureIcon from '../assets/Coventure_logo.png';

import CommunityIcon from '../assets/Community-profileicon.png';

import DomainsIcon from '../assets/CoBranding.png';

import TechnologyIcon from '../assets/CoCreation.png';

import AuctionIcon from '../assets/Auction.png';

import PurchaseIcon from '../assets/purchase.png';



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

      title: t('community'),

      desc: t('communityDesc'),

      to: '/community',

      cta: t('exploreCommunity'),

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



  return (

    <AppLayout>

      <div className="flex flex-col gap-6">

        <header className="p-6 bg-white border border-gray-200 rounded-[14px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div>

            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-md mb-3">Dashboard</span>

            <h1 className="font-display text-3xl font-medium text-gray-900 m-0">Hello, {user?.firstname || user?.email?.split('@')[0]}</h1>

            <p className="text-gray-600 mt-1">What are you building today?</p>

          </div>

          <div className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">

              <span className="text-xs text-gray-500 font-medium">Role</span>

              <span className="text-sm text-gray-900 font-medium">{user?.role || 'USER'}</span>

            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">

              <span className="text-xs text-gray-500 font-medium">Profile</span>

              <span className="text-sm text-green-600 font-medium">Complete ✓</span>

            </div>

          </div>

        </header>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {cards.map((c) => (

            <div key={c.to} className="card-glow-hover p-6 bg-white border border-gray-200 rounded-[14px] flex flex-col items-center text-center">

              <div className="w-16 h-16 flex items-center justify-center mb-4">

                <img src={c.icon} alt={c.title} className="w-full h-full object-contain" />

              </div>

              <h3 className="font-display text-xl font-medium text-gray-900 mb-2">{c.title}</h3>

              <p className="text-sm text-gray-600 mb-4 flex-1">{c.desc}</p>

              <Link to={c.to} className="btn-glow btn-glow-sm">{c.cta} →</Link>

            </div>

          ))}

        </div>



        <div className="p-6 bg-white border border-gray-200 rounded-[14px] shadow-sm">

          <h2 className="font-display text-2xl font-medium text-gray-900 mb-5">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <Link to="/ventures/new" className="btn-glow flex items-center justify-center gap-2">

              <span>+</span> List Ventures

            </Link>

            <Link to="/community" className="btn-glow flex items-center justify-center gap-2">

              <img src={CommunityIcon} alt="Community" style={{width: '20px', height: '20px'}} /> View Communities

            </Link>

            <Link to="/domains" className="btn-glow flex items-center justify-center gap-2">

              <img src={DomainsIcon} alt="Domains" style={{width: '20px', height: '20px'}} /> Manage Domains

            </Link>

            <Link to="/cocreation" className="btn-glow flex items-center justify-center gap-2">

              <img src={TechnologyIcon} alt="Technology" style={{width: '20px', height: '20px'}} /> Explore Technologies

            </Link>

          </div>

        </div>

        <footer className="text-center py-4 text-sm text-gray-500">

          <p>CoBrother Dashboard - Built for focused execution.</p>

        </footer>

      </div>

    </AppLayout>

  );

}

