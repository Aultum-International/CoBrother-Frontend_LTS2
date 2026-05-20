import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English (IND)' },
  { code: 'hi', name: 'Hindi' },
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'ur', name: 'Urdu' },
  { code: 'zh', name: '中文' },
  { code: 'fr', name: 'Français' },
  { code: 'pt', name: 'Português' },
  { code: 'de', name: 'Deutsch' },
];

function languageLabel(i18nLanguage) {
  const exact = LANGUAGES.find((l) => l.code === i18nLanguage);
  if (exact) return exact.name;
  const base = (i18nLanguage || '').split('-')[0];
  return LANGUAGES.find((l) => l.code === base)?.name || 'English (IND)';
}

export default function LanguageDropdown({ variant = 'dark', className = '' }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const isDark = variant === 'dark';
  const triggerCls = isDark
    ? 'text-white text-xs md:text-sm font-normal no-underline flex items-center gap-1 px-2 sm:px-2.5 md:px-3 py-1.5 rounded transition-colors duration-200 cursor-pointer bg-transparent border-none font-body hover:bg-white/15 hover:text-gray-200 max-w-[min(100%,11rem)]'
    : 'text-gray-700 text-xs sm:text-sm font-medium flex items-center gap-1 px-2.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer max-w-[min(100%,11rem)]';

  const panelCls =
    'absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px] overflow-hidden z-[1002]';

  return (
    <div className={`relative ${className}`.trim()} ref={ref}>
      <button
        type="button"
        className={triggerCls}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={14} className="shrink-0 md:w-4 md:h-4" />
        <span className="hidden md:inline truncate">{languageLabel(i18n.language)}</span>
        <ChevronDown size={14} className="shrink-0" />
      </button>
      {open && (
        <div className={panelCls} role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`w-full px-4 py-2.5 bg-transparent border-none text-left text-sm cursor-pointer transition-colors duration-200 font-body ${
                i18n.language === lang.code
                  ? 'bg-purple-50 text-purple font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
