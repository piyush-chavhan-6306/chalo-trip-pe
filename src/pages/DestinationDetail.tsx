import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Calendar,
  Check,
  Users,
  MessageSquare,
  Send,
  ChevronRight,
  Shield,
  CreditCard,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import type { TimeSlot, Review } from "@/data/destinations";

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === id);

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [commentText, setCommentText] = useState("");
  const [localReviews, setLocalReviews] = useState<Review[]>(
    destination?.reviews ?? [],
  );

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 text-sm mb-4">
            Destination not found.
          </p>
          <Link
            to="/"
            className="text-sm font-medium text-stone-900 hover:underline"
          >
            ← Back to all destinations
          </Link>
        </div>
      </div>
    );
  }

  function handlePostComment() {
    if (!commentText.trim()) return;
    const newReview: Review = {
      id: `local-${Date.now()}`,
      author: "You",
      avatar: "YO",
      rating: 5,
      date: "Just now",
      text: commentText.trim(),
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    setCommentText("");
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-stone-200/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Destinations
            </Link>
            <Link to="/">
              <img src="/logo.svg" alt="Chalo Trip Pe" className="h-7 w-auto" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Image ─── */}
      <section className="pt-16">
        <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-white/70" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-white/70">
                  {destination.country}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-2">
                {destination.name}
              </h1>
              <p className="text-lg text-white/80 italic max-w-lg">
                {destination.tagline}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-white">
                    {destination.rating}
                  </span>
                  <span className="text-sm text-white/60">
                    ({destination.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-white/40">·</span>
                <div className="flex items-center gap-1.5 text-white/70">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-sm">{destination.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content ─── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* ── Left: Details ── */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  About This Trip
                </h2>
                <p className="text-sm leading-relaxed text-stone-600">
                  {destination.longDescription}
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-3 rounded-xl border border-stone-200/60 bg-white px-4 py-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                        <Check className="h-3.5 w-3.5 text-stone-600" />
                      </div>
                      <span className="text-sm text-stone-700">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Inclusions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.inclusions.map((inc) => (
                    <div
                      key={inc}
                      className="flex items-center gap-3 rounded-xl border border-stone-200/60 bg-white px-4 py-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <span className="text-sm text-stone-700">{inc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {destination.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] overflow-hidden rounded-xl border border-stone-200/60"
                    >
                      <img
                        src={img}
                        alt={`${destination.name} gallery ${i + 1}`}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Reviews & Comments ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-stone-900">
                    Reviews & Comments
                  </h2>
                  <span className="text-xs text-stone-400">
                    {localReviews.length} reviews
                  </span>
                </div>

                {/* Comment input */}
                <div className="mb-6 rounded-xl border border-stone-200/60 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-[#FAF8F5]">
                      YO
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts or ask a question..."
                        rows={3}
                        className="w-full resize-none rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handlePostComment}
                          disabled={!commentText.trim()}
                          className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-[#FAF8F5] hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="h-3 w-3" />
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reviews list */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {localReviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-xl border border-stone-200/60 bg-white p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-600">
                            {review.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-stone-900">
                                {review.author}
                              </span>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: review.rating }).map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      className="h-3 w-3 fill-amber-400 text-amber-400"
                                    />
                                  ),
                                )}
                              </div>
                              <span className="text-xs text-stone-400 ml-auto">
                                {review.date}
                              </span>
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">
                              {review.text}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* ── Right: Booking Sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]"
                >
                  {/* Price header */}
                  <div className="mb-6 pb-5 border-b border-stone-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-semibold text-stone-900">
                        ₹{(destination.price * 85).toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-stone-400">/person</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">
                      All-inclusive · {destination.duration}
                    </p>
                  </div>

                  {/* Time slots */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-stone-400" />
                      Choose Departure
                    </h3>
                    <div className="space-y-2">
                      {destination.timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                            selectedSlot?.id === slot.id
                              ? "border-stone-900 bg-stone-50 ring-1 ring-stone-900/10"
                              : "border-stone-200 hover:border-stone-300 bg-white"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium text-stone-900">
                              {slot.day}, {slot.date}
                            </p>
                            <p className="text-xs text-stone-400 mt-0.5">
                              {slot.time} · {slot.spots} spots left
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-stone-900">
                            ₹{(slot.price * 85).toLocaleString("en-IN")}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travellers */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-stone-400" />
                      Travellers
                    </h3>
                    <div className="flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3">
                      <span className="text-sm text-stone-600">
                        Adults
                      </span>
                      <div className="flex items-center gap-3">
                        <button className="h-7 w-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50 text-sm">
                          −
                        </button>
                        <span className="text-sm font-semibold text-stone-900 w-4 text-center">
                          2
                        </span>
                        <button className="h-7 w-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50 text-sm">
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Book button */}
                  <Link
                    to={
                      selectedSlot
                        ? `/checkout?dest=${destination.id}&slot=${selectedSlot.id}`
                        : "#"
                    }
                    onClick={(e) => {
                      if (!selectedSlot) e.preventDefault();
                    }}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-200 ${
                      selectedSlot
                        ? "bg-stone-900 text-[#FAF8F5] hover:bg-stone-800 shadow-sm"
                        : "bg-stone-100 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    {selectedSlot ? (
                      <>
                        Proceed to Checkout
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Select a Departure Date"
                    )}
                  </Link>

                  {/* Trust signals */}
                  <div className="mt-5 pt-5 border-t border-stone-100 space-y-3">
                    <div className="flex items-center gap-2.5 text-xs text-stone-400">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Free cancellation up to 48 hours before departure</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-stone-400">
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Secure payment · SSL encrypted</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-stone-400">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>24/7 support via chat and phone</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
