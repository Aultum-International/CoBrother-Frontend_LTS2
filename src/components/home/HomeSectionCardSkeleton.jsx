import SkeletonCard from '../common/Skeleton';
import ListingCardShell from '../listings/ListingCardShell';

const SKELETON_COUNT = 8;

export default function HomeSectionCardSkeleton({ title }) {
  return (
    <section className="bg-white py-4 md:py-6">
      <div className="w-full">
        <h3 className="font-display text-[1.4rem] md:text-[1.75rem] font-bold text-gray-900 mb-5 md:mb-6">
          {title}
        </h3>
        <div className="listing-card-glow-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ListingCardShell key={i}>
              <SkeletonCard />
            </ListingCardShell>
          ))}
        </div>
      </div>
    </section>
  );
}
