import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Compass, ArrowUpRight } from "lucide-react";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

type Filter = "all" | "europe" | "asia" | "americas" | "africa";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All Destinations" },
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "americas", label: "Americas" },
  { key: "africa", label: "Africa" },
];

const regionMap: Record<string, Filter> = {
  Greece: "europe",
  Italy: "europe",
  Portugal: "europe",
  Japan: "asia",
  Canada: "americas",
  Morocco: "africa",
};

export default function Landing() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered =
    activeFilter === "all"
      ? destinations
      : destinations.filter((d) => regionMap[d.country] === activeFilter);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-lg border-b border-stone-200/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-stone-900">
                <Compass className="h-4 w-4 text-[#FAF8F5]" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-stone-900">
                Wanderlust
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-stone-500">
              <a
                href="#destinations"
                className="hover:text-stone-900 transition-colors"
              >
                Destinations
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-stone-900 transition-colors">
                Journal
              </a>
            </div>

            <button className="flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors">
              Start Planning
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Subtle background grain texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex items-center gap-2.5"
            >
              <div className="h-px w-8 bg-stone-400" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400">
                Weekend Escapes
              </span>
            </motion.div>

            {/* Main heading */}
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
              Find your next
              <br />
              <span className="text-stone-400">weekend getaway</span>
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
              Curated destinations for short escapes — discover places worth
              leaving home for, every weekend.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex items-center gap-4"
            >
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors"
              >
                Explore Destinations
                <MapPin className="h-3.5 w-3.5" />
              </a>
              <span className="text-xs text-stone-400">
                {destinations.length} curated spots
              </span>
            </motion.div>
          </div>

          {/* Decorative editorial line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 h-px bg-gradient-to-r from-stone-300 via-stone-200 to-transparent origin-left"
          />
        </div>
      </section>

      {/* ─── Destinations Section ─── */}
      <section id="destinations" className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Section header */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900">
                Destinations
              </h2>
              <p className="mt-2 text-sm text-stone-400">
                Handpicked for a perfect short trip
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border ${
                    activeFilter === f.key
                      ? "bg-stone-900 text-[#FAF8F5] border-stone-900"
                      : "bg-transparent text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-700"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="text-stone-400 text-sm">
                  No destinations in this region yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
              <div className="flex items-center justify-center h-7 w-7 rounded-md bg-stone-900">
                <Compass className="h-3.5 w-3.5 text-[#FAF8F5]" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-stone-900">
                Wanderlust
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs text-stone-400">
              <span>© 2026 Wanderlust</span>
              <a href="#" className="hover:text-stone-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-stone-600 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
