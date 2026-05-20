import { motion, useReducedMotion } from 'framer-motion';

/** Red ink stamp — heavy slam from above + impact shake (stamp is never CSS-blurred with the card). */
export default function SoldStampSlam({ visible }) {
  const reduce = useReducedMotion();

  if (!visible) return null;

  if (reduce) {
    return (
      <div className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-center">
        <div
          className="rotate-[-10deg] rounded-md border-[3px] border-red-900 bg-gradient-to-br from-red-600 via-red-700 to-red-900 px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.35),0_12px_32px_rgba(127,29,29,0.55),inset_0_1px_0_rgba(255,255,255,0.22)]"
          style={{ textShadow: '1px 2px 0 rgba(0,0,0,0.4)' }}
        >
          <span className="block text-center text-sm font-black uppercase tracking-[0.28em] text-white">
            DOMAIN SOLD
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-center"
      initial={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: -200, rotate: -20, scale: 1.72, opacity: 0, filter: 'blur(12px)' }}
        animate={{
          y: [null, 18, 0],
          rotate: [-20, -12, -9],
          scale: [1.72, 1.14, 1],
          opacity: [0, 1, 1],
          filter: ['blur(12px)', 'blur(3px)', 'blur(0px)'],
        }}
        transition={{ duration: 0.44, times: [0, 0.68, 1], ease: [0.12, 0.9, 0.2, 1] }}
      >
        <motion.div
          className="rounded-md border-[3px] border-red-900 bg-gradient-to-br from-red-600 via-red-700 to-red-900 px-6 py-3 shadow-[0_22px_48px_rgba(0,0,0,0.38),0_14px_36px_rgba(127,29,29,0.6),inset_0_1px_0_rgba(255,255,255,0.22)]"
          animate={{ x: [0, -7, 7, -5, 5, -3, 3, 0] }}
          transition={{ delay: 0.38, duration: 0.42, ease: 'easeOut' }}
        >
          <span
            className="block text-center text-sm font-black uppercase tracking-[0.28em] text-white"
            style={{ textShadow: '1px 2px 0 rgba(0,0,0,0.4)' }}
          >
            DOMAIN SOLD
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
