import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  Check,
  Shield,
  Calendar,
  MapPin,
  Users,
  PartyPopper,
} from "lucide-react";
import { destinations } from "@/data/destinations";

export default function Checkout() {
  const [params] = useSearchParams();
  const destId = params.get("dest");
  const slotId = params.get("slot");

  const destination = destinations.find((d) => d.id === destId);
  const slot = destination?.timeSlots.find((s) => s.id === slotId);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const price = slot ? slot.price * 85 * 2 : 0;

  function formatCardNumber(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  }

  function handlePay() {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
    }, 2000);
  }

  if (!destination || !slot) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 text-sm mb-4">
            No booking details found.
          </p>
          <Link
            to="/"
            className="text-sm font-medium text-stone-900 hover:underline"
          >
            ← Start over
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full text-center"
        >
          <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <PartyPopper className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-stone-500 mb-8 leading-relaxed">
            Your weekend escape to {destination.name} is all set. We've sent a
            confirmation to <span className="font-medium text-stone-700">{email || "your email"}</span> with
            all the details.
          </p>

          <div className="rounded-2xl border border-stone-200/60 bg-white p-6 mb-8 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-stone-400" />
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    {destination.name}, {destination.country}
                  </p>
                  <p className="text-xs text-stone-400">{destination.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-stone-400" />
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    {slot.day}, {slot.date}
                  </p>
                  <p className="text-xs text-stone-400">{slot.time} departure</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-stone-400" />
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    2 Travellers
                  </p>
                  <p className="text-xs text-stone-400">
                    Booking ref: CTP-{Date.now().toString(36).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 transition-colors"
          >
            Explore More Destinations
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-stone-200/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <Link
              to={`/destination/${destination.id}`}
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {destination.name}
            </Link>
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-stone-400" />
              <span className="text-xs text-stone-400 font-medium">
                Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* ── Left: Payment Form ── */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-2xl font-semibold tracking-tight text-stone-900 mb-8">
                  Complete Your Booking
                </h1>

                {/* Contact details */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-stone-900 mb-4">
                    Contact Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-500 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Card details */}
                <div>
                  <h2 className="text-sm font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-stone-400" />
                    Payment Details
                  </h2>
                  <div className="rounded-2xl border border-stone-200/60 bg-white p-6 space-y-4">
                    <div>
                      <label className="block text-xs text-stone-500 mb-1.5">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 mb-1.5">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name as it appears on card"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-stone-500 mb-1.5">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) =>
                            setExpiry(formatExpiry(e.target.value))
                          }
                          placeholder="MM / YY"
                          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-500 mb-1.5">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                          }
                          placeholder="···"
                          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]"
                >
                  {/* Trip summary */}
                  <div className="mb-5 pb-5 border-b border-stone-100">
                    <div className="flex gap-3">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-stone-900">
                          {destination.name}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {destination.country} · {destination.duration}
                        </p>
                        <p className="text-xs text-stone-400">
                          {slot.day}, {slot.date} · {slot.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-3 mb-5 pb-5 border-b border-stone-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">
                        Trip cost × 2 travellers
                      </span>
                      <span className="text-stone-900">
                        ₹{(slot.price * 85 * 2).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Service fee</span>
                      <span className="text-stone-900">₹0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Taxes</span>
                      <span className="text-stone-900">Included</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-base font-semibold mb-6">
                    <span className="text-stone-900">Total</span>
                    <span className="text-stone-900">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Pay button */}
                  <button
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-medium text-[#FAF8F5] hover:bg-stone-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" />
                        Pay ₹{price.toLocaleString("en-IN")}
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-400">
                    <Shield className="h-3.5 w-3.5" />
                    <span>256-bit SSL encrypted</span>
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
