import { Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import LikeButton from '../common/LikeButton';
import ListingBrowseFooter from './ListingBrowseFooter';

const STATUS_COLORS = {
  AVAILABLE: { color: '#6ec896', bg: 'rgba(110,200,150,0.1)', border: 'rgba(110,200,150,0.3)' },
  SOLD: { color: '#c86e6e', bg: 'rgba(200,110,110,0.1)', border: 'rgba(200,110,110,0.3)' },
};

const BTN = {
  edit: 'inline-flex h-[34px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50',
  remove: 'inline-flex h-[34px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100',
  buy: 'inline-flex h-[34px] shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90',
};

export default function TechnologyListingCard({
  item,
  isOwner,
  browseMode = false,
  onView,
  onEdit,
  onBuy,
  onDelete,
  likeState,
  onLike,
}) {
  const { formatPrice } = useCurrency();
  const { user } = useAuth();
  const s = STATUS_COLORS[item.softwareStatus] || STATUS_COLORS.AVAILABLE;
  const owner = isOwner ?? Number(item.listedBy?.id) === Number(user?.id);
  const roleUpper = (user?.role ?? '').toString().toUpperCase();
  const canDeleteAny = roleUpper === 'ADMIN' || roleUpper === 'ROLE_ADMIN'
    || roleUpper === 'COBROTHER' || roleUpper === 'ROLE_COBROTHER';

  const mainBlock = (
    <>
      <div className="mb-1 flex min-w-0 items-start gap-2">
        <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-indigo-200 bg-indigo-50 text-xl">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            '⧁'
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-[0.72rem] font-semibold uppercase tracking-wider text-indigo-600">
            {item.category?.replace(/_/g, ' ')}
          </span>
          <span className="truncate text-xs text-gray-500">
            {item.pricingDemand}
          </span>
        </div>
      </div>

      <div className="mt-1 flex min-w-0 items-start justify-between gap-1 sm:gap-2">
        <h3 className="font-display min-w-0 flex-1 break-words text-[1.05rem] font-semibold leading-snug text-gray-900 sm:text-[1.15rem] sm:leading-tight">
          {item.name}
        </h3>
        {(owner || item.official) && (
          <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-start sm:gap-1.5">
            {owner && (
              <div className="rounded border border-green-300 bg-green-100 px-1.5 py-0.5 text-[9px] font-semibold leading-tight text-green-700 whitespace-nowrap sm:px-2 sm:text-[0.7rem]">
                ✓ Owner
              </div>
            )}
            {item.official && (
              <div className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold leading-tight text-amber-600 whitespace-nowrap sm:px-2 sm:text-[0.68rem]">
                ✦ Official
              </div>
            )}
          </div>
        )}
      </div>

      <p className="my-1 text-[0.82rem] leading-relaxed text-gray-500 line-clamp-2">
        {item.description}
      </p>

      {item.techStack && (
        <div className="mb-1 flex flex-wrap gap-1.5">
          {item.techStack.split(',').slice(0, 3).map((tech) => (
            <span key={tech} className="rounded border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[0.7rem] text-indigo-600">
              {tech.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="mb-1">
        <span
          style={{
            padding: '0.25rem 0.6rem',
            borderRadius: 6,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: s.color,
            background: s.bg,
            border: `1px solid ${s.border}`,
          }}
        >
          {item.softwareStatus}
        </span>
      </div>

      <div className="font-display mt-1 text-[1.1rem] font-bold text-indigo-600">{formatPrice(item.price)}</div>
    </>
  );

  return (
    <div
      className={`listing-card-glow technology-listing-card card-glow-hover group relative flex h-full min-w-0 flex-col gap-2 overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all duration-300${
        browseMode ? '' : ' cursor-pointer'
      }`}
      onClick={browseMode ? undefined : onView}
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
        {mainBlock}
        {!browseMode && (
          <div className="mt-auto min-w-0 space-y-2 pt-1" onClick={(e) => e.stopPropagation()} role="presentation">
            <div className="flex min-w-0 items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye size={14} className="mt-[1px]" />
                <span>{item.views || 0}</span>
              </div>
              {onLike && (
                <div onClick={(e) => e.stopPropagation()} role="presentation">
                  <LikeButton liked={likeState?.liked} count={likeState?.count} onToggle={onLike} />
                </div>
              )}
            </div>
            {owner ? (
              <div className="flex w-full min-w-0 flex-nowrap items-center gap-2">
                <div className="flex min-w-0 flex-nowrap items-center gap-1.5">
                  {onEdit && (
                    <button type="button" className={BTN.edit} onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                      Edit
                    </button>
                  )}
                  <button type="button" className={BTN.remove} onClick={(e) => { e.stopPropagation(); onDelete?.(); }}>
                    Remove
                  </button>
                </div>
                <div className="ml-auto shrink-0">
                  {item.softwareStatus === 'AVAILABLE' && onBuy ? (
                    <button type="button" className={BTN.buy} onClick={(e) => { e.stopPropagation(); onBuy(); }}>
                      Buy Now →
                    </button>
                  ) : (
                    <span className="inline-flex h-[34px] items-center text-xs italic text-gray-400">Sold</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex w-full min-w-0 flex-nowrap items-center justify-end gap-1.5">
                {canDeleteAny ? (
                  <>
                    <button type="button" className={BTN.remove} onClick={(e) => { e.stopPropagation(); onDelete?.(); }}>
                      Remove
                    </button>
                    {item.softwareStatus === 'AVAILABLE' && onBuy && (
                      <button type="button" className={BTN.buy} onClick={(e) => { e.stopPropagation(); onBuy(); }}>
                        Buy Now →
                      </button>
                    )}
                  </>
                ) : item.softwareStatus === 'AVAILABLE' ? (
                  <button type="button" className={BTN.buy} onClick={(e) => { e.stopPropagation(); onBuy?.(); }}>
                    Buy Now →
                  </button>
                ) : (
                  <span className="inline-flex h-[34px] items-center text-xs italic text-gray-400">Sold</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {browseMode && (
        <ListingBrowseFooter onViewDetails={onView} className="mt-auto border-t border-gray-100 pt-2">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye size={14} className="mt-[1px]" />
              <span>{item.views || 0}</span>
            </div>
            {onLike && (
              <div onClick={(e) => e.stopPropagation()} role="presentation">
                <LikeButton liked={likeState?.liked} count={likeState?.count} onToggle={onLike} />
              </div>
            )}
          </div>
        </ListingBrowseFooter>
      )}
    </div>
  );
}
