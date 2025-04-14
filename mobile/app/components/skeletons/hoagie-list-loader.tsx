import { HoagieCardSkeleton } from './hoagie-card-skeleton';

type SkeletonLoaderProps = {
  count?: number;
};

export function HoagieListLoader({ count = 5 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <HoagieCardSkeleton key={i} />
      ))}
    </>
  );
}
