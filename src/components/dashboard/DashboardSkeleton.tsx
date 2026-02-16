import { Skeleton } from '@/components/ui/skeleton';

export const CardSkeleton = () => (
  <div className="dashboard-card">
    <div className="dashboard-card-header">
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="flex justify-around items-center py-6 px-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="dashboard-card h-full min-h-[400px]">
    <div className="space-y-3 p-4">
      <Skeleton className="h-8 w-full" />
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-6 w-full"
          style={{ opacity: 1 - i * 0.1 }}
        />
      ))}
    </div>
  </div>
);

export const FilterSkeleton = () => (
  <div className="space-y-2 sm:space-y-4">
    <div className="dashboard-card">
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-24" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      </div>
    </div>
    <div className="dashboard-card p-4">
      <Skeleton className="h-5 w-28 mb-3" />
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  </div>
);
