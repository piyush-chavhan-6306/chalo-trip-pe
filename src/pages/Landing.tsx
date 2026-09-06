import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

type Region = "all" | "europe" | "asia" | "americas" | "africa";

const regions: { key: Region; label: string }[] = [
  { key: "all", label: "All Destinations" },
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "americas", label: "Americas" },
  { key: "africa", label: "Africa" },
];

export default function Landing() {
  const [activeRegion, setActiveRegion] = useState<Region>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list =
      activeRegion === "all"
        ? destinations
        : destinations.filter((d) => d.region === activeRegion);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q) ||
          d.highlights.some((h) => h.toLowerCase().includes(q)),
      );
    }

    return list;
  }, [activeRegion, search]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-stone-200/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <a href="/" className="flex items-center gap-2.5 group">
              <img src="/logo.svg" alt="Chalo Trip Pe" className="h-8 w-auto" />
            </a>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8 text-sm text-stone-500">
              <a
                href="#destinations"
                className="hover:text-stone-900 transition-colors"
              >
                Destinations
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                How It Works
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                Stories
              </a>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href="/auth"
                className="hidden sm:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors"
              >
                Book Now
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]"/>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="h-px w-10 bg-stone-300" />
              <span className="text-xs font-medium tracking-[0.22em] uppercase text-stone-400">
                Curated Weekend Escapes
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl lg:text-7xl font-semibold tracking-tight text-stone-900 leading-[1.05]"
            >
              Where will your
              <br />
              <span className="text-stone-400">next weekend take you?</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-lg text-stone-500 max-w-xl leading-relaxed"
            >
              Handpicked destinations for short escapes. Browse, book, and be on
              your way — we handle the details so you can enjoy the journey.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex items-center gap-8"
            >
              <div>
                <p className="text-2xl font-semibold text-stone-900">
                  {destinations.length}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">Destinations</p>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <p className="text-2xl font-semibold text-stone-900">
                  1,451
                </p>
                <p className="text-xs text-stone-400 mt-0.5">Happy Travellers</p>
              </div>
              <div className="h-8 w-px bg-stone-200" />
              <div>
                <p className="text-2xl font-semibold text-stone-900">4.8</p>
                <p className="text-xs text-stone-400 mt-0.5">Average Rating</p>
              </div>
            </motion.div>
          </div>

          {/* Editorial line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-16 h-px bg-gradient-to-r from-stone-300 via-stone-200 to-transparent origin-left"
          />
        </div>
      </section>

      {/* ─── Destinations ─── */}
      <section id="destinations" className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Section header + search + filters */}
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900">
                  Destinations
                </h2>
                <p className="mt-2 text-sm text-stone-400">
                  Each trip is fully curated — flights, stays, and experiences
                  included
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all"
                />
              </div>
            </div>

            {/* Region filters */}
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRegion(r.key)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border ${
                    activeRegion === r.key
                      ? "bg-stone-900 text-[#FAF8F5] border-stone-900"
                      : "bg-transparent text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-700"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {(search || activeRegion !== "all") && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-stone-400 mb-6"
            >
              Showing {filtered.length} destination
              {filtered.length !== 1 ? "s" : ""}
              {search ? ` for "${search}"` : ""}
              {activeRegion !== "all"
                ? ` in ${
                    regions.find((r) => r.key === activeRegion)?.label
                  }`
                : ""}
            </motion.p>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DestinationCard destination={dest} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <SlidersHorizontal className="h-8 w-8 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500 text-sm font-medium">
                  No destinations match your search.
                </p>
                <p className="text-stone-400 text-xs mt-1">
                  Try a different keyword or browse all destinations.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="pb-24 lg:pb-32 border-t border-stone-200/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-stone-400 mb-3">
              Simple as it gets
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900">
              How Chalo Trip Pe Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                step: "01",
                title: "Browse & Choose",
                desc: "Explore our curated collection of weekend escapes. Each destination is handpicked for quality, experience, and value.",
              },
              {
                step: "02",
                title: "Pick Your Dates",
                desc: "Select a time slot that works for you. We offer flexible departure mornings and afternoons across multiple weekends.",
              },
              {
                step: "03",
                title: "Book & Go",
                desc: "Complete your booking in minutes. Flights, stays, and experiences are all included — just pack your bags.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-stone-100 text-stone-900 text-lg font-semibold mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editorial Quote ─── */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 mx-auto h-px w-12 bg-stone-300" />
            <blockquote className="text-xl lg:text-2xl font-light text-stone-600 leading-relaxed italic">
              "The world is a book, and those who do not travel read only one
              page."
            </blockquote>
            <div className="mt-6 mx-auto h-px w-12 bg-stone-300" />
            <p className="mt-4 text-xs tracking-[0.2em] uppercase text-stone-400">
              — Saint Augustine
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-stone-200/60 bg-[#F5F3F0]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Chalo Trip Pe" className="h-7 w-auto" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-xs text-stone-400">
              <span>© 2026 Chalo Trip Pe. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-stone-600 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-stone-600 transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-stone-600 transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
