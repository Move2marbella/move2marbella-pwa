"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";

type FavouriteProperty = {
  ref: string;
  title: string;
  price: string;
  location: string;
  image: string;
  href: string;
};

type FavouriteToggleProps = {
  property: FavouriteProperty;
  className?: string;
  labels?: {
    favourite: string;
    saved: string;
  };
};

type FavouritesPanelProps = {
  labels?: {
    clear: string;
    favourites: string;
    moreSaved: string;
    saved: string;
    saveHint: string;
  };
};

const FAVOURITES_STORAGE_KEY = "move2marbella:favourites";
const FAVOURITES_EVENT_NAME = "move2marbella:favourites-updated";

function readFavourites() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(FAVOURITES_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as FavouriteProperty[]) : [];
  } catch {
    return [];
  }
}

function saveFavourites(favourites: FavouriteProperty[]) {
  window.localStorage.setItem(
    FAVOURITES_STORAGE_KEY,
    JSON.stringify(favourites),
  );
  window.dispatchEvent(new Event(FAVOURITES_EVENT_NAME));
}

export function FavouriteToggle({
  property,
  className = "",
  labels = {
    favourite: "Favourite",
    saved: "Saved",
  },
}: FavouriteToggleProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    function updateState() {
      setIsFavourite(
        readFavourites().some((favourite) => favourite.ref === property.ref),
      );
    }

    updateState();
    window.addEventListener(FAVOURITES_EVENT_NAME, updateState);
    window.addEventListener("storage", updateState);

    return () => {
      window.removeEventListener(FAVOURITES_EVENT_NAME, updateState);
      window.removeEventListener("storage", updateState);
    };
  }, [property.ref]);

  function toggleFavourite() {
    const favourites = readFavourites();
    const nextFavourites = isFavourite
      ? favourites.filter((favourite) => favourite.ref !== property.ref)
      : [
          property,
          ...favourites.filter((favourite) => favourite.ref !== property.ref),
        ];

    saveFavourites(nextFavourites);
  }

  return (
    <button
      type="button"
      aria-pressed={isFavourite}
      onClick={toggleFavourite}
      className={`${className} rounded-full border px-4 py-2 text-sm font-semibold transition ${
        isFavourite
          ? "border-[#ba9456] bg-[#ba9456] text-[#0f253d]"
          : "border-[#ded4c2] bg-white text-[#0f253d]"
      }`}
    >
      <span aria-hidden="true">{isFavourite ? "♥" : "♡"}</span>{" "}
      {isFavourite ? labels.saved : labels.favourite}
    </button>
  );
}

export function FavouritesPanel({
  labels = {
    clear: "Clear",
    favourites: "Favourites",
    moreSaved: "more saved on this device.",
    saved: "saved",
    saveHint: "Tap Favourite on any property to keep it saved on this device.",
  },
}: FavouritesPanelProps) {
  const [favourites, setFavourites] = useState<FavouriteProperty[]>([]);

  useEffect(() => {
    function updateFavourites() {
      setFavourites(readFavourites());
    }

    updateFavourites();
    window.addEventListener(FAVOURITES_EVENT_NAME, updateFavourites);
    window.addEventListener("storage", updateFavourites);

    return () => {
      window.removeEventListener(FAVOURITES_EVENT_NAME, updateFavourites);
      window.removeEventListener("storage", updateFavourites);
    };
  }, []);

  function clearFavourites() {
    saveFavourites([]);
  }

  return (
    <section className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
            {labels.favourites}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#171717]">
            {favourites.length} {labels.saved.toLowerCase()}
          </h2>
        </div>
        {favourites.length > 0 ? (
          <button
            type="button"
            onClick={clearFavourites}
            className="rounded-full border border-[#ded4c2] px-3 py-2 text-xs font-semibold text-[#55514a]"
          >
            {labels.clear}
          </button>
        ) : null}
      </div>

      {favourites.length > 0 ? (
        <div className="mt-4 space-y-3">
          {favourites.slice(0, 4).map((property) => (
            <Link
              key={property.ref}
              href={property.href}
              className="grid grid-cols-[72px_1fr] gap-3 rounded-[6px] border border-[#ece3d4] p-2"
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-16 w-full rounded-[4px] object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#171717]">
                  {property.title}
                </p>
                <p className="mt-1 truncate text-xs text-[#6f6a61]">
                  {property.location}
                </p>
                <p className="mt-1 text-sm font-bold text-[#0f253d]">
                  {property.price}
                </p>
              </div>
            </Link>
          ))}

          {favourites.length > 4 ? (
            <p className="text-xs font-semibold text-[#6f6a61]">
              {favourites.length - 4} {labels.moreSaved}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-[#55514a]">
          {labels.saveHint}
        </p>
      )}
    </section>
  );
}
