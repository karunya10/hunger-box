import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function RestaurantCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="w-full h-[300px] shadow-md hover:shadow-xl transition-shadow py-0 pb-5 cursor-pointer flex flex-col justify-between">
        <div className="p-0 relative">
          {/* Image skeleton with lighter overlay */}
          <Skeleton
            height={180}
            width="100%"
            className="w-full rounded-t-md shimmer"
            style={{ backgroundColor: "#e5e7eb" }}
          />
          <div className="absolute top-0 left-0 w-full h-[180px] bg-white bg-opacity-30 rounded-t-md pointer-events-none" />
        </div>
        <div className="space-y-1 px-4 pt-2 flex-1">
          <Skeleton width={120} height={24} className="rounded shimmer" />
          <Skeleton width={180} height={16} className="rounded shimmer" />
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full ring-1 ring-emerald-100">
              <Skeleton
                width={16}
                height={16}
                circle={true}
                className="shimmer"
              />
              <Skeleton width={40} height={20} className="shimmer" />
            </span>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default RestaurantCardSkeleton;
