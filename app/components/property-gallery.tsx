"use client";

import Image from "next/image";
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const restImages = images
    .map((image, index) => ({ image, index }))
    .filter(({ index }) => index !== activeIndex);
  const secondaryImages = showAll ? restImages : restImages.slice(0, 6);
  const remainingCount = Math.max(restImages.length - 6, 0);
  const hasMultipleImages = images.length > 1;

  if (!activeImage) {
    return null;
  }

  function showPreviousImage() {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }

  function showNextImage() {
    setActiveIndex((index) => (index + 1) % images.length);
  }

  return (
    <div className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5">
      <div className="relative">
        <Image
          src={activeImage}
          alt={`${title} - photo ${activeIndex + 1} of ${images.length}`}
          width={1200}
          height={800}
          priority={activeIndex === 0}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="h-[340px] w-full object-cover sm:h-[520px]"
        />

        {hasMultipleImages ? (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous property photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0f253d]/82 text-3xl leading-none text-white shadow-sm transition hover:bg-[#0f253d]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next property photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0f253d]/82 text-3xl leading-none text-white shadow-sm transition hover:bg-[#0f253d]"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-[#0f253d]/82 px-3 py-1 text-xs font-semibold text-white">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        ) : null}
      </div>

      {secondaryImages.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 border-t border-white sm:grid-cols-6">
          {secondaryImages.map(({ image, index }) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show property photo ${index + 1}`}
              className="h-24 overflow-hidden sm:h-28"
            >
              <Image
                src={image}
                alt={`${title} - photo ${index + 1}`}
                width={220}
                height={140}
                loading="lazy"
                sizes="(min-width: 640px) 170px, 33vw"
                className="h-full w-full object-cover transition hover:opacity-85"
              />
            </button>
          ))}
        </div>
      ) : null}

      {remainingCount > 0 ? (
        <div className="flex justify-center border-t border-[#ece3d4] bg-white p-3">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="rounded-full border border-[#0f253d] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#0f253d]"
          >
            {showAll ? "Show less" : `More (${remainingCount})`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
