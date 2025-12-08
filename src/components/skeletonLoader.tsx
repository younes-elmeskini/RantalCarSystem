"use client";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
      {children}
    </div>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="bg-white shadow-md   rounded-[20px] p-4">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="md:max-w-1/2 md:w-[500px] md:mx-[100px] m-4 p-5 bg-white shadow-md border border-[#ADB5BD] rounded-[20px]">
      <Skeleton className="h-8 w-48 mb-6" />
      
      <div className="space-y-4">
        {/* Nom field */}
        <div>
          <Skeleton className="h-4 w-12 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Type and Brand fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Price and Quantity fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Skeleton className="h-4 w-12 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Seats and Doors fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Gamme field */}
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Transmission and Fuel Type fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* File upload */}
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Submit button */}
        <Skeleton className="h-12 w-full mt-5" />
      </div>
    </div>
  );
}

export function CarDetailsSkeleton() {
  return (
    <div className="bg-white shadow-md border border-[#ADB5BD] rounded-[20px] p-6">
      <Skeleton className="h-64 w-full mb-4" />
      <Skeleton className="h-8 w-3/4 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="flex md:flex-row flex-col-reverse justify-center md:items-start pb-10">
      <div className="md:w-1/2 flex justify-center p-4 mt-10">
        <CarDetailsSkeleton />
      </div>
      <FormSkeleton />
    </div>
  );
}
