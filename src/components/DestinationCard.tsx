import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Star, Clock, MapPin, ArrowUpRight } from "lucide-react";
import type { Destination } from "@/data/destinations";

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export function DestinationCard({ destination, index }: DestinationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const shineX = useSpring(0, springConfig);
  const shineY = useSpring(0, springConfig);

  const background = useMotionTemplate`radial-gradient(
    350px circle at ${shineX}px ${shineY}px,
    ${destination.color}15,
    transparent 60%
  )`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(-y / 12);
    rotateY.set(x / 12);
    shineX.set(x + rect.width / 2);
    shineY.set(y + rect.height / 2);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden rounded-2xl bg-[#FAF8F5] border border-stone-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] transition-shadow duration-500 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.05)]"
      >
        {/* Shine overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />

        {/* Image */}
        <Link
          to={`/destination/${destination.id}`}
          className="block relative aspect-[4/3] overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <motion.img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* Price badge */}
          <div
            className="absolute top-4 right-4 z-10 rounded-full bg-white/90 backdrop-blur-sm px-3.5 py-1.5 shadow-sm"
            style={{ transform: "translateZ(20px)" }}
          >
            <span className="text-sm font-semibold tracking-tight text-stone-800">
              ₹{(destination.price * 85).toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-stone-500 ml-0.5">/trip</span>
          </div>

          {/* Rating */}
          <div
            className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm"
            style={{ transform: "translateZ(20px)" }}
          >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-stone-700">
              {destination.rating}
            </span>
            <span className="text-[10px] text-stone-400">
              ({destination.reviewCount})
            </span>
          </div>

          {/* View CTA on hover */}
          <motion.div
            className="absolute bottom-4 right-4 z-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translateZ(15px)" }}
          >
            <div className="flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-[#FAF8F5]">
              View Trip
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </motion.div>
        </Link>

        {/* Content */}
        <Link
          to={`/destination/${destination.id}`}
          className="block relative p-5 pb-6"
          style={{ transform: "translateZ(10px)" }}
        >
          <div className="mb-2.5 flex items-center gap-1.5 text-stone-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-medium tracking-widest uppercase">
              {destination.country}
            </span>
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-stone-900 mb-1">
            {destination.name}
          </h3>

          <p className="text-sm text-stone-500 italic mb-3">
            {destination.tagline}
          </p>

          <p className="text-sm leading-relaxed text-stone-600 mb-4 line-clamp-3">
            {destination.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{destination.duration}</span>
            </div>
            <span className="text-stone-300">·</span>
            <span>{destination.bestTime}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {destination.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 border border-stone-100"
              >
                {h}
              </span>
            ))}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
