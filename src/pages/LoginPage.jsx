import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useAuth } from '../context/AuthContext';

import { API_ORIGIN } from '../config/urls';

import coBrotherLogo from '../assets/Cobrother_logo.png';
import { ArrowLeft, FolderKanban, Users, Globe2 } from 'lucide-react';



export default function LoginPage() {

  const { t } = useTranslation();

  const { user, loading } = useAuth();

  const navigate  = useNavigate();

  const [searchParams] = useSearchParams();

  const [error, setError] = useState('');



  // ── If already logged in, redirect away ──────────────────────────────────

  useEffect(() => {

    if (!loading && user) {

      navigate(user.profileComplete ? '/dashboard' : '/complete-profile', { replace: true });

    }

  }, [user, loading]);



  // ── Show OAuth error if redirected back with ?error= ─────────────────────

  useEffect(() => {

    if (searchParams.get('error') === 'oauth_failed') {

      setError(t('googleSignInFailed'));

    }

  }, []);



  // ── Google OAuth ─────────────────────────────────────────────────────────────

  const handleGoogleLogin = () => {

    window.location.href = `${API_ORIGIN}/oauth2/authorization/google`;

  };



  // Don't flash login page if already loading auth state

  if (loading) return null;



  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbfbff_0%,#f7f8fd_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      <div className="pointer-events-none absolute top-[34%] -bottom-20 left-0 right-[52%] bg-[radial-gradient(ellipse_at_26%_74%,rgba(139,92,246,0.29)_0%,rgba(129,140,248,0.17)_34%,rgba(129,140,248,0.07)_56%,transparent_82%)] blur-[32px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-10 px-6 py-8 sm:px-10 md:px-12 lg:flex-row lg:items-center lg:justify-center lg:gap-8 lg:px-12 lg:py-10">
        <img src={coBrotherLogo} alt="CoBrother" className="absolute -left-10 top-8 h-auto w-[138px] sm:top-9 sm:w-[164px]" />
        <section className="relative w-full lg:max-w-[480px] lg:-translate-x-40">
          <div className="mt-8 sm:mt-9">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100/70 bg-[linear-gradient(135deg,rgba(239,242,255,0.96)_0%,rgba(244,241,255,0.9)_58%,rgba(237,234,255,0.92)_100%)] px-4 py-[0.32rem] text-[10.5px] font-semibold leading-none tracking-[0.005em] text-indigo-700/90 shadow-[0_4px_12px_rgba(129,140,248,0.16),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-[5px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.95)_0%,rgba(129,140,248,0.6)_55%,rgba(129,140,248,0.12)_100%)] shadow-[0_0_10px_rgba(129,140,248,0.35)]" />
              The Future is Collaborative
            </span>
            <h1 className="mt-5 text-[2.12rem] font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-[2.88rem]">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                CoBrother
              </span>
            </h1>
            <p className="mt-3 max-w-[34ch] text-[1.01rem] leading-[1.5] text-slate-600">
              Empowering innovators to turn ideas into real world impact.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 sm:max-w-[420px]">
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-4 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
              <FolderKanban className="h-5 w-5 text-indigo-500" />
              <p className="mt-2 text-[1.58rem] font-semibold leading-none text-slate-900">500+</p>
              <p className="mt-1 text-[11px] text-slate-500">Projects</p>
            </article>
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-4 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
              <Users className="h-5 w-5 text-violet-500" />
              <p className="mt-2 text-[1.58rem] font-semibold leading-none text-slate-900">10K+</p>
              <p className="mt-1 text-[11px] text-slate-500">Members</p>
            </article>
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-4 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
              <Globe2 className="h-5 w-5 text-blue-500" />
              <p className="mt-2 text-[1.58rem] font-semibold leading-none text-slate-900">50+</p>
              <p className="mt-1 text-[11px] text-slate-500">Countries</p>
            </article>
          </div>
        </section>

        <section className="w-full lg:max-w-[420px]">
          <div className="relative rounded-[26px] p-[1.6px] shadow-[0_22px_52px_rgba(30,41,59,0.11)]">
            <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[linear-gradient(132deg,rgba(56,189,248,0.74)_4%,rgba(99,102,241,0.34)_44%,rgba(168,85,247,0.8)_96%)] opacity-90" />
            <div className="pointer-events-none absolute -bottom-3 -left-2 h-20 w-36 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.38)_0%,rgba(34,211,238,0.13)_50%,transparent_74%)] blur-[12px]" />
            <div className="pointer-events-none absolute -top-3 -right-2 h-20 w-36 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.38)_0%,rgba(168,85,247,0.14)_50%,transparent_74%)] blur-[13px]" />
            <div className="relative min-h-[545px] rounded-[25px] border border-white/90 bg-[linear-gradient(165deg,rgba(255,255,255,0.985)_0%,rgba(250,252,255,0.965)_100%)] px-6 pb-12 pt-7 shadow-[0_8px_22px_rgba(148,163,184,0.12)] backdrop-blur-[2px] sm:px-8 sm:pb-14 sm:pt-8">
              <button
                onClick={() => navigate('/')}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                aria-label="Back to home"
                type="button"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="mx-auto mt-6 max-w-[360px] text-center sm:mt-7">
                <h2 className="text-[2.2rem] font-semibold tracking-[-0.025em] text-slate-900 sm:text-[2.45rem]">Welcome Back</h2>
                <p className="mt-1 text-[0.98rem] text-slate-500">Sign in to continue your journey</p>
              </div>

              <div className="mx-auto mt-9 w-full max-w-[340px]">
                <button
                  className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-[1rem] font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_8px_18px_rgba(15,23,42,0.08)]"
                  onClick={handleGoogleLogin}
                  type="button"
                >
                  <span className="inline-flex items-center justify-center gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </span>
                </button>

                {error ? (
                  <p className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                    {error}
                  </p>
                ) : null}

                <p className="mt-10 text-center text-[13px] leading-relaxed text-slate-500">
                  By continuing, you agree to our{' '}
                  <span className="font-medium text-indigo-700">Terms of Service</span>{' '}
                  and{' '}
                  <span className="font-medium text-indigo-700">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  );

}



