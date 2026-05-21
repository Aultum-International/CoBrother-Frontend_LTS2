import { motion, useReducedMotion } from 'framer-motion';
import RoundInkStamp from './RoundInkStamp';

/** Round ink stamp — slam + shake on card reveal (sold or unsold). */
export default function SoldStampSlam({ visible, variant = 'sold' }) {
  const reduce = useReducedMotion();

  if (!visible) return null;

  if (reduce) {
    return (
      <div className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-center">
        <RoundInkStamp variant={variant} size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-center"
      initial={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: -200, rotate: -24, scale: 1.72, opacity: 0, filter: 'blur(12px)' }}
        animate={{
          y: [null, 18, 0],
          rotate: [-24, -14, -12],
          scale: [1.72, 1.14, 1],
          opacity: [0, 1, 1],
          filter: ['blur(12px)', 'blur(3px)', 'blur(0px)'],
        }}
        transition={{ duration: 0.44, times: [0, 0.68, 1], ease: [0.12, 0.9, 0.2, 1] }}
      >
        <motion.div
          animate={{ x: [0, -7, 7, -5, 5, -3, 3, 0] }}
          transition={{ delay: 0.38, duration: 0.42, ease: 'easeOut' }}
        >
          <RoundInkStamp variant={variant} size="lg" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
