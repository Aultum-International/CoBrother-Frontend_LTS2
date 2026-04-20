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
  ArrowRight,
} from 'lucide-react';
import TopNavbar from '../components/common/TopNavbar';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import coBrotherLogo from '../assets/Cobrother_logo.png';

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

      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        {/* Glow effects */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.5), transparent 45%), radial-gradient(circle at 80% 0%, rgba(56,189,248,0.3), transparent 40%), radial-gradient(circle at 50% 100%, rgba(168,85,247,0.25), transparent 50%)',
          }}
        />
        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        {/* Animated orb */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 md:pt-24 md:pb-40">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
            <div className="max-w-2xl flex-1">
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
                </span>
                {t('aboutPage.heroBadge')}
              </p>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight">
                <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
                  {t('aboutPage.heroTitle')}
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300/95 leading-relaxed max-w-xl">
                {t('aboutPage.heroSubtitle')}
              </p>
            </div>

            {/* Logo card */}
            <div className="shrink-0 flex justify-start lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500" />
                <div className="relative rounded-2xl border border-white/15 bg-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
                  <img
                    src={coBrotherLogo}
                    alt="CoBrother"
                    className="h-14 sm:h-16 md:h-20 w-auto brightness-0 invert opacity-95"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-12 sm:h-16" preserveAspectRatio="none">
            <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ========== FLOATING STATS ========== */}
      <section className="relative z-10 -mt-20 sm:-mt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {[
            { valueKey: 'stat1Value', labelKey: 'stat1Label', icon: Globe2, color: 'indigo' },
            { valueKey: 'stat2Value', labelKey: 'stat2Label', icon: Target, color: 'violet' },
            { valueKey: 'stat3Value', labelKey: 'stat3Label', icon: HeartHandshake, color: 'sky' },
          ].map(({ valueKey, labelKey, icon: Icon, color }) => (
            <div
              key={valueKey}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 h-20 w-20 rounded-full blur-2xl opacity-10 ${color === 'indigo' ? 'bg-indigo-500' : color === 'violet' ? 'bg-violet-500' : 'bg-sky-500'}`} />
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-4 shadow-lg ${color === 'indigo' ? 'from-indigo-500 to-indigo-600 shadow-indigo-500/30' : color === 'violet' ? 'from-violet-500 to-violet-600 shadow-violet-500/30' : 'from-sky-500 to-sky-600 shadow-sky-500/30'}`}>
                <Icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {t(`aboutPage.${valueKey}`)}
              </p>
              <p className="mt-2 text-sm text-slate-600 leading-snug font-medium">
                {t(`aboutPage.${labelKey}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== VALUES ========== */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              {t('aboutPage.valuesTitle')}
            </h2>
            <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              {t('aboutPage.valuesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map(({ icon: Icon, k }, idx) => (
              <div
                key={k}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 hover:-translate-y-2 overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute top-3 right-4 text-5xl font-bold text-slate-100 group-hover:text-indigo-100 transition-colors">
                  0{k}
                </span>

                {/* Icon */}
                <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>

                <h3 className="relative mt-5 text-lg font-bold text-slate-900">
                  {t(`aboutPage.value${k}Title`)}
                </h3>
                <p className="relative mt-2 text-sm text-slate-600 leading-relaxed">
                  {t(`aboutPage.value${k}Desc`)}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STORY ========== */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden">
        {/* Background effects */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, rgba(99,102,241,0.3), transparent 40%), radial-gradient(circle at 70% 50%, rgba(168,85,247,0.2), transparent 40%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 mb-3">
            Our Journey
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">
              {t('aboutPage.storyTitle')}
            </span>
          </h2>
          <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 mb-8" />

          <div className="space-y-5 text-left sm:text-center">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {t('aboutPage.storyP1')}
            </p>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {t('aboutPage.storyP2')}
            </p>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 text-white overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Join Our Mission
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
            {t('aboutPage.ctaTitle')}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/join-form"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-xl shadow-indigo-950/40 transition-all hover:bg-slate-50 hover:shadow-2xl hover:-translate-y-0.5 no-underline w-full sm:w-auto"
            >
              {t('aboutPage.ctaJoin')}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/15 hover:border-white no-underline w-full sm:w-auto"
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