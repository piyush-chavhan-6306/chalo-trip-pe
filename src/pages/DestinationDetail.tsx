import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Check,
  Users,
  MessageSquare,
  Send,
  ChevronRight,
  Shield,
  CreditCard,
  Heart,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Destination not found.</p>
          <Link
            to="/"
            className="text-sm font-semibold text-[#2276E3] hover:underline"
          >
            ← Browse all destinations
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

  const originalPrice = Math.round(destination.price * 85 * 1.2);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ─── Blue Header Nav ─── */}
      <nav className="bg-[#2276E3] px-6 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Destinations
          </Link>
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Chalo Trip Pe"
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>
        </div>
      </nav>

      {/* ─── Breadcrumb ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-2.5">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-[#2276E3] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-600">{destination.country}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {destination.name}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Hero Image ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl">
          <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden rounded-b-xl lg:rounded-xl lg:mt-4 lg:mx-4 lg:max-w-[calc(100%-2rem)]">
            <img
              src={destination.image}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Image overlays */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="rounded-md bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-gray-900 shadow-sm">
                {destination.duration}
              </span>
              <span className="rounded-md bg-[#2276E3]/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                ★ {destination.rating}
              </span>
            </div>

            <button className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-white/70" />
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  {destination.country}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {destination.name}
              </h1>
              <p className="text-sm text-white/70 italic">{destination.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Details ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="h-6 w-1 bg-[#2276E3] rounded-full" />
                About This Trip
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {destination.longDescription}
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="h-6 w-1 bg-[#FF6B35] rounded-full" />
                Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 border border-gray-100"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2276E3]/10">
                      <Check className="h-3.5 w-3.5 text-[#2276E3]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Inclusions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="h-6 w-1 bg-green-500 rounded-full" />
                What's Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.inclusions.map((inc) => (
                  <div
                    key={inc}
                    className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3 border border-green-100"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {inc}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="h-6 w-1 bg-[#FFB800] rounded-full" />
                Gallery
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {destination.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={img}
                      alt={`${destination.name} gallery ${i + 1}`}
                      className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <div className="h-6 w-1 bg-purple-500 rounded-full" />
                  Reviews & Comments
                </h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                  {localReviews.length}
                </span>
              </div>

              {/* Comment input */}
              <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2276E3] text-xs font-bold text-white">
                    YO
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your thoughts or ask a question..."
                      rows={3}
                      className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handlePostComment}
                        disabled={!commentText.trim()}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2276E3] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1A5DB8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-3 w-3" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews list */}
              <div className="space-y-3">
                <AnimatePresence>
                  {localReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                          {review.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">
                              {review.author}
                            </span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="h-3 w-3 fill-[#FFB800] text-[#FFB800]"
                                  />
                                ),
                              )}
                            </div>
                            <span className="text-xs text-gray-400 ml-auto">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
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
            <div className="sticky top-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
              >
                {/* Price header */}
                <div className="bg-[#2276E3] p-5 text-white">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      ₹{(destination.price * 85).toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-white/60 line-through">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {Math.round(
                        ((originalPrice - destination.price * 85) /
                          originalPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                    <span className="text-xs text-white/70">
                      per person · {destination.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Time slots */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#2276E3]" />
                      Choose Departure
                    </h3>
                    <div className="space-y-2">
                      {destination.timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full flex items-center justify-between rounded-lg border px-3.5 py-3 text-left transition-all duration-200 ${
                            selectedSlot?.id === slot.id
                              ? "border-[#2276E3] bg-[#2276E3]/5 ring-1 ring-[#2276E3]/20"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {slot.day}, {slot.date}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {slot.time} ·{" "}
                              <span
                                className={
                                  slot.spots <= 3
                                    ? "text-[#FF6B35] font-semibold"
                                    : ""
                                }
                              >
                                {slot.spots} spots left
                              </span>
                            </p>
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            ₹{(slot.price * 85).toLocaleString("en-IN")}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travellers */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2276E3]" />
                      Travellers
                    </h3>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                      <span className="text-sm text-gray-600">Adults</span>
                      <div className="flex items-center gap-3">
                        <button className="h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-sm font-bold">
                          −
                        </button>
                        <span className="text-sm font-bold text-gray-900 w-4 text-center">
                          2
                        </span>
                        <button className="h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-sm font-bold">
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
                    className={`w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold transition-all duration-200 ${
                      selectedSlot
                        ? "bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-lg shadow-[#FF6B35]/25"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {selectedSlot ? (
                      <>
                        BOOK NOW
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Select a Departure Date"
                    )}
                  </Link>

                  {/* Trust signals */}
                  <div className="pt-4 border-t border-gray-100 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-gray-500">
                      <Shield className="h-3.5 w-3.5 text-green-500" />
                      <span>Free cancellation up to 48 hours before</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-500">
                      <CreditCard className="h-3.5 w-3.5 text-[#2276E3]" />
                      <span>Secure payment · SSL encrypted</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-500">
                      <MessageSquare className="h-3.5 w-3.5 text-[#FF6B35]" />
                      <span>24/7 support via chat and phone</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
