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
  Quote,
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

      {/* ========== OUR TEAM ========== */}
    {/* ========== OUR TEAM / LEADERSHIP ========== */}
<section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
  
  {/* ===== Background Glow Words ===== */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
    <span className="absolute top-10 left-[5%] text-[8rem] sm:text-[12rem] md:text-[16rem] font-black text-indigo-100/40 leading-none tracking-tighter">
      LEAD
    </span>
    <span className="absolute bottom-10 right-[5%] text-[8rem] sm:text-[12rem] md:text-[16rem] font-black text-violet-100/40 leading-none tracking-tighter">
      VISION
    </span>
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] sm:text-[14rem] md:text-[20rem] font-black text-slate-100/30 leading-none tracking-tighter">
      TEAM
    </span>
  </div>

  {/* Floating blur orbs */}
  <div className="pointer-events-none absolute top-20 left-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
  <div className="pointer-events-none absolute bottom-20 right-10 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
  <div className="pointer-events-none absolute top-1/2 right-1/4 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />

  <div className="relative max-w-7xl mx-auto">
    
    {/* ===== Section Header ===== */}
    <div className="text-center mb-12 sm:mb-16 md:mb-20">
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-4 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
          Leadership
        </p>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
        {t('aboutPage.teamTitle')}
      </h2>
      <div className="mt-5 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" />
      <p className="mt-5 text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
        Meet the visionary driving our mission forward
      </p>
    </div>

    {/* ===== Main Leadership Card ===== */}
    <article className="relative rounded-[2rem] bg-gradient-to-br from-white via-white to-indigo-50/30 shadow-2xl shadow-indigo-900/10 overflow-hidden border border-slate-200/60">
      
      {/* Card decorative corner gradients */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-indigo-200/40 via-violet-100/30 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-gradient-to-tr from-sky-200/40 via-indigo-100/30 to-transparent rounded-tr-full" />
      
      {/* Dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%236366f1\' fill-opacity=\'1\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 md:p-14">
        
        {/* ===== LEFT: CEO Image & Info ===== */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Larger CEO Image with premium effects */}
          <div className="relative group mb-6">
            {/* Outer glow rings */}
            <div className="absolute -inset-6 bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 animate-pulse transition-opacity duration-500" />
            <div className="absolute -inset-3 bg-gradient-to-br from-indigo-400 via-violet-400 to-sky-400 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
            
            {/* Rotating gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 rounded-full opacity-70" 
                 style={{ 
                   background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #0ea5e9, #6366f1)',
                   animation: 'spin 8s linear infinite'
                 }} />
            
            {/* Main image container - BIGGER */}
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 rounded-full overflow-hidden ring-[6px] ring-white shadow-2xl bg-slate-100">
              <img
                src={teamCeoPhoto}
                alt={t('aboutPage.teamCeoName')}
                className="h-full w-full object-cover object-[center_22%] group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent" />
            </div>

            {/* Floating achievement badges */}
           
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200/80 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-indigo-700 mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {t('aboutPage.teamBadge')}
          </span>

          {/* Name */}
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 m-0 tracking-tight">
            {t('aboutPage.teamCeoName')}
          </h3>

          {/* Role with gradient */}
          <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mt-2 mb-6">
            {t('aboutPage.teamCeoRole')}
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-700">Founder</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              <span className="text-xs font-semibold text-slate-700">Visionary</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold text-slate-700">Leader</span>
            </div>
          </div>

          {/* LinkedIn Button */}
          <a
            href={CEO_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#0077B5] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-[#0A66C2]/30 transition-all hover:shadow-2xl hover:shadow-[#0A66C2]/50 hover:-translate-y-0.5 no-underline overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            <svg className="relative h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="relative">{t('aboutPage.teamLinkedInCta')}</span>
            <ArrowRight className="relative h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* ===== RIGHT: Quote & Info ===== */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* Main Quote Card */}
          <div className="relative rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/40 p-6 sm:p-8 md:p-10 overflow-hidden shadow-lg">
            {/* Large decorative quote */}
            <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 h-20 w-20 sm:h-28 sm:w-28 text-indigo-200/60" strokeWidth={1} />
            <Quote className="absolute bottom-4 left-4 h-12 w-12 text-violet-200/40 rotate-180" strokeWidth={1} />

            <div className="relative">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-indigo-600 mb-5 flex items-center gap-2">
                <span className="h-0.5 w-6 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                {t('aboutPage.teamQuoteLabel')}
              </p>

              <blockquote className="m-0 text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed font-medium italic">
                <span className="text-4xl sm:text-5xl text-indigo-400 leading-none font-serif">"</span>
                {t('aboutPage.teamQuote')}
                <span className="text-4xl sm:text-5xl text-indigo-400 leading-none font-serif">"</span>
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 max-w-[3rem] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                <p className="text-sm font-bold text-slate-700">
                  {t('aboutPage.teamQuoteBy')}
                </p>
              </div>
            </div>
          </div>

          {/* Mini Achievement Cards Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="group/card relative rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-full opacity-60 group-hover/card:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md mb-2">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">15+</p>
                <p className="text-[0.7rem] sm:text-xs text-slate-600 font-medium leading-tight mt-0.5">Years Experience</p>
              </div>
            </div>

            <div className="group/card relative rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-violet-300 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-violet-100 to-transparent rounded-bl-full opacity-60 group-hover/card:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-md mb-2">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">500+</p>
                <p className="text-[0.7rem] sm:text-xs text-slate-600 font-medium leading-tight mt-0.5">Projects Led</p>
              </div>
            </div>

            <div className="group/card relative rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-sky-300 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-sky-100 to-transparent rounded-bl-full opacity-60 group-hover/card:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md mb-2">
                  <HeartHandshake className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">100%</p>
                <p className="text-[0.7rem] sm:text-xs text-slate-600 font-medium leading-tight mt-0.5">Commitment</p>
              </div>
            </div>
          </div>

          {/* Expertise tags */}
          <div className="rounded-xl bg-gradient-to-r from-slate-50 to-indigo-50/50 border border-slate-200/60 p-4 sm:p-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-slate-500 mb-3">
              Areas of Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {['Strategy', 'Innovation', 'Leadership', 'Product Vision', 'Team Building', 'Growth'].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent bar */}
      <div className="relative h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" />
    </article>
  </div>

  {/* Keyframe for spin animation */}
  <style>{`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>
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