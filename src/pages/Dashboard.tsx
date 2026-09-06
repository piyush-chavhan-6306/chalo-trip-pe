import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  ArrowUpRight,
  ChevronRight,
  Compass,
  CreditCard,
  Users,
  Plane,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  mockProfile,
  mockBookings,
  mockSavedDestinations,
} from "@/data/userBookings";

type Tab = "upcoming" | "past" | "saved";

export default function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");

  const upcoming = mockBookings.filter((b) => b.status === "upcoming");
  const past = mockBookings.filter((b) => b.status === "completed");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-stone-200/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.svg"
                alt="Chalo Trip Pe"
                className="h-8 w-auto"
              />
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                Browse Trips
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Content ─── */}
      <section className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* ── Profile Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-900 text-lg font-semibold text-[#FAF8F5]">
                  {mockProfile.avatar}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
                    Welcome back, {mockProfile.name}
                  </h1>
                  <p className="text-sm text-stone-400 mt-0.5">
                    Member since {mockProfile.memberSince} ·{" "}
                    {mockProfile.totalTrips} trips taken
                  </p>
                </div>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors self-start"
              >
                Plan a New Trip
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: Plane,
                  label: "Upcoming",
                  value: upcoming.length.toString(),
                },
                {
                  icon: MapPin,
                  label: "Completed",
                  value: past.length.toString(),
                },
                {
                  icon: Heart,
                  label: "Saved",
                  value: mockSavedDestinations.length.toString(),
                },
                {
                  icon: CreditCard,
                  label: "Total Spent",
                  value: `₹${(
                    mockBookings.reduce((a, b) => a + b.totalPrice, 0) / 1000
                  ).toFixed(0)}k`,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-stone-200/60 bg-white p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="h-4 w-4 text-stone-400" />
                    <span className="text-xs text-stone-400">{stat.label}</span>
                  </div>
                  <p className="text-xl font-semibold text-stone-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Tabs ── */}
          <div className="flex gap-1 border-b border-stone-200/60 mb-8">
            {(
              [
                { key: "upcoming", label: "Upcoming Trips", count: upcoming.length },
                { key: "past", label: "Past Trips", count: past.length },
                { key: "saved", label: "Saved Destinations", count: mockSavedDestinations.length },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-stone-900"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key
                      ? "bg-stone-900 text-[#FAF8F5]"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Tab Content ── */}
          <AnimatePresence mode="wait">
            {/* Upcoming */}
            {activeTab === "upcoming" && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {upcoming.length === 0 ? (
                  <EmptyState
                    title="No upcoming trips"
                    desc="You have no trips booked yet. Browse our destinations and plan your next weekend escape."
                    cta="Explore Destinations"
                    href="/"
                  />
                ) : (
                  <div className="space-y-4">
                    {upcoming.map((booking, i) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Past */}
            {activeTab === "past" && (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {past.length === 0 ? (
                  <EmptyState
                    title="No past trips"
                    desc="Once you complete a trip, it will appear here."
                    cta="Browse Trips"
                    href="/"
                  />
                ) : (
                  <div className="space-y-4">
                    {past.map((booking, i) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Saved */}
            {activeTab === "saved" && (
              <motion.div
                key="saved"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {mockSavedDestinations.length === 0 ? (
                  <EmptyState
                    title="No saved destinations"
                    desc="Save destinations you love and they'll show up here for quick access."
                    cta="Find a Destination"
                    href="/"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mockSavedDestinations.map((dest, i) => (
                      <SavedCard key={dest.id} saved={dest} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Quick Help ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 rounded-2xl border border-stone-200/60 bg-white p-8 text-center"
          >
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-stone-100 mb-4">
              <Compass className="h-5 w-5 text-stone-500" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-1">
              Need help planning?
            </h3>
            <p className="text-sm text-stone-500 mb-5 max-w-md mx-auto">
              Our travel experts can help you find the perfect weekend escape
              based on your preferences and budget.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors"
            >
              Chat with Us
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─── Booking Card ─── */
function BookingCard({
  booking,
  index,
}: {
  booking: (typeof mockBookings)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/destination/${booking.destinationId}`}
        className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-stone-200/60 bg-white p-4 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-32 sm:h-28 sm:w-40 shrink-0 overflow-hidden rounded-xl">
          <img
            src={booking.image}
            alt={booking.destinationName}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {booking.status === "upcoming" && (
            <div className="absolute top-2 left-2 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wide">
              Upcoming
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                {booking.destinationName}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {booking.country}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-base font-semibold text-stone-900">
                ₹{booking.totalPrice.toLocaleString("en-IN")}
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">
                {booking.travellers} traveller{booking.travellers > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-stone-400" />
              <span>
                {booking.day}, {booking.date}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-stone-400" />
              <span>{booking.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-[10px] text-stone-400 font-mono">
              Ref: {booking.bookingRef}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-stone-500 transition-colors ml-auto" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Saved Card ─── */
function SavedCard({
  saved,
  index,
}: {
  saved: (typeof mockSavedDestinations)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/destination/${saved.destinationId}`}
        className="group block rounded-2xl border border-stone-200/60 bg-white overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={saved.image}
            alt={saved.destinationName}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 shadow-sm">
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 fill-red-400 text-red-400" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1.5 text-stone-400 mb-1.5">
            <MapPin className="h-3 w-3" />
            <span className="text-[10px] font-medium tracking-widest uppercase">
              {saved.country}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-stone-900">
            {saved.destinationName}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-semibold text-stone-900">
              ₹{(saved.price * 85).toLocaleString("en-IN")}/trip
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-stone-600">{saved.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Empty State ─── */
function EmptyState({
  title,
  desc,
  cta,
  href,
}: {
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="py-20 text-center">
      <p className="text-stone-500 font-medium text-sm mb-1">{title}</p>
      <p className="text-stone-400 text-xs mb-6 max-w-sm mx-auto">{desc}</p>
      <Link
        to={href}
        className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors"
      >
        {cta}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
