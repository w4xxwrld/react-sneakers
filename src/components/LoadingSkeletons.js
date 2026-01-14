import React from "react";

function SkeletonCard() {
  return (
    <div className="rounded-xl py-8 mx-auto relative w-[200px] h-[280px] bg-gray-200 animate-pulse">
      <div className="w-44 h-40 mx-auto bg-gray-300 rounded-xl"></div>
      <div className="mt-4 mx-6">
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="absolute bottom-8 left-6">
        <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}

function LoadingSkeletons({ count = 8 }) {
  return (
    <div className="grid grid-cols-4 gap-y-12 mt-[25px]">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default LoadingSkeletons;
