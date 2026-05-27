"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeImage, ...restImages] = images;
  const secondaryImages = showAll ? restImages : restImages.slice(0, 6);
  const remainingCount = Math.max(restImages.length - 6, 0);

  if (!activeImage) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5">
      <img
        src={activeImage}
        alt={title}
        className="h-[340px] w-full object-cover sm:h-[520px]"
      />

      {secondaryImages.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 border-t border-white sm:grid-cols-6">
          {secondaryImages.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={title}
              className="h-24 w-full object-cover sm:h-28"
            />
          ))}
        </div>
      ) : null}

      {remainingCount > 0 ? (
        <div className="flex justify-center border-t border-[#ece3d4] bg-white p-3">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="rounded-full border border-[#0f253d] px-5 py-2 text-sm font-semibold text-[#0f253d]"
          >
            {showAll ? "Show less" : `More (${remainingCount})`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
