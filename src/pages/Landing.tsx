import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  Star,
  Sparkles,
  Shield,
  Headphones,
  CreditCard,
  ArrowRight,
  Compass,
  SlidersHorizontal,
} from "lucide-react";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";
import {
  matchDestinations,
  defaultPreferences,
  type PlannerPreferences,
  type TripMatch,
} from "@/data/planner";

const regions = [
  { key: "any", label: "Any" },
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "americas", label: "Americas" },
  { key: "africa", label: "Africa" },
];

const styles = [
  { key: "any", label: "Any Style", icon: "✨" },
  { key: "relaxation", label: "Relaxation", icon: "🧘" },
  { key: "adventure", label: "Adventure", icon: "🏔" },
  { key: "culture", label: "Culture", icon: "🏛" },
  { key: "romantic", label: "Romantic", icon: "💑" },
  { key: "nature", label: "Nature", icon: "🌿" },
  { key: "food", label: "Food & Dining", icon: "🍽" },
];

const groups = [
  { key: "any", label: "Anyone" },
  { key: "solo", label: "Solo" },
  { key: "couple", label: "Couple" },
  { key: "friends", label: "Friends" },
  { key: "family", label: "Family" },
];

const heroWords = ["Santorini", "Kyoto", "Amalfi", "Banff", "Lisbon", "Marrakech"];

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
    text: "We used ESCAPE for our anniversary. The Amalfi Coast trip was the best gift we ever gave ourselves.",
    author: "Neha & Rohan",
    location: "Bangalore",
    rating: 5,
  },
];

export default function Landing() {
  const [prefs, setPrefs] = useState<PlannerPreferences>(defaultPreferences);
  const [hasPlanned, setHasPlanned] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

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

  // Get ranked recommendations based on preferences
  const recommendations: TripMatch[] = useMemo(
    () => matchDestinations(destinations, prefs),
    [prefs],
  );

  function handlePlanTrip() {
    setHasPlanned(true);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function updatePrefs(patch: Partial<PlannerPreferences>) {
    setPrefs((prev) => ({ ...prev, ...patch }));
    setHasPlanned(false);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 overflow-x-hidden">
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-stone-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* ═══ Navigation ═══ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-stone-200/40"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="ESCAPE Weekend Trip Planner" className="h-8 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm text-stone-500">
              <a href="#planner" className="hover:text-stone-900 transition-colors">Planner</a>
              <a href="#results" className="hover:text-stone-900 transition-colors">Destinations</a>
              <a href="#how" className="hover:text-stone-900 transition-colors">How It Works</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth" className="hidden sm:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
                Sign In
              </Link>
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-all duration-200 hover:shadow-lg hover:shadow-stone-900/10">
                Get Started
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ═══ Hero ═══ */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-[92vh] flex items-center" aria-label="Hero">
        {/* Animated background image */}
        <div className="absolute inset-0" aria-hidden="true">
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
              <Sparkles className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
              <span className="text-xs font-medium text-white/90">Weekend Trip Planner — Curated for You</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] mb-4"
            >
              Plan your perfect
              <br />
              weekend in{" "}
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
                  aria-hidden="true"
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
              Tell us what you want — budget, style, duration — and we'll match you with the perfect weekend escape. Flights, stays, and experiences included.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* ═══ Main Content ═══ */}
      <main id="main-content">
        {/* ═══ PLANNER FORM ═══ */}
        <section id="planner" className="py-16 relative -mt-32 z-20" aria-label="Weekend Trip Planner">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl border border-stone-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-8 lg:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-stone-900 flex items-center justify-center">
                  <SlidersHorizontal className="h-5 w-5 text-[#FAF8F5]" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-stone-900">Plan Your Weekend Trip</h2>
                  <p className="text-xs text-stone-400">Set your preferences and we'll find the best match</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {/* Region */}
                <div>
                  <label htmlFor="pref-region" className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">
                    Region
                  </label>
                  <select
                    id="pref-region"
                    value={prefs.region}
                    onChange={(e) => updatePrefs({ region: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all cursor-pointer"
                    aria-label="Select destination region"
                  >
                    {regions.map((r) => (
                      <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="pref-budget" className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">
                    Budget (per person)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">$</span>
                    <input
                      id="pref-budget"
                      type="range"
                      min={150}
                      max={800}
                      step={25}
                      value={prefs.budget}
                      onChange={(e) => updatePrefs({ budget: parseInt(e.target.value) })}
                      className="w-full mt-2 accent-stone-900 cursor-pointer"
                      aria-label={`Budget: $${prefs.budget} per person`}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-stone-400">$150</span>
                      <span className="text-sm font-semibold text-stone-900">${prefs.budget}</span>
                      <span className="text-xs text-stone-400">$800</span>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="pref-duration" className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">
                    Duration
                  </label>
                  <div className="flex gap-2">
                    {[2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        onClick={() => updatePrefs({ duration: d })}
                        className={`flex-1 rounded-lg py-3 text-sm font-medium transition-all cursor-pointer ${
                          prefs.duration === d
                            ? "bg-stone-900 text-[#FAF8F5] shadow-sm"
                            : "bg-stone-50 text-stone-500 border border-stone-200 hover:border-stone-300"
                        }`}
                        aria-pressed={prefs.duration === d}
                        aria-label={`${d} days`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">
                    Travel Style
                  </label>
                  <select
                    value={prefs.style}
                    onChange={(e) => updatePrefs({ style: e.target.value as PlannerPreferences["style"] })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all cursor-pointer"
                    aria-label="Select travel style"
                  >
                    {styles.map((s) => (
                      <option key={s.key} value={s.key}>{s.icon} {s.label}</option>
                    ))}
                  </select>
                </div>

                {/* Group */}
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">
                    Travelling With
                  </label>
                  <select
                    value={prefs.group}
                    onChange={(e) => updatePrefs({ group: e.target.value as PlannerPreferences["group"] })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all cursor-pointer"
                    aria-label="Select group type"
                  >
                    {groups.map((g) => (
                      <option key={g.key} value={g.key}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handlePlanTrip}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-8 py-3.5 text-sm font-semibold text-[#FAF8F5] hover:bg-stone-800 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Find My Weekend Trip
              </button>
            </motion.div>
          </div>
        </section>

        {/* ═══ RECOMMENDATIONS ═══ */}
        <section id="results" className="py-16" aria-label="Trip recommendations">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900">
                {hasPlanned ? "Your Matched Destinations" : "Popular Weekend Escapes"}
              </h2>
              <p className="mt-1.5 text-sm text-stone-400">
                {hasPlanned
                  ? `Ranked by how well they match your ${prefs.duration}-day ${prefs.style === "any" ? "" : prefs.style + " "}trip`
                  : "Set your preferences above to get personalised recommendations"}
              </p>
            </motion.div>

            {/* Match result cards with reasons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {recommendations.map((match, i) => (
                  <motion.div
                    key={match.destination.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DestinationCard destination={match.destination} index={i} matchScore={hasPlanned ? match.score : undefined} matchReasons={hasPlanned ? match.reasons : undefined} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ═══ How It Works ═══ */}
        <section id="how" className="py-20 border-t border-stone-200/40" aria-label="How it works">
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
                How ESCAPE Works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
              {[
                { step: "01", title: "Set Your Preferences", desc: "Choose your destination region, budget, travel style, trip duration, and who you're travelling with.", icon: SlidersHorizontal },
                { step: "02", title: "Get Matched Trips", desc: "We rank destinations based on how well they match your preferences, with clear reasons for each match.", icon: Compass },
                { step: "03", title: "Book & Go", desc: "Select a departure date, complete your booking in minutes, and head out on your weekend escape.", icon: ArrowRight },
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
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Testimonials ═══ */}
        <section className="py-20 bg-stone-900" aria-label="Testimonials">
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
                  <div className="flex items-center gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white/70" aria-hidden="true">
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
        <section className="py-12 border-t border-stone-200/40" aria-label="Trust features">
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
                    <item.icon className="h-5 w-5 text-stone-500" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-stone-900">{item.title}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA Banner ═══ */}
        <section className="pb-20" aria-label="Get started">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl bg-stone-900 p-10 lg:p-14 text-center overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]\" aria-hidden="true" />
              <div className="relative z-10">
                <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-3">
                  Ready for your next weekend escape?
                </h2>
                <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
                  Join 1,451+ travellers who trust ESCAPE for their weekend getaways.
                </p>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  Get Started — It's Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-stone-200/60 bg-[#F5F3F0]" role="contentinfo">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <img src="/logo.svg" alt="ESCAPE" className="h-7 w-auto mb-4" />
              <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
                Plan your perfect weekend trip. Tell us your preferences and we'll match you with the best escape — flights, stays, and experiences all included.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><a href="#planner" className="hover:text-stone-700 transition-colors">Trip Planner</a></li>
                <li><a href="#results" className="hover:text-stone-700 transition-colors">Destinations</a></li>
                <li><a href="#how" className="hover:text-stone-700 transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><Link to="/auth" className="hover:text-stone-700 transition-colors">Sign In</Link></li>
                <li><a href="#" className="hover:text-stone-700 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-stone-700 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-stone-700 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-stone-400">
            <span>© 2026 ESCAPE — Weekend Trip Planner. All rights reserved.</span>
            <span>Made with care for weekend travellers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
