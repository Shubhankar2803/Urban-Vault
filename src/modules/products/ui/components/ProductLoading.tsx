'use client';

import { motion } from 'framer-motion';

interface ProductSkeletonProps {
  count?: number;
}

export const ProductSkeleton = ({ count = 8 }: ProductSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Image Skeleton */}
          <div className="aspect-square bg-gray-200 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
          </div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Brand */}
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              </div>
            </div>

            {/* Category */}
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Add to your tailwind.config.js for the shimmer effect:
// animation: {
//   shimmer: 'shimmer 2s linear infinite',
// },
// keyframes: {
//   shimmer: {
//     '0%': { transform: 'translateX(-100%)' },
//     '100%': { transform: 'translateX(100%)' },
//   },
// },