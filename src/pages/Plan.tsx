import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Search,
  MapPin,
  Star,
  Clock,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { destinations } from "@/data/destinations";
import type { Destination } from "@/data/destinations";

type Region = "all" | "europe" | "asia" | "americas" | "africa";

const regions: { key: Region; label: string }[] = [
  { key: "all", label: "All" },
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "americas", label: "Americas" },
  { key: "africa", label: "Africa" },
];

export default function Plan() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState<Region>("all");
  const [search, setSearch] = useState("");
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

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

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ─── Blue Header Nav ─── */}
      <nav className="bg-[#2276E3] px-6 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/dashboard">
              <img
                src="/logo.svg"
                alt="Chalo Trip Pe"
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <span className="text-sm text-white/60 hidden sm:inline">
              /
            </span>
            <span className="text-sm text-white font-medium hidden sm:inline">
              Plan a Trip
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm text-white/80 hover:text-white transition-colors font-medium"
            >
              Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/25 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Page Header ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-[#FFB800]" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Curated for you
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Plan Your Weekend Trip
            </h1>
            <p className="text-sm text-gray-500">
              Browse handpicked destinations, choose your dates, and book directly from your account
            </p>
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 space-y-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search by destination, country, or activity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search destinations"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRegion(r.key)}
                  aria-pressed={activeRegion === r.key}
                  aria-label={`Filter by ${r.label} region`}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 border ${
                    activeRegion === r.key
                      ? "bg-[#2276E3] text-white border-[#2276E3] shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Results ─── */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        {(search || activeRegion !== "all") && (
          <p className="text-xs text-gray-400 mb-4">
            Showing {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Destination List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <PlanCard destination={dest} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <Search className="h-8 w-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-semibold text-sm">No destinations found</p>
            <p className="text-gray-400 text-xs mt-1">Try a different search or filter</p>
          </motion.div>
        )}
      </div>

      {/* ─── Quick Booking Modal ─── */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedDest(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedDest(null)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:bg-white text-sm font-bold"
                >
                  ×
                </button>
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-xl font-bold text-white">{selectedDest.name}</h3>
                  <p className="text-xs text-white/70">{selectedDest.country}</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {selectedDest.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {selectedDest.highlights.slice(0, 4).map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-5 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
                    <span className="font-semibold text-gray-700">{selectedDest.rating}</span>
                    <span>({selectedDest.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{selectedDest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{selectedDest.bestTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{(selectedDest.price * 85).toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">/person</span>
                  </div>
                  <Link
                    to={`/destination/${selectedDest.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white hover:bg-[#E55A2B] transition-colors shadow-lg shadow-[#FF6B35]/25"
                  >
                    Book This Trip
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Plan Card ─── */
function PlanCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  return (
    <div className="group flex flex-col md:flex-row gap-0 rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      {/* Image */}
      <Link
        to={`/destination/${destination.id}`}
        className="relative h-52 md:h-auto md:w-72 lg:w-80 shrink-0 overflow-hidden"
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-gray-900 shadow-sm">
            {destination.duration}
          </span>
          <span className="rounded-md bg-[#2276E3]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
            ★ {destination.rating}
          </span>
        </div>

        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
          <Heart className="h-3.5 w-3.5 text-gray-500 hover:text-[#FF6B35]" />
        </button>
      </Link>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">
                {destination.country}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2276E3] transition-colors">
              {destination.name}
            </h3>
            <p className="text-sm text-gray-500 italic mt-0.5">
              {destination.tagline}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-gray-900">
              ₹{(destination.price * 85).toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-gray-400">/person</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mt-3 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{destination.duration}</span>
          </div>
          <span>·</span>
          <span>{destination.bestTime}</span>
          <span>·</span>
          <span>{destination.reviewCount} reviews</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {destination.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 group-hover:bg-[#2276E3]/10 group-hover:text-[#2276E3] transition-colors"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto pt-4">
          <Link
            to={`/destination/${destination.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2276E3] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1A5DB8] transition-colors"
          >
            Book Now
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to={`/destination/${destination.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#2276E3] transition-colors"
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
