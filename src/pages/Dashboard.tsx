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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ─── Blue Header Nav ─── */}
      <nav className="bg-[#2276E3] px-6 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Chalo Trip Pe"
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-white/80 hover:text-white transition-colors font-medium"
            >
              Browse Trips
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

      {/* ─── Profile Header ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2276E3] text-lg font-bold text-white">
                {mockProfile.avatar}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Welcome, {mockProfile.name}!
                </h1>
                <p className="text-sm text-gray-500">
                  Member since {mockProfile.memberSince} · {mockProfile.totalTrips} trips completed
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2276E3] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1A5DB8] transition-colors self-start shadow-sm"
            >
              Plan a New Trip
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
          >
            {[
              { icon: Plane, label: "Upcoming", value: upcoming.length.toString(), color: "text-[#2276E3]" },
              { icon: MapPin, label: "Completed", value: past.length.toString(), color: "text-green-500" },
              { icon: Heart, label: "Saved", value: mockSavedDestinations.length.toString(), color: "text-[#FF6B35]" },
              { icon: CreditCard, label: "Total Spent", value: `₹${(mockBookings.reduce((a, b) => a + b.totalPrice, 0) / 1000).toFixed(0)}k`, color: "text-[#FFB800]" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-200 bg-white p-4 flex items-center gap-3"
              >
                <div className={`h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-0">
            {(
              [
                { key: "upcoming", label: "Upcoming", count: upcoming.length },
                { key: "past", label: "Past Trips", count: past.length },
                { key: "saved", label: "Saved", count: mockSavedDestinations.length },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-3.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "text-[#2276E3]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === tab.key
                        ? "bg-[#2276E3] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="dashboard-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2276E3]"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Tab Content ─── */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {upcoming.length === 0 ? (
                <EmptyState
                  title="No upcoming trips"
                  desc="Browse destinations and plan your next weekend escape."
                  cta="Explore Destinations"
                  href="/"
                />
              ) : (
                <div className="space-y-3">
                  {upcoming.map((booking, i) => (
                    <BookingCard key={booking.id} booking={booking} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "past" && (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {past.length === 0 ? (
                <EmptyState
                  title="No past trips"
                  desc="Completed trips will appear here."
                  cta="Browse Trips"
                  href="/"
                />
              ) : (
                <div className="space-y-3">
                  {past.map((booking, i) => (
                    <BookingCard key={booking.id} booking={booking} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "saved" && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {mockSavedDestinations.length === 0 ? (
                <EmptyState
                  title="No saved destinations"
                  desc="Save destinations you love and they'll appear here."
                  cta="Find a Destination"
                  href="/"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSavedDestinations.map((dest, i) => (
                    <SavedCard key={dest.id} saved={dest} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/destination/${booking.destinationId}`}
        className="group flex flex-col sm:flex-row gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200"
      >
        <div className="relative h-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-lg">
          <img
            src={booking.image}
            alt={booking.destinationName}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-400"
          />
          {booking.status === "upcoming" && (
            <div className="absolute top-2 left-2 rounded bg-[#2276E3] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
              Upcoming
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#2276E3] transition-colors">
                {booking.destinationName}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{booking.country}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-base font-bold text-gray-900">
                ₹{booking.totalPrice.toLocaleString("en-IN")}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {booking.travellers} pax
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span>
                {booking.day}, {booking.date}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span>{booking.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2.5">
            <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded">
              {booking.bookingRef}
            </span>
            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#2276E3] transition-colors ml-auto" />
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/destination/${saved.destinationId}`}
        className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={saved.image}
            alt={saved.destinationName}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-400"
          />
          <div className="absolute top-2.5 right-2.5 rounded-full bg-white/90 backdrop-blur-sm p-1.5 shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-[#FF6B35] text-[#FF6B35]" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1.5 text-gray-400 mb-1">
            <MapPin className="h-3 w-3" />
            <span className="text-[10px] font-semibold tracking-wider uppercase">
              {saved.country}
            </span>
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            {saved.destinationName}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-gray-900">
              ₹{(saved.price * 85).toLocaleString("en-IN")}/trip
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-[#FFB800] text-[#FFB800]" />
              <span className="text-xs font-semibold text-gray-600">{saved.rating}</span>
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
    <div className="py-16 text-center">
      <Compass className="h-10 w-10 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500 font-semibold text-sm mb-1">{title}</p>
      <p className="text-gray-400 text-xs mb-5 max-w-sm mx-auto">{desc}</p>
      <Link
        to={href}
        className="inline-flex items-center gap-2 rounded-lg bg-[#2276E3] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1A5DB8] transition-colors"
      >
        {cta}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
