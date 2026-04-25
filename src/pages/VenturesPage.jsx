import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Share2 } from 'lucide-react';
import { ventureAPI, ventureAuctionAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import CoVentureModal from '../components/venture/CoVentureModal';
import { useLikes } from '../hooks/useLikes';
import LikeButton from '../components/common/LikeButton';
import { useFilterSort } from '../hooks/useFilterSort';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';
import SkeletonCard from '../components/common/Skeleton';
import ConfirmDialog from '../components/common/ConfirmDialog';
import DashboardIcon from '../assets/Dashboard.png';
import VentureIcon from '../assets/Coventure_logo.png';

const TYPE_LABELS = {
  FIFTY_FIFTY: '50:50', SIXTY_FORTY: '60:40', SEVENTY_THIRTY: '70:30',
  EIGHTY_TWENTY: '80:20', NINETY_TEN: '90:10', NEGOTIABLE: 'Negotiable',
};

const VENTURE_INDUSTRIES = [
  'TECH','FINANCE','HEALTHCARE','EDUCATION','FOOD_AND_BEVERAGE',
  'RETAIL','REAL_ESTATE','MEDIA','MANUFACTURING','LOGISTICS',
  'AGRICULTURE','AI_AUTOMATION','SAAS','ECOMMERCE','MARKETPLACE',
  'CONSUMER','B2B','FINTECH','HEALTHTECH','EDTECH','CLIMATE',
  'HOSPITALITY','TRAVEL','SPORTS','ENTERTAINMENT','OTHER'
].map(v => ({ value: v, label: v.replace(/_/g, ' ') }));

export default function VenturesPage() {
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const { t }     = useTranslation();

  const [allVentures, setAllVentures]       = useState([]);
  const [loading, setLoading]               = useState(true);
  const [applyTarget, setApplyTarget]       = useState(null);
  const [detailTarget, setDetailTarget]     = useState(null);
  const [deleteTarget, setDeleteTarget]     = useState(null);
  const [filterTab, setFilterTab]           = useState('all');

  const { toggle: toggleLike, get: getLike } = useLikes('VENTURE', allVentures);

  // ── Filter / sort / paginate ───────────────────────────────────────────────
  const {
    paginated, totalCount,
    search, category, minPrice, maxPrice, sortBy,
    handleSearch, handleCategory, handleMinPrice, handleMaxPrice, handleSort,
    clearAll, activeFilterCount,
    page, totalPages, setPage,
  } = useFilterSort(
    filterTab === 'mine'
      ? allVentures.filter(v => v.listedBy?.id === user?.id)
      : allVentures,
    {
      searchFields:  ['brandDetails.brandName', 'brandDetails.description'],
      priceField:    'brandDetails.dealValue',
      categoryField: 'brandDetails.industry',
      dateField:     'createdAt',
    },
    20
  );

  useEffect(() => {
    setLoading(true);
    ventureAPI.getAll()
      .then(({ data }) => setAllVentures(Array.isArray(data) ? data : (data?.data ?? [])))
      .catch(() => setAllVentures([]))
      .finally(() => setLoading(false));
  }, []);

  // Re-fetch when switching to 'mine' tab
  useEffect(() => {
    if (filterTab !== 'mine') return;
    setLoading(true);
    ventureAPI.getMyVentures()
      .then(({ data }) => setAllVentures(Array.isArray(data) ? data : (data?.data ?? [])))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filterTab]);

  const handleDelete = async () => {
    try {
      await ventureAPI.delete(deleteTarget);
      setAllVentures(v => v.filter(x => x.id !== deleteTarget));
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const refreshVentures = () => {
    const req = filterTab === 'mine' ? ventureAPI.getMyVentures() : ventureAPI.getAll();
    req.then(({ data }) =>
      setAllVentures(Array.isArray(data) ? data : (data?.data ?? [])));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-[28px] border border-indigo-100 bg-gradient-to-r from-[#f4f1ff] via-[#f7f6ff] to-[#eef2ff] px-6 py-7 md:min-h-[170px] md:px-8 md:py-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />
          <img src={VentureIcon} alt="" className="pointer-events-none absolute right-7 top-7 hidden h-24 w-24 opacity-15 md:block" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-bold text-gray-900 m-0">{t('venturesPage.title')}</h1>
                <p className="text-gray-600 mt-1">{t('venturesPage.subtitle')}</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" onClick={() => navigate('/ventures/dashboard')}>
                  <img src={DashboardIcon} alt="Dashboard" style={{width: '18px', height: '18px'}} /> {t('venturesPage.dashboard')}
                </button>
                <button className="inline-flex items-center rounded-xl border border-white/70 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" onClick={() => navigate('/ventures/analytics')}>
                  {t('venturesPage.analytics')}
                </button>
                <Link to="/ventures/new" className="inline-flex items-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(99,102,241,0.42)]">{t('venturesPage.listVenture')}</Link>
              </div>
            </div>

            <div className="inline-flex w-fit gap-2 rounded-2xl border border-white/70 bg-white/80 p-1.5">
              <button className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${filterTab === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setFilterTab('all')}>{t('venturesPage.allVentures')}</button>
              <button className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${filterTab === 'mine' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setFilterTab('mine')}>{t('venturesPage.myVentures')}</button>
            </div>
          </div>
        </section>

        {/* ── Filter bar ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <FilterBar
            search={search}           onSearch={handleSearch}
            category={category}       onCategory={handleCategory}
            categoryOptions={VENTURE_INDUSTRIES}
            minPrice={minPrice}       onMinPrice={handleMinPrice}
            maxPrice={maxPrice}       onMaxPrice={handleMaxPrice}
            sortBy={sortBy}           onSort={handleSort}
            onClear={clearAll}        activeFilterCount={activeFilterCount}
            placeholder={t('venturesPage.searchPlaceholder')}
            theme="light"
          />
        </div>

        {/* ── Result count ── */}
        {!loading && allVentures.length > 0 && (
          <div className="text-sm text-gray-600 mb-4">
            {t('venturesPage.venturesFound', { count: totalCount })}
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">◈</div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
              {activeFilterCount > 0 ? t('venturesPage.noVenturesMatch') :
               filterTab === 'mine' ? t('venturesPage.noVenturesYet') :
               t('venturesPage.noVenturesListed')}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeFilterCount > 0
                ? t('venturesPage.tryAdjusting')
                : t('venturesPage.beFirstVenture')}
            </p>
            {activeFilterCount > 0 && (
              <button className="btn-glow btn-glow-sm" onClick={clearAll}>{t('venturesPage.clearFilters')}</button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map(v => (
                <VentureCard
                  key={v.id}
                  venture={v}
                  isOwner={v.listedBy?.id === user?.id}
                  likeState={getLike(v.id)}
                  onLike={() => toggleLike(v.id)}
                  onView={() => setDetailTarget(v)}
                  onApply={() => setApplyTarget(v)}
                  onEdit={() => navigate(`/ventures/${v.id}/edit`)}
                  onDelete={() => setDeleteTarget(v.id)}
                />
              ))}
            </div>
            <Pagination
              page={page} totalPages={totalPages}
              onPage={setPage} totalCount={totalCount} pageSize={20}
            />
          </>
        )}
      </div>

      {/* ── Modals ── */}
      {detailTarget && (
        <VentureDetailModal
          venture={detailTarget}
          isOwner={detailTarget.listedBy?.id === user?.id}
          onClose={() => { setDetailTarget(null); refreshVentures(); }}
          onApply={() => { setApplyTarget(detailTarget); setDetailTarget(null); }}
          onEdit={() => { navigate(`/ventures/${detailTarget.id}/edit`); setDetailTarget(null); }}
          onDelete={() => { setDeleteTarget(detailTarget.id); setDetailTarget(null); }}
        />
      )}

      {applyTarget && (
        <CoVentureModal venture={applyTarget} onClose={() => setApplyTarget(null)} />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title={t('deleteVenture.title')}
        message={t('deleteVenture.message')}
        confirmLabel={t('deleteVenture.confirm')}
        cancelLabel={t('confirm.cancel')}
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AppLayout>
  );
}

// ─── Venture Card — Warm Professional Design ─────────────────────────────────
function VentureCard({ venture, isOwner, onView, onApply, onEdit, onDelete,
                        likeState, onLike }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef(null);
  const b = venture.brandDetails || {};
  const shortDesc = `${b.description?.slice(0, 120) || ''}${b.description?.length > 120 ? '…' : ''}`;
  const isAuction = venture.saleType === 'AUCTION';
  const auction   = venture.auction;

  useEffect(() => {
    const handleClick = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/ventures` : 'https://cobrother.com/ventures';
  const shareText = `Check out this venture: ${b.brandName} - Listed on CoBrother!`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const handleShare = (platform) => { window.open(platform, '_blank', 'width=600,height=400'); setShareOpen(false); };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-row border border-gray-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(200,140,50,0.12)] hover:-translate-y-0.5 transition-all duration-300"
      onClick={onView}
    >
      {/* Left accent strip */}
      <div className={`w-[5px] flex-shrink-0 ${isAuction ? 'bg-gradient-to-b from-amber-400 via-orange-400 to-rose-400' : 'bg-gradient-to-b from-orange-400 via-amber-400 to-yellow-300'}`} />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Top row — avatar + name + badges */}
        <div className="px-4 pt-4 pb-2 flex items-start gap-3">
          {b.ventureImageUrl ? (
            <img src={b.ventureImageUrl} alt={b.brandName}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-orange-100 shadow-sm flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl font-extrabold text-amber-700 bg-gradient-to-br from-amber-50 to-orange-100 ring-2 ring-orange-200/50 flex-shrink-0">
              {b.brandName?.[0] || '?'}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[0.95rem] font-extrabold text-gray-900 truncate leading-snug mb-1">
              {b.brandName}
            </h3>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`px-2 py-[3px] text-[9px] font-bold rounded-full uppercase tracking-wide ${
                isAuction ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-orange-50 text-orange-600 border border-orange-200'
              }`}>
                {isAuction ? '🔨 Auction' : '🤝 Co-Venture'}
              </span>
              {b.industry && (
                <span className="px-1.5 py-[2px] bg-gray-100 text-gray-500 text-[9px] font-bold rounded-full uppercase tracking-wide whitespace-nowrap">
                  {b.industry.replace(/_/g, ' ')}
                </span>
              )}
              {isOwner && (
                <span className="px-1.5 py-[2px] bg-amber-50 text-amber-700 text-[9px] font-extrabold rounded-full uppercase tracking-wide border border-amber-200">
                  ✦ Owner
                </span>
              )}
            </div>
          </div>
          {b.ventureType && (
            <span className="px-2 py-1 bg-orange-50 text-orange-500 text-[10px] font-bold rounded-lg border border-orange-200 whitespace-nowrap flex-shrink-0">
              {TYPE_LABELS[b.ventureType] || b.ventureType}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="px-4">
          <p className="text-[11.5px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
            {shortDesc || <span className="italic text-gray-300">No description yet</span>}
          </p>
        </div>

        {/* Price block */}
        <div className="px-4">
          {isAuction && auction ? (
            <div className="rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border border-amber-200/60 px-3.5 py-2.5 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-amber-700 tracking-tight">
                  ₹{Number(auction.currentHighestBid > 0 ? auction.currentHighestBid : (auction.minBidPrice || 0)).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-amber-500 font-semibold">
                  {auction.currentHighestBid > 0 ? 'highest' : 'min bid'}
                </span>
              </div>
              <span className="text-[10px] text-amber-400">{auction.totalBids} bid{auction.totalBids !== 1 ? 's' : ''}</span>
            </div>
          ) : b.dealValue ? (
            <div className="rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 px-3.5 py-2.5 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-amber-700 tracking-tight">
                  ₹{Number(b.dealValue).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-amber-500 font-semibold">deal value</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium px-4 py-2.5 border-t border-gray-100 mt-auto">
          <span className="flex items-center gap-1">👁 {venture.views || 0}</span>
          {!isAuction && (
            <span className="flex items-center gap-1">📋 {venture.coVentureApplicationCount || 0}</span>
          )}
          <LikeButton liked={likeState?.liked} count={likeState?.count} onToggle={onLike} />

          <div className="relative ml-auto" ref={shareRef}>
            <button className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              onClick={(e) => { e.stopPropagation(); setShareOpen(!shareOpen); }} title="Share">
              <Share2 size={13} />
            </button>
            {shareOpen && (
              <div className="absolute right-0 bottom-full mb-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden min-w-[150px]">
                <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
                  <span className="text-[10px] font-semibold text-gray-500">Share via</span>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={(e) => { e.stopPropagation(); handleShare(linkedinShare); }}>LinkedIn</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={(e) => { e.stopPropagation(); handleShare(facebookShare); }}>Facebook</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  onClick={(e) => { e.stopPropagation(); handleShare(whatsappShare); }}>WhatsApp</button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-4 pb-4 pt-1" onClick={e => e.stopPropagation()}>
          {isOwner ? (
            <>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg transition-all hover:bg-gray-200" onClick={onView}>{t('venturesPage.view')}</button>
              <button className="flex-1 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg transition-all hover:bg-gray-800" onClick={onEdit}>{t('venturesPage.edit')}</button>
              <button className="px-3 py-2 bg-red-500 text-white text-xs font-bold rounded-lg transition-all hover:bg-red-600" onClick={onDelete}>{t('venturesPage.delete')}</button>
              {b.website && (
                <a href={b.website} target="_blank" rel="noreferrer"
                   className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center transition-all hover:bg-gray-200"
                   onClick={e => e.stopPropagation()}><ArrowUpRight size={14} /></a>
              )}
            </>
          ) : (
            <>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg transition-all hover:bg-gray-200" onClick={onView}>{t('venturesPage.viewDetails')}</button>
              {isAuction && auction?.id && auction.status !== 'DRAFT' ? (
                <button className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-lg transition-all hover:opacity-90"
                  onClick={() => navigate(`/venture-auction/${auction.id}`)}>{t('venturesPage.bidNow')}</button>
              ) : !isAuction ? (
                <button className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg transition-all hover:opacity-90"
                  onClick={onApply}>{t('venturesPage.coVenture')}</button>
              ) : null}
              {b.website && (
                <a href={b.website} target="_blank" rel="noreferrer"
                   className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center transition-all hover:bg-gray-200"
                   onClick={e => e.stopPropagation()}><ArrowUpRight size={14} /></a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Venture Detail Modal ─────────────────────────────────────────────────────
function VentureDetailModal({ venture, isOwner, onClose, onApply, onEdit, onDelete }) {
  const [detail, setDetail]   = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched            = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    ventureAPI.get(venture.id)
      .then(({ data }) => setDetail(data?.data ?? data))
      .catch(() => setDetail(venture))
      .finally(() => setLoading(false));
  }, [venture.id]);

  const b = (detail || venture)?.brandDetails || {};
  const c = (detail || venture)?.contactInfo  || {};

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-slideUp">
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-purple-100/30 blur-3xl pointer-events-none" />
        <button className="absolute top-4 right-4 z-20 bg-transparent border-none text-gray-400 text-xl cursor-pointer transition-colors duration-200 hover:text-gray-700" onClick={onClose}>✕</button>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-12 h-12 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="relative z-10 p-8 pb-6">
              <div className="flex items-center gap-4 mb-6">
                {b.ventureImageUrl
                  ? <img src={b.ventureImageUrl} alt={b.brandName}
                         className="w-14 h-14 rounded-xl object-cover" />
                  : <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-display text-2xl font-bold text-indigo-600">
                      {b.brandName?.[0] || '?'}
                    </div>
                }
                <div>
                  <h2 className="font-display text-[1.75rem] font-semibold text-gray-900 m-0">{b.brandName}</h2>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {b.industry && (
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded">{b.industry.replace(/_/g, ' ')}</span>
                    )}
                    {b.ventureType && (
                      <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-semibold rounded">
                        {TYPE_LABELS[b.ventureType] || b.ventureType}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-4 mb-6 flex-wrap">
                {b.dealValue && (
                  <div className="px-4 py-2 bg-green-50 border border-green-300 rounded-lg text-sm text-green-700">
                    💰 ₹{Number(b.dealValue).toLocaleString('en-IN')}
                  </div>
                )}
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
                  👁 {(detail?.views ?? venture.views) || 0} views
                </div>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
                  📋 {(detail?.coVentureApplicationCount ??
                       venture.coVentureApplicationCount) || 0} applications
                </div>
              </div>
            </div>

            <div className="relative z-10 px-8">
              {b.description && (
                <Section title="About">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {b.description}
                  </p>
                </Section>
              )}

              {(c.email || c.phoneNumber) && (
                <Section title="Contact">
                  <div className="grid grid-cols-2 gap-3">
                    {c.email       && <DetailItem label="Email" value={c.email} />}
                    {c.phoneNumber && <DetailItem label="Phone" value={c.phoneNumber} />}
                  </div>
                </Section>
              )}

              {(b.website || b.videoUrl) && (
                <Section title="Links">
                  <div className="flex gap-3 flex-wrap">
                    {b.website && (
                      <a href={b.website} target="_blank" rel="noreferrer"
                         className="btn-glow btn-glow-sm">🌐 Website ↗</a>
                    )}
                    {b.videoUrl && (
                      <a href={b.videoUrl} target="_blank" rel="noreferrer"
                         className="btn-glow btn-glow-sm">🎬 Video ↗</a>
                    )}
                  </div>
                </Section>
              )}

              {(detail || venture).stage && (
                <Section title="Current Stage">
                  <span className="inline-block px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs text-indigo-600">
                    {{ IDEA: '💡 Idea', MVP: '🛠 MVP',
                       REVENUE_GENERATING: '💰 Revenue Generating',
                       SCALING: '🚀 Scaling' }[(detail || venture).stage]}
                  </span>
                </Section>
              )}

              {(detail || venture).lookingFor && (
                <Section title="Looking For">
                  <p className="text-gray-700 leading-relaxed text-sm m-0">
                    {(detail || venture).lookingFor}
                  </p>
                </Section>
              )}

              {(detail || venture).currentProblem && (
                <Section title="Current Challenge">
                  <p className="text-gray-700 leading-relaxed text-sm m-0">
                    {(detail || venture).currentProblem}
                  </p>
                </Section>
              )}

              {detail?.listedBy && (
                <Section title="Listed By">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-indigo-600 text-sm">
                      {detail.listedBy.firstname?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {detail.listedBy.firstname} {detail.listedBy.lastname}
                      </div>
                      <div className="text-xs text-gray-600">
                        {detail.listedBy.email}
                      </div>
                    </div>
                  </div>
                </Section>
              )}
            </div>

            {/* Actions */}
            <div className="relative z-10 px-8 pb-8 flex gap-3 flex-wrap">
              {isOwner ? (
                <>
                  <button className="btn-glow btn-glow-sm" onClick={onEdit}>✏ Edit</button>
                  <button className="px-5 py-2 bg-red-500 border border-red-500 text-white rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600" onClick={onDelete}>Delete</button>
                </>
              ) : (
                <button className="btn-glow btn-glow-sm" onClick={onApply}>Co-Venture →</button>
              )}
              <button className="px-5 py-2 bg-white border-2 border-gray-300 text-gray-600 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-50" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">{title}</div>
      {children}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="text-sm text-gray-900">{value}</div>
    </div>
  );
}
