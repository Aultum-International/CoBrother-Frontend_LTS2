import { useTranslation } from 'react-i18next';
import RecentlySoldHeroCarousel from '../home/domainHeroCarousel/RecentlySoldHeroCarousel';

export default function HeroGlow() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-x-hidden overflow-y-visible py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-b-0 bg-transparent">

      <div className="pointer-events-none absolute inset-0 z-0 overflow-x-hidden glow-layer" aria-hidden />

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col gap-6 md:gap-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,560px)] lg:gap-x-10 lg:gap-y-0">
          <div className="flex min-w-0 flex-col gap-4 md:gap-5">
            <h2 className="font-display text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-bold text-gray-900 m-0 leading-tight">
              {t('heroHeading')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 m-0 leading-relaxed max-w-[600px]">
              {t('heroSubtitle')}
            </p>
          </div>
          <div className="min-h-0 min-w-0 w-full max-w-[560px] justify-self-center overflow-visible lg:justify-self-end lg:-mt-6 xl:-mt-10 lg:pt-0">
            <RecentlySoldHeroCarousel />
          </div>
        </div>
      </div>

      <style>{`
        @property --glow-hue {
          syntax: '<number>';
          initial-value: 200;
          inherits: false;
        }

        @keyframes hueRotate {
          0% { --glow-hue: 200; }
          25% { --glow-hue: 220; }
          50% { --glow-hue: 190; }
          75% { --glow-hue: 170; }
          100% { --glow-hue: 200; }
        }

        .glow-layer {
          animation: hueRotate 12s ease-in-out infinite;
          background: radial-gradient(
            ellipse 100% 85% at 45% 0%,
            hsl(var(--glow-hue), 80%, 62%, 0.62) 0%,
            hsl(var(--glow-hue), 75%, 60%, 0.32) 40%,
            hsl(var(--glow-hue), 70%, 58%, 0.14) 65%,
            transparent 82%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .glow-layer {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
