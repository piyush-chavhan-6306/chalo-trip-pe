import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Shield,
  Headphones,
  CreditCard,
  ArrowRight,
  Compass,
} from "lucide-react";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";

type Region = "all" | "europe" | "asia" | "americas" | "africa";

const regions: { key: Region; label: string }[] = [
  { key: "all", label: "All" },
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "americas", label: "Americas" },
  { key: "africa", label: "Africa" },
];

const heroWords = ["Santorini", "Kyoto", "Amalfi", "Banff", "Lisbon", "Marrakech"];

const deals = [
  {
    id: "d1",
    title: "Early Bird",
    subtitle: "Book 30 days ahead",
    discount: "15% OFF",
    color: "from-amber-500 to-orange-500",
    icon: "🌅",
  },
  {
    id: "d2",
    title: "Couple's Escape",
    subtitle: "Romantic weekend packages",
    discount: "₹5,000 OFF",
    color: "from-rose-500 to-pink-500",
    icon: "💕",
  },
  {
    id: "d3",
    title: "Group Getaway",
    subtitle: "4+ travellers together",
    discount: "20% OFF",
    color: "from-emerald-500 to-teal-500",
    icon: "👥",
  },
  {
    id: "d4",
    title: "First Trip",
    subtitle: "New to Chalo Trip Pe?",
    discount: "₹3,000 OFF",
    color: "from-blue-500 to-indigo-500",
    icon: "🎉",
  },
];

const testimonials = [
  {
    text: "Booked Santorini in 2 minutes. The whole trip was curated perfectly — flights, hotel, everything.",
    author: "Priya M.",
    location: "Mumbai",
    rating: 5,
  },
  {
    text: "The Kyoto package was worth every rupee. A tea ceremony, bamboo grove, ryokan stay — all included.",
    author: "Arjun K.",
    location: "Delhi",
    rating: 5,
  },
  {
    text: "We used Chalo Trip Pe for our anniversary. The Amalfi Coast trip was the best gift we ever gave ourselves.",
    author: "Neha & Rohan",
    location: "Bangalore",
    rating: 5,
  },
];

export default function Landing() {
  const [activeRegion, setActiveRegion] = useState<Region>("all");
  const [search, setSearch] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [travellers] = useState(2);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // Animate cycling hero word
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 overflow-x-hidden">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-stone-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* ═══ Navigation ═══ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-stone-200/40"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Chalo Trip Pe" className="h-8 w-auto" />
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-stone-500">
              <a href="#destinations" className="hover:text-stone-900 transition-colors">Destinations</a>
              <a href="#deals" className="hover:text-stone-900 transition-colors">Deals</a>
              <a href="#how" className="hover:text-stone-900 transition-colors">How It Works</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth" className="hidden sm:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                Sign In
              </Link>
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-all duration-200 hover:shadow-lg hover:shadow-stone-900/10">
                Book Now
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ═══ Hero ═══ */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-[92vh] flex items-center">
        {/* Animated background image */}
        <div className="absolute inset-0">
          <motion.div
            key={wordIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={destinations[wordIndex % destinations.length].image}
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-[#FAF8F5]" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/30 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 w-full pt-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-medium text-white/90">Weekend escapes, curated for you</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] mb-4"
            >
              Your next weekend
              <br />
              in{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 40, opacity: 0, rotateX: -40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 40 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300"
                  >
                    {heroWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-300 to-rose-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg text-white/70 max-w-lg leading-relaxed mb-8"
            >
              Handpicked weekend escapes — flights, stays, and experiences all included.
              Just pick a date and go.
            </motion.p>

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] max-w-2xl"
            >
              {/* Search input */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search for a destination, activity, or vibe..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search destinations"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 py-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all"
                />
              </div>

              {/* Quick filters */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2">
                  <Calendar className="h-4 w-4 text-stone-400" />
                  <span className="text-xs text-stone-600">This Weekend</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2">
                  <Users className="h-4 w-4 text-stone-400" />
                  <span className="text-xs text-stone-600">{travellers} Travellers</span>
                </div>
                <button className="ml-auto flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors" aria-label="Search destinations">
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Search
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-8 mt-10"
          >
            {[
              { label: "Destinations", value: "6" },
              { label: "Happy Travellers", value: "1,451" },
              { label: "Rating", value: "4.8 ★" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && <div className="h-6 w-px bg-white/20" />}
                <div>
                  <p className="text-lg font-semibold text-white">{stat.value}</p>
                  <p className="text-[10px] text-white/50 tracking-wide uppercase">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ Trending / Popular Strip ═══ */}
      <main id="main-content">
      <section className="py-12 border-b border-stone-200/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <TrendingUp className="h-4 w-4 text-rose-500" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-stone-400">
              Trending This Week
            </span>
          </motion.div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/destination/${dest.id}`}
                  className="flex items-center gap-3 rounded-full border border-stone-200 bg-white pl-1.5 pr-4 py-1.5 hover:shadow-md hover:border-stone-300 transition-all duration-300 whitespace-nowrap group"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-stone-900 group-hover:text-stone-700">{dest.name}</p>
                    <p className="text-[10px] text-stone-400">{dest.country}</p>
                  </div>
                  <ChevronRight className="h-3 w-3 text-stone-300 group-hover:text-stone-500 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Deals ═══ */}
      <section id="deals" className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900">
              Exclusive Deals
            </h2>
            <p className="mt-1.5 text-sm text-stone-400">
              Limited-time offers on curated weekend packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deals.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className={`relative rounded-2xl bg-gradient-to-br ${deal.color} p-5 text-white overflow-hidden h-full`}>
                  {/* Decorative circle */}
                  <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative z-10">
                    <span className="text-2xl mb-3 block" aria-hidden="true">{deal.icon}</span>
                    <p className="text-2xl font-bold tracking-tight mb-1">{deal.discount}</p>
                    <p className="text-sm font-medium text-white/90">{deal.title}</p>
                    <p className="text-xs text-white/60 mt-0.5">{deal.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Destinations ═══ */}
      <section id="destinations" className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900">
                Popular Destinations
              </h2>
              <p className="mt-1.5 text-sm text-stone-400">
                Each trip is fully curated — flights, stays, and experiences included
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {regions.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRegion(r.key)}
                  aria-pressed={activeRegion === r.key}
                  aria-label={`Filter by ${r.label} region`}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border ${
                    activeRegion === r.key
                      ? "bg-stone-900 text-[#FAF8F5] border-stone-900 shadow-sm"
                      : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-700"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Results count */}
          <AnimatePresence>
            {(search || activeRegion !== "all") && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-stone-400 mb-6"
              >
                Showing {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DestinationCard destination={dest} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <Search className="h-8 w-8 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500 text-sm font-medium">No destinations match your search.</p>
                <p className="text-stone-400 text-xs mt-1">Try a different keyword or browse all destinations.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section id="how" className="py-20 border-t border-stone-200/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-stone-400 mb-3">Simple as it gets</p>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900">
              How Chalo Trip Pe Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {[
              { step: "01", title: "Browse & Choose", desc: "Explore our curated collection of weekend escapes. Each destination is handpicked for quality, experience, and value.", icon: Search },
              { step: "02", title: "Pick Your Dates", desc: "Select a time slot that works for you. We offer flexible departure mornings and afternoons across multiple weekends.", icon: Calendar },
              { step: "03", title: "Book & Go", desc: "Complete your booking in minutes. Flights, stays, and experiences are all included — just pack your bags.", icon: ArrowRight },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-stone-100 text-stone-900 text-lg font-semibold mb-5 group-hover:bg-stone-900 group-hover:text-[#FAF8F5] transition-colors duration-300"
                >
                  <item.icon className="h-6 w-6" />
                </motion.div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section className="py-20 bg-stone-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-white/40 mb-3">
              What travellers say
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white">
              Loved by 1,451+ travellers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white/70">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.author}</p>
                    <p className="text-xs text-white/40">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Trust Bar ═══ */}
      <section className="py-12 border-t border-stone-200/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Free Cancellation", desc: "Up to 48 hours before departure" },
              { icon: CreditCard, title: "Secure Payment", desc: "256-bit SSL encrypted" },
              { icon: Headphones, title: "24/7 Support", desc: "Chat and phone support" },
              { icon: Compass, title: "Curated Trips", desc: "Every trip is quality-assured" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-stone-100 mb-3">
                  <item.icon className="h-5 w-5 text-stone-500" />
                </div>
                <p className="text-sm font-medium text-stone-900">{item.title}</p>
                <p className="text-xs text-stone-400 mt-0.5">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Editorial Quote ═══ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-6 mx-auto h-px w-12 bg-stone-300" />
            <blockquote className="text-xl lg:text-2xl font-light text-stone-600 leading-relaxed italic">
              "The world is a book, and those who do not travel read only one page."
            </blockquote>
            <div className="mt-6 mx-auto h-px w-12 bg-stone-300" />
            <p className="mt-4 text-xs tracking-[0.2em] uppercase text-stone-400">— Saint Augustine</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-stone-900 p-10 lg:p-14 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-3">
                Ready for your next escape?
              </h2>
              <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
                Join 1,451+ travellers who trust Chalo Trip Pe for their weekend getaways.
              </p>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Get Started — It's Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      </main>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-stone-200/60 bg-[#F5F3F0]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <img src="/logo.svg" alt="Chalo Trip Pe" className="h-7 w-auto mb-4" />
              <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
                Handpicked weekend escapes — flights, stays, and experiences all included. Just pick a date and go.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><a href="#destinations" className="hover:text-stone-700 transition-colors">Destinations</a></li>
                <li><a href="#deals" className="hover:text-stone-700 transition-colors">Deals</a></li>
                <li><a href="#how" className="hover:text-stone-700 transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><a href="#" className="hover:text-stone-700 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-stone-700 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-stone-700 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-stone-700 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-stone-400">
            <span>© 2026 Chalo Trip Pe. All rights reserved.</span>
            <span>Made with care for weekend travellers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
