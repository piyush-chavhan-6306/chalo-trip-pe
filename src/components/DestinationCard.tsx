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

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Magnetic pull toward cursor
  const translateX = useSpring(0, { damping: 30, stiffness: 200 });
  const translateY = useSpring(0, { damping: 30, stiffness: 200 });

  const shineX = useSpring(0, springConfig);
  const shineY = useSpring(0, springConfig);

  // Gradient border glow
  const borderOpacity = useSpring(0, { damping: 30, stiffness: 200 });

  const background = useMotionTemplate`radial-gradient(
    400px circle at ${shineX}px ${shineY}px,
    ${destination.color}20,
    transparent 55%
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

    // 3D tilt
    rotateX.set(-y / 10);
    rotateY.set(x / 10);

    // Magnetic pull
    translateX.set(x * 0.02);
    translateY.set(y * 0.02);

    // Shine
    shineX.set(x + rect.width / 2);
    shineY.set(y + rect.height / 2);

    borderOpacity.set(0.6);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
    borderOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
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
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden rounded-2xl bg-[#FAF8F5] border border-stone-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] transition-shadow duration-500 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.08),0_20px_60px_rgba(0,0,0,0.06)]"
      >
        {/* Animated glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-30"
          style={{
            opacity: borderOpacity,
            background: `linear-gradient(135deg, ${destination.color}30, transparent 40%, transparent 60%, ${destination.color}30)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

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
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Price badge */}
          <motion.div
            className="absolute top-4 right-4 z-10 rounded-full bg-white/90 backdrop-blur-sm px-3.5 py-1.5 shadow-sm"
            style={{ transform: "translateZ(20px)" }}
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-semibold tracking-tight text-stone-800">
              ₹{(destination.price * 85).toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-stone-500 ml-0.5">/trip</span>
          </motion.div>

          {/* Rating */}
          <motion.div
            className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm"
            style={{ transform: "translateZ(20px)" }}
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-stone-700">{destination.rating}</span>
            <span className="text-[10px] text-stone-400">({destination.reviewCount})</span>
          </motion.div>

          {/* View CTA */}
          <motion.div
            className="absolute bottom-4 right-4 z-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: "translateZ(15px)" }}
          >
            <div className="flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-[#FAF8F5] shadow-lg shadow-stone-900/20">
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
          <motion.div
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2.5 flex items-center gap-1.5 text-stone-400">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs font-medium tracking-widest uppercase">{destination.country}</span>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-stone-900 mb-1">
              {destination.name}
            </h3>

            <p className="text-sm text-stone-500 italic mb-3">{destination.tagline}</p>

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
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 border border-stone-100 group-hover:bg-stone-900 group-hover:text-[#FAF8F5] group-hover:border-stone-900 transition-colors duration-300"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
