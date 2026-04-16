import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FilterBar({
  search, onSearch,
  category, onCategory, categoryOptions = [],
  minPrice, maxPrice, onMinPrice, onMaxPrice,
  sortBy, onSort, sortOptions,
  onClear, activeFilterCount = 0,
  placeholder,
  theme = 'dark',
}) {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState(search || '');
  const debounceRef = useRef(null);

  const DEFAULT_SORT_OPTIONS = [
    { value: 'newest',     label: t('filter.newestFirst')  },
    { value: 'oldest',     label: t('filter.oldestFirst')  },
    { value: 'price_asc',  label: t('filter.priceLowHigh') },
    { value: 'price_desc', label: t('filter.priceHighLow') },
    { value: 'most_liked', label: t('filter.mostLiked')    },
    { value: 'most_viewed',label: t('filter.mostViewed')   },
  ];

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(searchInput), 300);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  useEffect(() => { if (!search) setSearchInput(''); }, [search]);

  const sorts = sortOptions || DEFAULT_SORT_OPTIONS;
  const showPrice = onMinPrice !== undefined && onMinPrice !== null;
  const isLight = theme === 'light';

  return (
    <div className={`rounded-[14px] p-4 px-5 mb-6 flex flex-col gap-3.5 ${
      isLight 
        ? 'bg-white border border-gray-200 shadow-sm' 
        : 'bg-white/[0.03] border border-white/[0.08]'
    }`}>
      <div className="flex gap-3 flex-wrap">
        <div className="flex-[1_1_220px] relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 inline-flex items-center justify-center pointer-events-none">
            <Search size={15} strokeWidth={2.4} />
          </span>
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder={placeholder || t('common.search') + '…'}
            className={`pl-9 w-full px-3 py-2 rounded-[10px] border outline-none transition-all ${
              isLight
                ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
                : 'bg-bg-input border-border-dark text-text placeholder:text-text-faint focus:border-gold'
            }`}
          />
        </div>
        <select
          value={sortBy}
          onChange={e => onSort(e.target.value)}
          className={`flex-[0_1_180px] px-3 py-2 rounded-[10px] border outline-none transition-all cursor-pointer ${
            isLight
              ? 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
              : 'bg-bg-input border-border-dark text-text focus:border-gold'
          }`}
        >
          {sorts.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        {categoryOptions.length > 0 && (
          <select
            value={category}
            onChange={e => onCategory(e.target.value)}
            className={`flex-[1_1_160px] px-3 py-2 rounded-[10px] border outline-none transition-all cursor-pointer filter-category-select ${
              isLight
                ? 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
                : 'bg-bg-input border-border-dark text-text focus:border-gold'
            }`}
          >
            <option value="">{t('filter.allCategories')}</option>
            {categoryOptions.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        )}

        {showPrice && (
          <div className="flex gap-2 items-center flex-[1_1_220px]">
            <input
              type="number" min="0"
              value={minPrice}
              onChange={e => onMinPrice(e.target.value)}
              placeholder={t('filter.minPrice')}
              className={`w-[90px] px-3 py-2 rounded-[10px] border outline-none transition-all ${
                isLight
                  ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
                  : 'bg-bg-input border-border-dark text-text placeholder:text-text-faint focus:border-gold'
              }`}
            />
            <span className={`text-[0.8rem] ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>—</span>
            <input
              type="number" min="0"
              value={maxPrice}
              onChange={e => onMaxPrice(e.target.value)}
              placeholder={t('filter.maxPrice')}
              className={`w-[90px] px-3 py-2 rounded-[10px] border outline-none transition-all ${
                isLight
                  ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
                  : 'bg-bg-input border-border-dark text-text placeholder:text-text-faint focus:border-gold'
              }`}
            />
          </div>
        )}

        {activeFilterCount > 0 && (
          <button
            onClick={onClear}
            className="bg-red-500/10 border border-red-500/25 rounded-lg px-3.5 py-1.5 text-[#c86e6e] text-[0.8rem] cursor-pointer flex items-center gap-1.5 whitespace-nowrap hover:bg-red-500/20 transition-colors"
          >
            {t('filter.clear')}
            <span className="bg-[#c86e6e] text-white rounded-full w-[18px] h-[18px] text-[0.68rem] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          </button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {searchInput && (
            <Chip label={`"${searchInput}"`} onRemove={() => { setSearchInput(''); onSearch(''); }} light={isLight} />
          )}
          {category && (
            <Chip label={category.replace(/_/g, ' ')} onRemove={() => onCategory('')} light={isLight} />
          )}
          {minPrice && (
            <Chip label={`${t('filter.minPrice')}${Number(minPrice).toLocaleString('en-IN')}`}
                  onRemove={() => onMinPrice('')} light={isLight} />
          )}
          {maxPrice && (
            <Chip label={`${t('filter.maxPrice')}${Number(maxPrice).toLocaleString('en-IN')}`}
                  onRemove={() => onMaxPrice('')} light={isLight} />
          )}
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove, light }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[20px] text-[0.72rem] border ${
      light 
        ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
        : 'bg-gold/12 border-gold/25 text-gold'
    }`}>
      {label}
      <span onClick={onRemove} className="cursor-pointer opacity-70 leading-none hover:opacity-100">✕</span>
    </span>
  );
}
