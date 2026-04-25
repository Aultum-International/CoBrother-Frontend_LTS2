import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Plus, Trash2, ShoppingCart, ArrowUpRight, Share2 } from 'lucide-react';
import { cocreationAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import TechnologyIcon from '../assets/CoCreation.png';
import { useLikes } from '../hooks/useLikes';
import LikeButton from '../components/common/LikeButton';
import { useFilterSort } from '../hooks/useFilterSort';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';
import SkeletonCard from '../components/common/Skeleton';
import ConfirmDialog from '../components/common/ConfirmDialog';

const COCREATION_CATEGORIES = [
  'SAAS','MOBILE_APP','DESKTOP','API_TOOL',
  'AI_TOOL','CRM','ERP','ANALYTICS','AUTOMATION','ECOMMERCE','EDUCATION',
  'FINTECH','HEALTHTECH','MARKETING','PRODUCTIVITY','SECURITY','DEVOPS','OTHER'
].map(v => ({ value: v, label: v.replace(/_/g, ' ') }));

const CATEGORIES = [
  'SAAS','MOBILE_APP','DESKTOP','API_TOOL','AI_TOOL','CRM','ERP','ANALYTICS',
  'AUTOMATION','ECOMMERCE','EDUCATION','FINTECH','HEALTHTECH','MARKETING',
  'PRODUCTIVITY','SECURITY','DEVOPS','OTHER'
];

const STATUS_COLORS = {
  AVAILABLE: { color: '#6ec896', bg: 'rgba(110,200,150,0.1)', border: 'rgba(110,200,150,0.3)' },
  SOLD:      { color: '#c86e6e', bg: 'rgba(200,110,110,0.1)', border: 'rgba(200,110,110,0.3)' },
};

export default function CoCreationPage() {
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const { t } = useTranslation();

  const [allSoftware, setAllSoftware]       = useState([]);
  const [loading, setLoading]               = useState(true);
  const [showForm, setShowForm]             = useState(false);
  const [buyTarget, setBuyTarget]           = useState(null);
  const [successItem, setSuccessItem]       = useState(null);
  const [detailTarget, setDetailTarget]     = useState(null);
  const [deleteTarget, setDeleteTarget]     = useState(null);
  const [filterTab, setFilterTab]           = useState('all');

  const { toggle: toggleLike, get: getLike } = useLikes('SOFTWARE', allSoftware);

  const {
    paginated, totalCount,
    search, category, minPrice, maxPrice, sortBy,
    handleSearch, handleCategory, handleMinPrice, handleMaxPrice, handleSort,
    clearAll, activeFilterCount,
    page, totalPages, setPage,
  } = useFilterSort(
    filterTab === 'mine'
      ? allSoftware.filter(s => s.listedBy?.id === user?.id)
      : allSoftware,
    {
      searchFields:  ['name', 'description', 'techStack'],
      priceField:    'price',
      categoryField: 'category',
      dateField:     'createdAt',
    },
    20
  );
  const changeTab = (tab) => {
    setFilterTab(tab);
    setPage(1);
    setShowForm(false);
  };

  useEffect(() => {
    setLoading(true);
    cocreationAPI.getAll()
      .then(({ data }) => setAllSoftware(Array.isArray(data) ? data : (data?.data ?? [])))
      .catch(() => setAllSoftware([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    try {
      await cocreationAPI.delete(deleteTarget);
      setAllSoftware(s => s.filter(x => x.id !== deleteTarget));
    } catch (e) {
      alert(e.response?.data?.error || 'Failed to remove listing.');
    } finally { setDeleteTarget(null); }
  };

  const refreshSoftware = () =>
    cocreationAPI.getAll()
      .then(({ data }) => setAllSoftware(Array.isArray(data) ? data : (data?.data ?? [])));

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-[28px] border border-indigo-100 bg-gradient-to-r from-[#f4f1ff] via-[#f7f6ff] to-[#eef2ff] px-6 py-7 md:min-h-[170px] md:px-8 md:py-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />
          <img src={TechnologyIcon} alt="" className="pointer-events-none absolute right-7 top-7 hidden h-24 w-24 opacity-15 md:block" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-3xl font-bold text-gray-900 m-0">{t('technologyPage.title')}</h1>
                </div>
                <p className="text-gray-600">{t('technologyPage.subtitle')}</p>
              </div>
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" onClick={() => navigate('/cocreation/dashboard')}>
                  <LayoutDashboard size={16} /> {t('technologyPage.dashboard')}
                </button>
                {user && (
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(99,102,241,0.42)]" onClick={() => setShowForm(true)}>
                    <Plus size={16} /> {t('technologyPage.listTechnology')}
                  </button>
                )}
              </div>
            </div>

            <div className="inline-flex w-fit gap-2 rounded-2xl border border-white/70 bg-white/80 p-1.5">
              <button className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${filterTab === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => changeTab('all')}>{t('technologyPage.allTechnology')}</button>
              <button className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${filterTab === 'mine' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => changeTab('mine')}>{t('technologyPage.myListings')}</button>
            </div>
          </div>
        </section>

        {showForm && user && (
          <div className="mb-6">
            <SoftwareForm
              onSaved={s => { setAllSoftware(prev => [s, ...prev]); setShowForm(false); }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <FilterBar
            search={search}           onSearch={handleSearch}
            category={category}       onCategory={handleCategory}
            categoryOptions={COCREATION_CATEGORIES}
            minPrice={minPrice}       onMinPrice={handleMinPrice}
            maxPrice={maxPrice}       onMaxPrice={handleMaxPrice}
            sortBy={sortBy}           onSort={handleSort}
            onClear={clearAll}        activeFilterCount={activeFilterCount}
            placeholder={t('technologyPage.searchPlaceholder')}
            theme="light"
          />
        </div>

        {!loading && allSoftware.length > 0 && (
          <div className="text-sm text-gray-600 mb-4">
            {t('technologyPage.softwareFound', { count: totalCount })}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex justify-center mb-6">
              <img src={TechnologyIcon} alt="No software" className="w-20 h-20 object-contain opacity-30" />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
              {activeFilterCount > 0 ? t('technologyPage.noSoftwareMatch') :
               filterTab === 'mine' ? t('technologyPage.noListings') :
               t('technologyPage.noTechnologyYet')}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeFilterCount > 0
                ? t('technologyPage.tryAdjusting')
                : t('technologyPage.checkBack')}
            </p>
            {activeFilterCount > 0 && (
              <button className="btn-glow btn-glow-sm" onClick={clearAll}>{t('technologyPage.clearFilters')}</button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map(s => (
                <SoftwareCard
                  key={s.id}
                  item={s}
                  isOwner={s.listedBy?.id === user?.id || user?.role === 'ADMIN'}
                  likeState={getLike(s.id)}
                  onLike={() => toggleLike(s.id)}
                  onView={() => setDetailTarget(s)}
                  onBuy={() => setBuyTarget(s)}
                  onDelete={() => setDeleteTarget(s.id)}
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

      {buyTarget && (
        <BuySoftwareModal
          item={buyTarget}
          user={user}
          onClose={() => setBuyTarget(null)}
          onSuccess={item => {
            setSuccessItem(item);
            setBuyTarget(null);
            setAllSoftware(prev => prev.map(x => x.id === item.id ? item : x));
          }}
        />
      )}

      {successItem && (
        <PurchaseSuccessModal item={successItem} onClose={() => setSuccessItem(null)} />
      )}

      {detailTarget && (
        <SoftwareDetailModal
          item={detailTarget}
          isOwner={detailTarget.listedBy?.id === user?.id}
          likeState={getLike(detailTarget.id)}
          onLike={() => toggleLike(detailTarget.id)}
          onClose={() => { setDetailTarget(null); refreshSoftware(); }}
          onBuy={() => { setBuyTarget(detailTarget); setDetailTarget(null); }}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title={t('removeSoftware.title')}
        message={t('removeSoftware.message')}
        confirmLabel={t('removeSoftware.confirm')}
        cancelLabel={t('confirm.cancel')}
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AppLayout>
  );
}
function SoftwareCard({ item, isOwner, onView, onBuy, onDelete, likeState, onLike }) {
  const { t } = useTranslation();
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef(null);
  const status = STATUS_COLORS[item.softwareStatus] || STATUS_COLORS.AVAILABLE;
  const techTags = item.techStack
    ? item.techStack.split(',').map(tech => tech.trim()).filter(Boolean).slice(0, 3)
    : [];

  useEffect(() => {
    const handleClick = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/cocreation` : 'https://cobrother.com/cocreation';
  const shareText = `Check out this software: ${item.name} - Listed on CoBrother!`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const handleShare = (platform) => { window.open(platform, '_blank', 'width=600,height=400'); setShareOpen(false); };

  return (
    <div
      className="group relative rounded-[24px] overflow-hidden cursor-pointer flex flex-col border border-sky-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_44px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300"
      onClick={onView}
    >
      <div className="relative overflow-hidden px-4 pt-4 pb-4 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-70" style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.07) 0%, rgba(99,102,241,0.025) 45%, rgba(255,255,255,0) 100%)' }} />
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.name}
            className="absolute top-0 right-0 w-full h-full object-cover opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300" />
        )}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name}
                  className="w-12 h-12 rounded-2xl object-cover shadow-md ring-1 ring-white" />
              ) : (
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-sky-700 bg-white border border-sky-100 shadow-sm">
                  TECH
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-display text-[1rem] font-bold text-gray-900 truncate leading-snug">
                  {item.name}
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">
                  {item.category?.replace(/_/g, ' ') || 'Technology'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <span
                className="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide border"
                style={{ color: status.color, background: status.bg, borderColor: status.border }}
              >
                {item.softwareStatus}
              </span>
              {item.official && (
                <span className="px-2 py-[3px] bg-amber-50 text-amber-700 text-[9px] font-bold rounded-full uppercase tracking-wide border border-amber-200">
                  {t('technologyPage.official')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 bg-white text-sky-700 text-[10px] font-semibold rounded-full border border-sky-100 shadow-sm">
              Digital Product
            </span>
            {isOwner && (
              <span className="px-2.5 py-1 bg-white text-indigo-700 text-[10px] font-semibold rounded-full border border-indigo-100 shadow-sm">
                {t('technologyPage.owner')}
              </span>
            )}
            {techTags.map(tech => (
              <span key={tech} className="text-[10px] px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200 font-medium">
                {tech}
              </span>
            ))}
            {item.techStack && item.techStack.split(',').map(tech => tech.trim()).filter(Boolean).length > 3 && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white text-gray-500 border border-gray-200 font-medium">
                +more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative px-4 pb-4 pt-3 flex flex-col flex-1">
        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-4 min-h-[36px]">
          {item.description || <span className="italic text-gray-300">No description</span>}
        </p>

        {/* Price block */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-100 px-4 py-3 mb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.18em] text-sky-500 font-semibold mb-1">
                {t('technologyPage.askingPrice')}
              </div>
              <span className="text-[1.65rem] font-extrabold text-slate-900 tracking-tight">
                ₹{Number(item.price).toLocaleString('en-IN')}
              </span>
            </div>
            <span className="px-2.5 py-1 bg-white text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wide border border-sky-100 whitespace-nowrap">
              {item.pricingDemand || 'Fixed'}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-medium py-2 border-t border-gray-100 mt-auto">
          <span className="flex items-center gap-1">👁 {item.views || 0}</span>
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
        <div className="flex gap-2 mt-1 items-center" onClick={e => e.stopPropagation()}>
          {isOwner ? (
            <>
              <button className="flex-1 py-2 bg-red-500 text-white text-xs font-bold rounded-lg transition-all hover:bg-red-600 inline-flex items-center justify-center gap-1.5"
                onClick={e => { e.stopPropagation(); onDelete(); }}>
                <Trash2 size={13} /> {t('technologyPage.remove')}
              </button>
              <button
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-600 transition-all hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md"
                onClick={onView} title={t('technologyPage.viewDetails')}>
                <ArrowUpRight size={16} />
              </button>
            </>
          ) : (
            <>
              {item.softwareStatus === 'AVAILABLE' ? (
                <button
                  onClick={e => { e.stopPropagation(); onBuy(); }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-bold rounded-xl transition-all hover:opacity-95 inline-flex items-center justify-center gap-1.5 shadow-[0_8px_20px_rgba(59,130,246,0.18)]">
                  <ShoppingCart size={13} /> {t('technologyPage.buyNow')}
                </button>
              ) : (
                <span className="flex-1 py-2 text-center text-[11px] text-gray-400 font-medium">
                  {item.softwareStatus === 'SOLD' ? t('technologyPage.sold') : 'Pending'}
                </span>
              )}
              <button
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-600 transition-all hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md"
                onClick={onView} title={t('technologyPage.viewDetails')}>
                <ArrowUpRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Software Form (admin only) ───────────────────────────────────────────────
function SoftwareForm({ onSaved, onCancel }) {
  const [form, setForm] = useState({
    name: '', description: '', videoLink: '', whatItDoes: '', howItHelps: '',
    githubLink: '', liveDemoLink: '', techStack: '',
    category: '', pricingDemand: '', price: '',
    agreement: { terms: false },
  });
  const [liveDemoProtocol, setLiveDemoProtocol] = useState('https://');
  const [githubProtocol, setGithubProtocol] = useState('https://');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const [savedSoftware, setSavedSoftware]   = useState(null);
  const [imageFile, setImageFile]           = useState(null);
  const [imagePreview, setImagePreview]     = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError]         = useState('');
  const fileInputRef                        = useRef(null);
  const imageStepRef                        = useRef(null);
  const isValidUrl = (value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };
  const isValidGithubUrl = (value) => {
    if (!isValidUrl(value)) return false;
    try {
      return new URL(value).hostname.toLowerCase().endsWith('github.com');
    } catch {
      return false;
    }
  };
  const isValidVideoUrl = (value) => {
    if (!value) return true;
    if (!isValidUrl(value)) return false;
    const hostname = new URL(value).hostname.toLowerCase();
    return ['youtube.com', 'youtu.be', 'loom.com', 'vimeo.com'].some((domain) =>
      hostname === domain || hostname.endsWith(`.${domain}`)
    );
  };

  const getScrollParent = (node) => {
    let current = node?.parentElement;
    while (current) {
      const styles = window.getComputedStyle(current);
      const canScroll = /(auto|scroll)/.test(styles.overflowY) && current.scrollHeight > current.clientHeight;
      if (canScroll) return current;
      current = current.parentElement;
    }
    return null;
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const stripProtocol = (value) => value.replace(/^https?:\/\//i, '');
  const setUrlWithProtocol = (key, protocol, value) => {
    const rest = stripProtocol(value);
    set(key, rest ? `${protocol}${rest}` : '');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValidVideoUrl(form.videoLink)) {
      setError('Please enter a valid demo video URL from YouTube, Loom, or Vimeo.');
      return;
    }
    if (!isValidUrl(form.liveDemoLink)) {
      setError('Please enter a valid live demo URL.');
      return;
    }
    if (!isValidGithubUrl(form.githubLink)) {
      setError('Please enter a valid GitHub URL.');
      return;
    }
    setLoading(true); setError('');
    try {
      const { data } = await cocreationAPI.create(form);
      setSavedSoftware(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to list Technology.');
    } finally { setLoading(false); }
  };

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setImageError('Only image files are allowed.'); return; }
    setImageError('');
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!imageFile || !savedSoftware) return;
    setImageUploading(true); setImageError('');
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const { data } = await cocreationAPI.uploadImage(savedSoftware.id, formData);
      onSaved({ ...savedSoftware, imageUrl: data.imageUrl });
    } catch (err) {
      setImageError(err.response?.data?.error || 'Upload failed. You can add an image later.');
      setImageUploading(false);
    }
  };

  const handleSkip = () => onSaved(savedSoftware);

  const inputCls = 'px-3 py-2 border border-gray-300 rounded-[8px] text-gray-900 bg-white placeholder:text-gray-400 outline-none focus:border-indigo-500 transition-all w-full';
  const labelCls = 'text-sm font-medium text-gray-700';

  useEffect(() => {
    if (!savedSoftware || !imageStepRef.current) return;
    const stepEl = imageStepRef.current;
    const scrollParent = getScrollParent(stepEl);

    const scrollToTop = () => {
      stepEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect();
        const stepRect = stepEl.getBoundingClientRect();
        const parentTargetTop = stepRect.top - parentRect.top + scrollParent.scrollTop - 12;
        scrollParent.scrollTo({ top: Math.max(parentTargetTop, 0), behavior: 'smooth' });
      }
      const viewportTargetTop = stepEl.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(viewportTargetTop, 0), behavior: 'smooth' });
    };

    requestAnimationFrame(() => requestAnimationFrame(scrollToTop));
  }, [savedSoftware]);

  if (savedSoftware) {
    return (
      <div ref={imageStepRef} className="scroll-mt-24 p-8 bg-white border border-gray-200 rounded-[18px] shadow-sm">
        <h3 className="font-display text-2xl text-gray-900 font-semibold">
          Add an Image <span className="text-sm text-gray-400 font-normal">(optional)</span>
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Upload a cover image or logo for <strong className="text-indigo-600">{savedSoftware.name}</strong>. You can also do this later.
        </p>
        <div className="mt-5">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-3 ${
              imagePreview ? 'border-indigo-300 bg-indigo-50/50' : 'border-gray-200 bg-gray-50 hover:border-indigo-300'
            }`}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-[140px] max-w-full rounded-lg object-contain mx-auto" />
            ) : (
              <>
                <div className="text-4xl mb-2">🖼</div>
                <div className="text-sm text-gray-500">Click to choose an image</div>
                <div className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</div>
              </>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          {imagePreview && (
            <button type="button" className="text-xs text-gray-500 hover:text-red-500 mb-3"
              onClick={() => { setImageFile(null); setImagePreview(null); }}>✕ Remove</button>
          )}
          {imageError && <div className="text-sm text-red-500 mb-3">{imageError}</div>}
          <div className="flex gap-3">
            <button type="button" className="btn-glow flex-1"
              disabled={!imageFile || imageUploading} onClick={handleImageUpload}>
              {imageUploading ? <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin inline-block" /> : 'Upload Image →'}
            </button>
            <button type="button" className="btn-glow" onClick={handleSkip}>Skip</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white border border-gray-200 rounded-[18px] shadow-sm">
      <h3 className="font-display text-2xl text-gray-900 font-semibold">List Technology</h3>
      <p className="text-gray-500 text-sm mt-1">Add a new product to the Technology marketplace.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Software Name <span className="text-red-500">*</span></label>
          <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="e.g. InvoiceFlow" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Description <span className="text-red-500">*</span></label>
          <textarea className={`${inputCls} resize-vertical`} value={form.description} onChange={e => set('description', e.target.value)}
            placeholder="Brief overview of your software" rows={3} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>What It Does <span className="text-red-500">*</span></label>
            <textarea className={`${inputCls} resize-vertical`} value={form.whatItDoes} onChange={e => set('whatItDoes', e.target.value)}
              placeholder="Core functionality" rows={3} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>How It Helps <span className="text-red-500">*</span></label>
            <textarea className={`${inputCls} resize-vertical`} value={form.howItHelps} onChange={e => set('howItHelps', e.target.value)}
              placeholder="The problem it solves" rows={3} required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Category <span className="text-red-500">*</span></label>
            <select className={inputCls} value={form.category} onChange={e => set('category', e.target.value)} required>
              <option value="">Select category</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Tech Stack</label>
            <input className={inputCls} value={form.techStack} onChange={e => set('techStack', e.target.value)}
              placeholder="React, Spring Boot, PostgreSQL" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Price (₹) <span className="text-red-500">*</span></label>
            <input className={inputCls} type="number" min="0" value={form.price}
              onChange={e => set('price', e.target.value)}
              placeholder="e.g. 25000" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Pricing Type <span className="text-red-500">*</span></label>
            <select className={inputCls} value={form.pricingDemand}
              onChange={e => set('pricingDemand', e.target.value)} required>
              <option value="">Select a type</option>
              <option value="FIXED">Fixed Price</option>
              <option value="NEGOTIABLE">Negotiable</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Demo Video Link</label>
            <input className={inputCls} type="url" value={form.videoLink} onChange={e => set('videoLink', e.target.value)}
              placeholder="YouTube / Loom URL" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Live Demo Link</label>
            <div className="flex overflow-hidden border border-gray-300 rounded-[8px] bg-white focus-within:border-indigo-500">
              <select
                value={liveDemoProtocol}
                onChange={(e) => {
                  setLiveDemoProtocol(e.target.value);
                  setUrlWithProtocol('liveDemoLink', e.target.value, form.liveDemoLink);
                }}
                className="px-3 py-2 bg-gray-50 border-0 border-r border-gray-200 text-gray-700 outline-none cursor-pointer"
              >
                <option value="https://">https://</option>
                <option value="http://">http://</option>
              </select>
              <input className="px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 outline-none transition-all w-full" type="text" value={stripProtocol(form.liveDemoLink)} onChange={e => setUrlWithProtocol('liveDemoLink', liveDemoProtocol, e.target.value)}
                placeholder="yourdemo.com" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>
            GitHub link <span className="text-red-500">*</span>
            <span className="text-[0.72rem] text-gray-400 ml-2 font-normal">
              🔒 Not shared until the buyer confirms the purchase
            </span>
          </label>
          <div className="flex overflow-hidden border border-gray-300 rounded-[8px] bg-white focus-within:border-indigo-500">
            <select
              value={githubProtocol}
              onChange={(e) => {
                setGithubProtocol(e.target.value);
                setUrlWithProtocol('githubLink', e.target.value, form.githubLink);
              }}
              className="px-3 py-2 bg-gray-50 border-0 border-r border-gray-200 text-gray-700 outline-none cursor-pointer"
            >
              <option value="https://">https://</option>
              <option value="http://">http://</option>
            </select>
            <input className="px-3 py-2 text-gray-900 bg-white placeholder:text-gray-400 outline-none transition-all w-full" type="text" value={stripProtocol(form.githubLink)} onChange={e => setUrlWithProtocol('githubLink', githubProtocol, e.target.value)}
              placeholder="github.com/you/repo" required />
          </div>
        </div>

        <label className="inline-flex items-center gap-3 cursor-pointer self-start rounded-[12px] border border-purple-100 bg-purple-50/60 px-3.5 py-2.5 max-w-full">
          <input type="checkbox" className="peer sr-only" checked={form.agreement.terms}
            onChange={e => setForm(f => ({ ...f, agreement: { terms: e.target.checked } }))}
            required />
          <span className={`relative w-5 h-5 rounded-[7px] border-2 flex items-center justify-center flex-shrink-0 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-purple-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] overflow-hidden ${form.agreement.terms ? 'bg-purple-600 border-purple-600' : 'bg-white border-purple-300'}`}>
            <span className={`absolute left-[6px] top-[1px] w-[5px] h-[10px] border-r-[2.5px] border-b-[2.5px] border-white rotate-45 transition-all duration-150 z-10 ${form.agreement.terms ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} aria-hidden="true"></span>
          </span>
          <span className="text-sm text-gray-700 leading-snug">I confirm that this software is ready for sale and agree to the Terms and Conditions.</span>
        </label>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="flex gap-3 mt-2">
          <button type="submit" className="btn-glow flex-1" disabled={loading}>
            {loading ? <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin inline-block" /> : 'List Technology →'}
          </button>
          <button type="button" className="btn-glow" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ─── Buy Technology Modal ── UPGRADED with CoBrother opt-in + billing breakdown ─
function BuySoftwareModal({ item, user, onClose, onSuccess }) {
  const [form, setForm] = useState({
    buyerFullName: `${user?.firstname || ''} ${user?.lastname || ''}`.trim(),
    buyerEmail:    user?.email || '',
    buyerPhone:    user?.phoneNumber || '',
  });
  const [coBrotherOptIn, setCoBrotherOptIn] = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');

  const basePrice    = item.price;
  const coBrotherFee = coBrotherOptIn ? 1000 : 0;
  const totalPrice   = basePrice + coBrotherFee;

  const handlePay = async () => {
    setLoading(true); setError('');
    try {
      // Pass both buyer info AND coBrotherOptIn to backend
      const { data: orderData } = await cocreationAPI.createOrder(item.id, {
        ...form,
        coBrotherOptIn,
      });

      const options = {
        key:         orderData.keyId,
        amount:      orderData.amount * 100,
        currency:    orderData.currency,
        name:        'CoBrother',
        description: `${item.name}${coBrotherOptIn ? ' + CoBrother Help' : ''}`,
        order_id:    orderData.orderId,
        handler: async response => {
          try {
            const { data: verifyData } = await cocreationAPI.verifyPayment(item.id, {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId:   response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            onSuccess({
              ...item,
              softwareStatus:   'SOLD',
              paymentStatus:    'COMPLETED',
              completionStatus: 'PENDING',
              githubLink:       verifyData.githubLink,
              coBrotherOptIn,
              coBrotherHelpPaid: coBrotherOptIn,
            });
          } catch {
            setError('Payment verification failed. Contact support.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: async () => {
            await cocreationAPI.handleFailure(item.id);
            setLoading(false);
          },
        },
        prefill: { name: form.buyerFullName, email: form.buyerEmail, contact: form.buyerPhone },
        theme: { color: '#a06ec8' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', async () => {
        await cocreationAPI.handleFailure(item.id);
        setError('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data || 'Failed to initiate payment.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-[520px] bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-8">
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />
        <button className="absolute top-4 right-4 z-20 bg-transparent border-none text-gray-400 text-xl cursor-pointer transition-colors hover:text-gray-700" onClick={onClose}>✕</button>

        <div className="mb-6">
          <div className="inline-flex items-center px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded-full text-[0.72rem] font-semibold text-indigo-600 uppercase tracking-wide mb-2">Software Purchase</div>
          <h2 className="font-display text-[1.75rem] font-semibold text-gray-900 mb-1">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.category?.replace(/_/g, ' ')} · {item.pricingDemand}</p>
        </div>

        {/* Buyer details */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-medium">Full Name</label>
            <input className="px-3 py-2 border border-gray-300 rounded-[8px] text-gray-900 bg-white outline-none focus:border-indigo-500 transition-all" value={form.buyerFullName}
              onChange={e => setForm(f => ({ ...f, buyerFullName: e.target.value }))}
              placeholder="Your full name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 font-medium">Email</label>
              <input className="px-3 py-2 border border-gray-300 rounded-[8px] text-gray-900 bg-white outline-none focus:border-indigo-500 transition-all" type="email" value={form.buyerEmail}
                onChange={e => setForm(f => ({ ...f, buyerEmail: e.target.value }))}
                placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500 font-medium">Phone</label>
              <input className="px-3 py-2 border border-gray-300 rounded-[8px] text-gray-900 bg-white outline-none focus:border-indigo-500 transition-all" value={form.buyerPhone}
                onChange={e => setForm(f => ({ ...f, buyerPhone: e.target.value }))}
                placeholder="10-digit number" maxLength={10} />
            </div>
          </div>
        </div>

        {/* ── CoBrother opt-in card ── */}
        <div
          onClick={() => setCoBrotherOptIn(v => !v)}
          className={`flex flex-col gap-3 p-4 mb-5 cursor-pointer rounded-[10px] border transition-all ${coBrotherOptIn ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
        >
          <div className="flex items-start gap-3.5">
            <div className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-all ${coBrotherOptIn ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'}`}>
              {coBrotherOptIn && (
                <span className="text-white text-[0.65rem] font-bold">✓</span>
              )}
            </div>
            <div>
              <div className={`font-semibold text-[0.9rem] mb-1 ${coBrotherOptIn ? 'text-purple-700' : 'text-gray-700'}`}>
                ◆ Add CoBrother Helper{' '}
                <span className={`font-display text-[1rem] font-bold ${coBrotherOptIn ? 'text-purple-600' : 'text-indigo-600'}`}>
                  +₹1,000
                </span>
              </div>
              <div className="text-gray-500 text-[0.78rem] leading-relaxed">
                Get a dedicated CoBrother to help you set up, deploy, and get the most out of
                this software. They'll reach out within 24 hours.
              </div>
            </div>
          </div>
        </div>

        {/* ── Billing breakdown ── */}
        <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-4 mb-5">
          <div className="text-[0.72rem] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Billing Breakdown
          </div>
          <BillingLine label={item.name}
                       value={`₹${Number(basePrice).toLocaleString('en-IN')}`} />
          {coBrotherOptIn && (
            <BillingLine label="◆ CoBrother Helper" value="₹1,000" accent />
          )}
          <div className="h-px bg-gray-200 my-2.5" />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700 text-[0.9rem]">Total</span>
            <span className="font-display text-[1.5rem] font-bold text-green-600">
              ₹{Number(totalPrice).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg mb-5 text-sm text-amber-700">
          🔒 GitHub link will be shared after you confirm everything works.
          {coBrotherOptIn && ' Your CoBrother will reach out within 24 hours.'}
        </div>

        {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

        <div className="flex gap-3">
          <button className="btn-glow flex-1" onClick={handlePay} disabled={loading}>
            {loading ? <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin inline-block" /> :
              `Pay ₹${Number(totalPrice).toLocaleString('en-IN')} →`}
          </button>
          <button className="btn-glow" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// Billing line helper
function BillingLine({ label, value, accent }) {
  return (
    <div className="flex justify-between items-center py-1 text-[0.84rem]">
      <span className={accent ? 'text-purple-600' : 'text-gray-500'}>{label}</span>
      <span className={`font-medium ${accent ? 'text-purple-700' : 'text-gray-700'}`}>{value}</span>
    </div>
  );
}

// ─── Purchase Success Modal ───────────────────────────────────────────────────
function PurchaseSuccessModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-[440px] text-center bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-8">
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display text-[1.75rem] font-semibold text-gray-900 mb-2">
          Purchase Successful!
        </h2>
        <p className="text-gray-500 mb-6">
          You've purchased <strong className="text-gray-900">{item.name}</strong>
        </p>

        {item.githubLink && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-5 text-left">
            <div className="text-xs text-gray-500 mb-2">
              🔓 GitHub Repository
            </div>
            <a href={item.githubLink} target="_blank" rel="noreferrer"
               className="text-green-600 font-semibold break-all text-sm no-underline hover:underline">
              {item.githubLink}
            </a>
          </div>
        )}

        {item.coBrotherOptIn && (
          <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl mb-5 text-left text-sm text-purple-700">
            ◆ CoBrother Helper activated — expect an introduction within 24 hours.
          </div>
        )}

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6 text-sm text-amber-700 text-left">
          <p className="mb-2">✉️ A confirmation email has been sent to you.</p>
          <p className="m-0">
            🔒 Once you verify everything works, mark it as complete from your dashboard.
          </p>
        </div>

        <button className="btn-glow w-full" onClick={onClose}>
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}

// ─── Software Detail Modal ────────────────────────────────────────────────────
function SoftwareDetailModal({ item, isOwner, onClose, onBuy, likeState, onLike }) {
  const [detail, setDetail]   = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched            = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    cocreationAPI.get(item.id)
      .then(({ data }) => setDetail(data?.data ?? data))
      .catch(() => setDetail(item))
      .finally(() => setLoading(false));
  }, [item.id]);

  const d = detail || item;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border border-gray-200 rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-8">
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />
        <button className="absolute top-4 right-4 z-20 bg-transparent border-none text-gray-400 text-xl cursor-pointer transition-colors hover:text-gray-700" onClick={onClose}>✕</button>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-7 h-7 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="inline-flex items-center px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded-full text-[0.72rem] font-semibold text-indigo-600 uppercase tracking-wide">{d.category?.replace(/_/g, ' ')}</div>
                {d.official && (
                  <span className="text-[0.72rem] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    ✦ Official
                  </span>
                )}
              </div>
              <h2 className="font-display text-[1.75rem] font-semibold text-gray-900 mb-1">{d.name}</h2>
              <p className="text-sm text-gray-500">{d.pricingDemand}</p>
            </div>

            <div className="flex gap-3 mb-6 flex-wrap">
              <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                💰 ₹{Number(d.price).toLocaleString('en-IN')}
              </div>
              <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
                👁 {d.views || 0} views
              </div>
            </div>

            {d.description && (
              <Section title="Description">
                <p className="text-gray-600 leading-relaxed text-[0.9rem]">
                  {d.description}
                </p>
              </Section>
            )}

            {d.whatItDoes && (
              <Section title="What It Does">
                <p className="text-gray-600 leading-relaxed text-[0.9rem]">
                  {d.whatItDoes}
                </p>
              </Section>
            )}

            {d.howItHelps && (
              <Section title="How It Helps">
                <p className="text-gray-600 leading-relaxed text-[0.9rem]">
                  {d.howItHelps}
                </p>
              </Section>
            )}

            {d.techStack && (
              <Section title="Tech Stack">
                <div className="flex flex-wrap gap-1.5">
                  {d.techStack.split(',').map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {(d.videoLink || d.liveDemoLink) && (
              <Section title="Links">
                <div className="flex gap-3 flex-wrap">
                  {d.videoLink && (
                    <a href={d.videoLink} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-gray-500 font-semibold text-xs rounded-lg border border-gray-200 cursor-pointer transition-colors hover:bg-gray-100 no-underline" onClick={e => e.stopPropagation()}>
                      � Demo Video ↗
                    </a>
                  )}
                  {d.liveDemoLink && (
                    <a href={d.liveDemoLink} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-gray-500 font-semibold text-xs rounded-lg border border-gray-200 cursor-pointer transition-colors hover:bg-gray-100 no-underline" onClick={e => e.stopPropagation()}>
                      🌐 Live Demo ↗
                    </a>
                  )}
                </div>
              </Section>
            )}

            <Section title="GitHub">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-gray-500">
                🔒 GitHub link is shared after purchase is confirmed.
              </div>
            </Section>

            {d.listedBy && (
              <Section title="Listed By">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-indigo-600">
                    {d.listedBy.firstname?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="font-medium text-gray-800 text-[0.9rem]">
                    {d.listedBy.firstname} {d.listedBy.lastname}
                  </div>
                </div>
              </Section>
            )}

            <div className="flex gap-3 mt-6 flex-wrap items-center">
              {!isOwner && d.softwareStatus === 'AVAILABLE' && (
                <button className="btn-glow btn-glow-sm" onClick={onBuy}>Buy Now →</button>
              )}
              <LikeButton liked={likeState?.liked} count={likeState?.count}
                          onToggle={onLike} size="md" />
              <button className="btn-glow btn-glow-sm" onClick={onClose}>Close</button>
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
      <div className="text-[0.72rem] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}
