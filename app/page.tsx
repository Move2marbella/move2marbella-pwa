/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  getWhatsAppUrl,
  languages,
  properties,
  quickFilters,
} from "./data/properties";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#171717]">
      <section className="relative overflow-hidden bg-[#0b0b0b] text-white">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
          alt="Mediterranean resort pool and palm trees"
          className="absolute inset-0 h-full w-full object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b]/40 via-[#0b0b0b]/72 to-[#0b0b0b]" />

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col px-5 pb-6 pt-5 sm:px-8 lg:min-h-[86vh]">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="leading-tight">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#c6a15b]">
                Move2Marbella
              </span>
              <span className="text-lg font-semibold">Costa del Sol homes</span>
            </Link>
            <a
              href="https://wa.me/34600000000?text=Hi%20Move2Marbella%2C%20I%20am%20looking%20for%20a%20property."
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b0b0b] shadow-sm"
            >
              WhatsApp
            </a>
          </header>

          <div className="flex flex-1 flex-col justify-end gap-6 py-10">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#c6a15b]">
                Marbella property search
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Find your next home on the Costa del Sol
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/82 sm:text-lg">
                Search villas, apartments and new developments from Resales
                Online, then contact Move2Marbella directly from your phone.
              </p>
            </div>

            <form className="grid gap-3 rounded-[8px] bg-white p-3 text-[#171717] shadow-2xl shadow-black/25 sm:grid-cols-4">
              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  Location
                </span>
                <select className="h-12 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base outline-none">
                  <option>Marbella</option>
                  <option>Estepona</option>
                  <option>Benahavis</option>
                  <option>Fuengirola</option>
                </select>
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  Type
                </span>
                <select className="h-12 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base outline-none">
                  <option>Any property</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Penthouse</option>
                </select>
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6f6a61]">
                  Budget
                </span>
                <select className="h-12 rounded-[6px] border border-[#d7d2c4] bg-white px-3 text-base outline-none">
                  <option>Any price</option>
                  <option>EUR 500k+</option>
                  <option>EUR 1m+</option>
                  <option>EUR 2m+</option>
                </select>
              </label>
              <button className="h-12 self-end rounded-[6px] bg-[#c6a15b] px-5 text-base font-bold text-[#0b0b0b]">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {languages.map((language) => (
              <a
                key={language.code}
                href={`/${language.code.toLowerCase()}`}
                aria-label={language.label}
                className="shrink-0 rounded-full border border-[#ded4c2] bg-white px-3 py-2 text-sm font-semibold text-[#242424]"
              >
                {language.code}
              </a>
            ))}
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
                  Live search preview
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Featured properties
                </h2>
              </div>
              <span className="text-sm font-medium text-[#6f6a61]">
                Resales API sample
              </span>
            </div>

            <div className="grid gap-4">
              {properties.map((property) => (
                <article
                  key={property.ref}
                  className="overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-black/5 sm:grid sm:grid-cols-[220px_1fr]"
                >
                  <div className="relative h-56 sm:h-full">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0b0b0b]">
                      {property.tag}
                    </span>
                  </div>
                  <div className="grid gap-4 p-4">
                    <div>
                      <p className="text-sm font-medium text-[#6f6a61]">
                        {property.location}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold">
                        {property.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#242424]">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.size}</span>
                      <span>{property.ref}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="min-w-full text-lg font-bold sm:min-w-0">
                        {property.price}
                      </p>
                      <Link
                        href={`/properties/${property.ref}`}
                        className="rounded-full border border-[#0b0b0b] px-4 py-2 text-sm font-semibold text-[#0b0b0b]"
                      >
                        Details
                      </Link>
                      <a
                        href={getWhatsAppUrl(property.ref)}
                        className="rounded-full bg-[#0b0b0b] px-4 py-2 text-sm font-semibold text-white"
                      >
                        Enquire
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[8px] bg-[#0b0b0b] p-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c6a15b]">
              MVP roadmap
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Next build steps</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/82">
              <li>Connect Resales Online through a secure backend API.</li>
              <li>Add real multilingual routes for EN, ES, FR, DE, RU, PL, HU.</li>
              <li>Create property detail pages with gallery and lead form.</li>
              <li>Save favourites on the phone before adding user accounts.</li>
            </ul>
          </div>

          <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a7a3a]">
              Quick filters
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter}
                  className="rounded-full border border-[#ded4c2] px-3 py-2 text-sm font-semibold text-[#242424]"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
