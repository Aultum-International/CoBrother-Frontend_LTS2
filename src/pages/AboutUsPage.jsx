import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Globe2,
  HeartHandshake,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import coBrotherLogo from '../assets/Cobrother_logo.png';
import teamCeoPhoto from '../assets/team-neminath-akkole.png';

const CEO_LINKEDIN = 'https://www.linkedin.com/in/neminath-akkole/';

export default function AboutUsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const values = [
    { icon: HeartHandshake, k: '1' },
    { icon: Zap, k: '2' },
    { icon: Building2, k: '3' },
    { icon: Sparkles, k: '4' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar homeMobileMenu />
      <HomeNavbar
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        navigate={navigate}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.45), transparent 45%), radial-gradient(circle at 80% 0%, rgba(56,189,248,0.25), transparent 40%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pt-20 md:pb-32">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-200/90">
                {t('aboutPage.heroBadge')}
              </p>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-[3.25rem] font-bold leading-[1.1] tracking-tight">
                {t('aboutPage.heroTitle')}
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-300/95 leading-relaxed">
                {t('aboutPage.heroSubtitle')}
              </p>
            </div>
            <div className="shrink-0 flex justify-start lg:justify-end">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md">
                <img
                  src={coBrotherLogo}
                  alt="CoBrother"
                  className="h-14 sm:h-16 w-auto brightness-0 invert opacity-95"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating stats */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { valueKey: 'stat1Value', labelKey: 'stat1Label', icon: Globe2 },
            { valueKey: 'stat2Value', labelKey: 'stat2Label', icon: Target },
            { valueKey: 'stat3Value', labelKey: 'stat3Label', icon: HeartHandshake },
          ].map(({ valueKey, labelKey, icon: Icon }) => (
            <div
              key={valueKey}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5"
            >
              <Icon className="h-8 w-8 text-indigo-600 mb-3" strokeWidth={1.5} />
              <p className="text-2xl font-bold text-slate-900 tracking-tight">
                {t(`aboutPage.${valueKey}`)}
              </p>
              <p className="mt-1 text-sm text-slate-600 leading-snug">
                {t(`aboutPage.${labelKey}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-8 lg:mb-10">
            {t('aboutPage.teamTitle')}
          </h2>
          <article className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm ring-1 ring-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden ring-[4px] ring-white shadow-lg border-2 border-slate-100 bg-slate-100 shrink-0">
                <img
                  src={teamCeoPhoto}
                  alt={t('aboutPage.teamCeoName')}
                  className="h-full w-full object-cover object-[center_22%]"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                  {t('aboutPage.teamBadge')}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 m-0">
                  {t('aboutPage.teamCeoName')}
                </h3>
                <p className="text-sm font-semibold text-indigo-700 mt-1 mb-2">
                  {t('aboutPage.teamCeoRole')}
                </p>
                <a
                  href={CEO_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#004182] no-underline"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {t('aboutPage.teamLinkedInCta')}
                </a>
              </div>
              </div>
              <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/60 p-5 sm:p-6 flex flex-col justify-center">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-indigo-600 mb-3">
                  {t('aboutPage.teamQuoteLabel')}
                </p>
                <blockquote className="m-0 text-[0.95rem] sm:text-base text-slate-700 leading-relaxed font-medium">
                  "{t('aboutPage.teamQuote')}"
                </blockquote>
                <p className="mt-3 text-xs sm:text-sm text-slate-500">
                  {t('aboutPage.teamQuoteBy')}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 md:py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-4">
            {t('aboutPage.valuesTitle')}
          </h2>
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
            {t('aboutPage.valuesSubtitle')}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, k }) => (
              <div
                key={k}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:border-indigo-200/80"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-900/20 group-hover:scale-[1.03] transition-transform">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {t(`aboutPage.value${k}Title`)}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {t(`aboutPage.value${k}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 md:py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-6">{t('aboutPage.storyTitle')}</h2>
          <p className="text-slate-300 leading-relaxed mb-4">{t('aboutPage.storyP1')}</p>
          <p className="text-slate-300 leading-relaxed">{t('aboutPage.storyP2')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
            {t('aboutPage.ctaTitle')}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/join-form"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-indigo-700 shadow-lg shadow-indigo-950/30 transition hover:bg-slate-50 no-underline"
            >
              {t('aboutPage.ctaJoin')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 no-underline"
            >
              {t('aboutPage.ctaContact')}
            </Link>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
