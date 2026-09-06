import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  CreditCard,
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
  const pax = Math.max(1, Math.min(10, parseInt(params.get("pax") ?? "2", 10) || 2));

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const price = slot ? slot.price * 85 * pax : 0;
  const [bookingRef] = useState(
    () => `CTP-${Date.now().toString(36).toUpperCase()}`,
  );

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">No booking details found.</p>
          <Link
            to="/"
            className="text-sm font-semibold text-[#2276E3] hover:underline"
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
      <div className="min-h-screen bg-gradient-to-b from-[#2276E3] to-[#1A5DB8] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-green-500 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <PartyPopper className="h-12 w-12 text-white mx-auto mb-3" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Booking Confirmed!
              </h1>
              <p className="text-sm text-white/80">
                Your trip is all set
              </p>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-500 mb-5 text-center">
                We've sent a confirmation to{" "}
                <span className="font-semibold text-gray-700">
                  {email || "your email"}
                </span>
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 mb-5 space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#2276E3]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {destination.name}, {destination.country}
                    </p>
                    <p className="text-xs text-gray-400">
                      {destination.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-[#2276E3]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {slot.day}, {slot.date}
                    </p>
                    <p className="text-xs text-gray-400">{slot.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[#2276E3]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {pax} Traveller{pax > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      Ref: {bookingRef}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-xl font-bold text-gray-900">
                  ₹{price.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-400">Total paid · {pax} Traveller{pax > 1 ? "s" : ""}</p>
              </div>

              <Link
                to="/"
                className="block w-full text-center rounded-lg bg-[#2276E3] px-6 py-3 text-sm font-bold text-white hover:bg-[#1A5DB8] transition-colors"
              >
                Explore More Destinations
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Blue header */}
      <nav className="bg-[#2276E3] px-6 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link
            to={`/destination/${destination.id}`}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {destination.name}
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-white/70" />
            <span className="text-xs text-white/70 font-medium">
              Secure Checkout
            </span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Payment Form ── */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Complete Your Booking
              </h1>

              {/* Contact details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="h-5 w-1 bg-[#2276E3] rounded-full" aria-hidden="true" />
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      aria-required="true"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Card details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="h-5 w-1 bg-[#FF6B35] rounded-full" aria-hidden="true" />
                  <CreditCard className="h-4 w-4 text-[#FF6B35]" aria-hidden="true" />
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="checkout-card-number" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Card Number
                    </label>
                    <input
                      id="checkout-card-number"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="4242 4242 4242 4242"
                      aria-required="true"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-card-name" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Name on Card
                    </label>
                    <input
                      id="checkout-card-name"
                      type="text"
                      autoComplete="cc-name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name as it appears on card"
                      aria-required="true"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkout-expiry" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Expiry Date
                      </label>
                      <input
                        id="checkout-expiry"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
                        placeholder="MM / YY"
                        aria-required="true"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-cvv" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        CVV
                      </label>
                      <input
                        id="checkout-cvv"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(
                            e.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        placeholder="···"
                        aria-required="true"
                        aria-label="Card security code"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
              >
                {/* Trip summary */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex gap-3">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {destination.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {destination.country} · {destination.duration}
                      </p>
                      <p className="text-xs text-gray-400">
                        {slot.day}, {slot.date} · {slot.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="p-5 space-y-3 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Trip × {pax}</span>
                    <span className="font-medium text-gray-900">
                      ₹{(slot.price * 85 * pax).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service fee</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes</span>
                    <span className="font-medium text-gray-900">Included</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between mb-5">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Pay button */}
                  <button
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#FF6B35] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#E55A2B] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[#FF6B35]/25"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" />
                        PAY ₹{price.toLocaleString("en-IN")}
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Shield className="h-3.5 w-3.5 text-green-500" />
                    <span>256-bit SSL encrypted</span>
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
