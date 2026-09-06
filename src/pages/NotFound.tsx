import { Link } from "react-router";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Blue header */}
      <nav className="bg-[#2276E3] px-6 py-3">
        <div className="mx-auto max-w-6xl">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Chalo Trip Pe"
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#2276E3]/10 mb-6">
            <MapPin className="h-10 w-10 text-[#2276E3]" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-lg text-gray-500 mb-6">
            Looks like you've wandered off the trail
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2276E3] px-6 py-3 text-sm font-bold text-white hover:bg-[#1A5DB8] transition-colors"
          >
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
