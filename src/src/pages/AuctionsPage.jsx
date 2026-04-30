import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard } from 'lucide-react';
import { auctionAPI, ventureAuctionAPI } from '../api/services';
import AppLayout from '../components/layout/AppLayout';
import AuctionImg from '../assets/Auction.png';
// Live countdown per card
function useCountdown(endTime) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft]   = useState('');
  const [isUrgent, setIsUrgent]   = useState(false);
  const [pct, setPct]             = useState(0); // % of time elapsed

  useEffect(() => {
    if (!endTime) return;
    const end = new Date(endTime.endsWith('Z') ? endTime : endTime + 'Z');

    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) { setTimeLeft(t('auctions.ended', 'Ended')); setIsUrgent(false); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setIsUrgent(diff < 300000);
      if (d > 0)      setTimeLeft(`${d}d ${h}h ${m}m`);
      else if (h > 0) setTimeLeft(`${h}h ${m}m ${s}s`);
      else            setTimeLeft(`${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime, t]);

  return { timeLeft, isUrgent };
}

export default function AuctionsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [domainAuctions, setDomainAuctions]   = useState([]);
  const [ventureAuctions, setVentureAuctions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // all | ventures | domains | ending_soon | no_bids

  useEffect(() => {
    setLoading(true);
    Promise.all([
      auctionAPI.getActive().then(({ data }) => Array.isArray(data) ? data : []).catch(() => []),
      ventureAuctionAPI.getActive().then(({ data }) => Array.isArray(data) ? data : []).catch(() => []),
    ]).then(([domains, ventures]) => {
      setDomainAuctions(domains);
      setVentureAuctions(ventures);
    }).finally(() => setLoading(false));
  }, []);

  const applyFilter = (list) => list.filter(a => {
    if (activeFilter === 'ending_soon') {
      const diff = new Date(a.endTime?.endsWith('Z') ? a.endTime : a.endTime + 'Z') - Date.now();
      return diff < 86400000;
    }
    if (activeFilter === 'no_bids') return a.totalBids === 0;
    return true;
  });

  const shownDomains  = (activeFilter === 'ventures') ? [] : applyFilter(domainAuctions);
  const shownVentures = (activeFilter === 'domains')  ? [] : applyFilter(ventureAuctions);
  const totalLive     = domainAuctions.length + ventureAuctions.length;

  return (
  <AppLayout>
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-indigo-100 bg-gradient-to-r from-[#f4f1ff] via-[#f7f6ff] to-[#eef2ff] px-6 py-7 md:min-h-[170px] md:px-8 md:py-8">
        
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />

        <img
          src={AuctionImg}
          alt=""
          className="pointer-events-none absolute right-7 top-7 hidden h-24 w-24 opacity-15 md:block"
        />

        <div className="relative flex flex-col gap-6">

          {/* 🔥 FIXED HEADER */}
          <div className="flex justify-between w-full">

            {/* LEFT */}
            <div className="flex flex-col">

              <h1 className="font-display text-3xl font-bold text-gray-900 m-0">
                {t('auctions.title', 'Live Auctions')}
              </h1>

              <p className="text-gray-600 mt-1">
                {totalLive > 0
                  ? t('auctions.liveCount', '{{count}} auction(s) live right now', { count: totalLive })
                  : t('auctions.noLiveAuctions', 'No live auctions at the moment')}
              </p>

              {/* ✅ TABS (NOW CORRECT POSITION) */}
              <div className="inline-flex flex-wrap w-fit gap-2 rounded-2xl border border-white/70 bg-white/80 p-1.5 mt-4">
                {[
                  { id: 'all', label: `${t('auctions.all', 'All')} (${totalLive})` },
                  { id: 'ventures', label: `🔨 ${t('auctions.ventures', 'Ventures')} (${ventureAuctions.length})` },
                  { id: 'domains', label: `◇ ${t('auctions.domains', 'Domains')} (${domainAuctions.length})` },
                  { id: 'ending_soon', label: `⚡ ${t('auctions.endingSoon', 'Ending Soon')}` },
                  { id: 'no_bids', label: `🆕 ${t('auctions.noBidsYet', 'No Bids Yet')}` },
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                      activeFilter === tab.id
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    onClick={() => setActiveFilter(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-end gap-3">

              <button
                className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard size={16} />
                {t('nav.dashboard', 'Dashboard')}
              </button>

            </div>

          </div>

        </div>

      </section>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <AuctionSkeleton key={i} />)}
          </div>
        ) : (shownDomains.length === 0 && shownVentures.length === 0) ? (
          <div className="text-center py-20">
            <div className="mb-4 flex justify-center">
              <img src={AuctionImg} alt="Auction" className="w-12 sm:w-20 md:w-24 lg:w-24 h-auto" />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{t('auctions.noMatch', 'No auctions match your filters')}</h3>
            <p className="text-gray-600 mb-6">{t('auctions.checkBack', 'Check back soon — new auctions go live regularly.')}</p>
            {activeFilter !== 'all' && (
              <button className="btn-glow btn-glow-sm" onClick={() => setActiveFilter('all')}>
                {t('auctions.viewAll', 'View All Auctions')}
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ── Venture Auctions section ── */}
            {shownVentures.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-base font-bold text-purple-600 m-0">🔨 {t('auctions.ventureAuctions', 'Venture Auctions')}</h2>
                  <span className="text-xs text-gray-500 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full font-semibold">
                    {shownVentures.length} {t('auctions.live', 'live')}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {shownVentures.map(auction => (
                    <VentureAuctionCard
                      key={auction.id}
                      auction={auction}
                      onClick={() => navigate(`/venture-auction/${auction.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Domain Auctions section ── */}
            {shownDomains.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-base font-bold text-blue-600 m-0">◇ {t('auctions.domainAuctions', 'Domain Auctions')}</h2>
                  <span className="text-xs text-gray-500 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                    {shownDomains.length} {t('auctions.live', 'live')}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {shownDomains.map(auction => (
                    <DomainAuctionCard
                      key={auction.id}
                      auction={auction}
                      onClick={() => navigate(`/auction/${auction.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}

// ─── Venture Auction Card ────────────────────────────────────────────────────────────
function VentureAuctionCard({ auction, onClick }) {
  const { t } = useTranslation();
  const { timeLeft, isUrgent } = useCountdown(auction.endTime);
  const venture  = auction.venture || {};
  const brand    = venture.brandDetails || {};
  const isExtended = auction.status === 'EXTENDED';

  return (
    <div className="card-glow-hover bg-white border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer relative" onClick={onClick}>
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold" style={{
        color: isExtended ? '#c8a96e' : '#6ec896',
        background: isExtended ? 'rgba(200,169,110,0.15)' : 'rgba(110,200,150,0.15)',
        border: `1px solid ${isExtended ? 'rgba(200,169,110,0.35)' : 'rgba(110,200,150,0.35)'}`,
      }}>
        {isExtended ? `⚡ ${t('auctions.extended', 'EXTENDED')}` : `🟢 ${t('auctions.liveStatus', 'LIVE')}`}
      </div>

      <div className="flex items-center gap-3 mb-4 pr-20">
        <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-lg font-bold text-purple-600 bg-purple-100 border border-purple-200">
          {brand.brandName?.[0] || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 m-0 truncate">{brand.brandName || '—'}</h3>
          <div className="flex gap-1.5 flex-wrap items-center">
            <span className="text-xs text-purple-600 font-semibold">🔨 {t('auctions.equityAuction', 'Equity Auction')}</span>
            {brand.industry && <span className="text-xs text-gray-500">· {brand.industry.replace(/_/g, ' ')}</span>}
          </div>
        </div>
      </div>

      {venture.verified && (
        <div className="mb-2">
          <span className="text-xs font-bold text-green-600 bg-green-100 border border-green-300 px-2 py-0.5 rounded">
            {t('auctions.gstinVerified', '✓ GSTIN Verified')}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-700 uppercase tracking-wider mb-1 font-bold">
            {auction.currentHighestBid > 0 ? t('auctions.highestBid', 'Highest Bid') : t('auctions.startingBid', 'Starting Bid')}
          </div>
          <div className={`font-display text-xl font-bold ${auction.currentHighestBid > 0 ? 'text-green-600' : 'text-amber-500'}`}>
            ₹{Number(auction.currentHighestBid > 0 ? auction.currentHighestBid : auction.minBidPrice).toLocaleString('en-IN')}
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-700 uppercase tracking-wider mb-1 font-bold">{t('auctions.totalBids', 'Total Bids')}</div>
          <div className="font-display text-xl font-bold text-gray-900">{auction.totalBids}</div>
        </div>
      </div>

      {auction.currentHighestBid > 0 && (
        <div className="text-sm text-gray-700 mb-3 font-semibold">
          {t('auctions.nextBid', 'Next bid')}: ≥ ₹{Number(auction.currentHighestBid * 1.05).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </div>
      )}

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
        <div>
          <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">{t('auctions.endsIn', 'Ends in')}</div>
          <div className={`font-display font-bold text-lg ${isUrgent ? 'text-red-500 animate-pulse' : 'text-amber-500'}`}>
            {timeLeft}
          </div>
        </div>
        <button onClick={e => { e.stopPropagation(); onClick(); }}
          className="btn-glow btn-glow-sm">
          {t('auctions.bidNow', 'Bid Now')} →
        </button>
      </div>
    </div>
  );
}

// ─── Domain Auction Card ────────────────────────────────────────────────────────────
function DomainAuctionCard({ auction, onClick }) {
  const { t } = useTranslation();
  const { timeLeft, isUrgent } = useCountdown(auction.endTime);
  const domain                  = auction.domain || {};
  const isExtended              = auction.status === 'EXTENDED';

  return (
    <div
      className="card-glow-hover bg-white border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer relative"
      onClick={onClick}
    >
      {/* Status pill */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold" style={{
        color: isExtended ? '#c8a96e' : '#6ec896',
        background: isExtended ? 'rgba(200,169,110,0.15)' : 'rgba(110,200,150,0.15)',
        border: `1px solid ${isExtended ? 'rgba(200,169,110,0.35)' : 'rgba(110,200,150,0.35)'}`,
      }}>
        {isExtended ? `⚡ ${t('auctions.extended', 'EXTENDED')}` : `🟢 ${t('auctions.liveStatus', 'LIVE')}`}
      </div>

      {/* Domain info */}
      <div className="flex items-center gap-3 mb-4 pr-20">
        <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-lg font-bold text-purple-600 bg-purple-100 border border-purple-200">
          {domain.domainExtension || '.?'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 m-0 truncate">{domain.domainName}{domain.domainExtension}</h3>
          <span className="text-xs text-purple-600 font-semibold">
            🔨 {t('auctions.auction', 'Auction')}
          </span>
        </div>
      </div>

      {/* Verified badge */}
      {domain.verified && (
        <div className="mb-2">
          <span className="text-xs font-bold text-green-600 bg-green-100 border border-green-300 px-2 py-0.5 rounded">
            {t('auctions.verified', '✓ Verified')}
          </span>
        </div>
      )}

      {/* Bid stats */}
      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-700 uppercase tracking-wider mb-1 font-bold">
            {auction.currentHighestBid > 0 ? t('auctions.highestBid', 'Highest Bid') : t('auctions.startingBid', 'Starting Bid')}
          </div>
          <div className={`font-display text-xl font-bold ${auction.currentHighestBid > 0 ? 'text-green-600' : 'text-amber-500'}`}>
            ₹{Number(
                auction.currentHighestBid > 0
                  ? auction.currentHighestBid
                  : auction.minBidPrice
              ).toLocaleString('en-IN')}
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-700 uppercase tracking-wider mb-1 font-bold">
            {t('auctions.totalBids', 'Total Bids')}
          </div>
          <div className="font-display text-xl font-bold text-gray-900">
            {auction.totalBids}
          </div>
        </div>
      </div>

      {/* Next bid minimum */}
      {auction.currentHighestBid > 0 && (
        <div className="text-sm text-gray-700 mb-3 font-semibold">
          {t('auctions.nextBid', 'Next bid')}: ≥ ₹{Number(auction.currentHighestBid * 1.05).toLocaleString('en-IN',
            { maximumFractionDigits: 0 })}
        </div>
      )}

      {/* Countdown */}
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
        <div>
          <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">
            {t('auctions.endsIn', 'Ends in')}
          </div>
          <div className={`font-display font-bold text-lg ${isUrgent ? 'text-red-500 animate-pulse' : 'text-amber-500'}`}>
            {timeLeft}
          </div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onClick(); }}
          className="btn-glow btn-glow-sm">
          {t('auctions.bidNow', 'Bid Now')} →
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function AuctionSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm pointer-events-none">
      <div className="flex gap-3 mb-4">
        <div className="w-11 h-11 rounded-[10px] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 w-[55%] rounded-md bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          <div className="h-2.5 w-[35%] rounded-md bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="h-[52px] rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        <div className="h-[52px] rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-7 w-[40%] rounded-md bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        <div className="h-8 w-[30%] rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      </div>
    </div>
  );
}

const bone = (style) => ({
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-shimmer 1.5s infinite',
  ...style,
});
