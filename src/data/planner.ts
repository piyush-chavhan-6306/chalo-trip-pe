import type { Destination } from "./destinations";

/** User preferences for the weekend trip planner */
export interface PlannerPreferences {
  /** Preferred destination region or "any" */
  region: string;
  /** Budget per person in USD */
  budget: number;
  /** Trip duration in days */
  duration: number;
  /** Travel style */
  style: "relaxation" | "adventure" | "culture" | "romantic" | "nature" | "food" | "any";
  /** Group type */
  group: "solo" | "couple" | "friends" | "family" | "any";
}

/** A destination with a match score and reasons */
export interface TripMatch {
  destination: Destination;
  /** Score from 0-100 indicating match quality */
  score: number;
  /** Human-readable reasons this destination matches the user's preferences */
  reasons: string[];
  /** Estimated total budget for this trip (per person) */
  estimatedBudget: number;
}

const STYLE_KEYWORDS: Record<string, string[]> = {
  relaxation: ["sunset", "beach", "spa", "hammam", "hot springs", "wine", "garden", "terrace", "coastal", "sea", "cove"],
  adventure: ["hike", "hiking", "paddle", "kayak", "gondola", "mountain", "trek", "walk", "outdoor"],
  culture: ["temple", "shrine", "museum", "festival", "ceremony", "tea", "historic", "medina", "fado", "music", "art"],
  romantic: ["sunset", "wine", "dinner", "garden", "coastal", "boutique", "terrace", "rooftop", "fado", "concert"],
  nature: ["lake", "mountain", "forest", "park", "bamboo", "garden", "beach", "volcanic", "alpine"],
  food: ["food", "tasting", "wine", "dinner", "seafood", "tagine", "pastry", "market", "lemon", "kaiseki"],
};

const REGION_MAP: Record<string, string> = {
  europe: "europe",
  asia: "asia",
  americas: "americas",
  africa: "africa",
  any: "any",
};

/** Map a duration to matching destinations */
function durationMatch(destDuration: string, targetDays: number): number {
  const match = destDuration.match(/(\d+)/);
  if (!match) return 0.5;
  const days = parseInt(match[1], 10);
  if (days === targetDays) return 1;
  if (Math.abs(days - targetDays) === 1) return 0.7;
  return 0.3;
}

/** Calculate how well a destination matches the user's style */
function styleMatch(dest: Destination, style: string): number {
  if (style === "any") return 0.8;
  const keywords = STYLE_KEYWORDS[style] || [];
  const text = [
    dest.tagline,
    dest.description,
    ...dest.highlights,
  ]
    .join(" ")
    .toLowerCase();
  const matchCount = keywords.filter((k) => text.includes(k)).length;
  return Math.min(1, 0.4 + (matchCount / keywords.length) * 0.6);
}

/** Calculate budget fit (closer to budget = better, over budget = penalty) */
function budgetFit(dest: Destination, budget: number): number {
  const price = dest.price;
  if (price <= budget) return 1 - (budget - price) / budget * 0.3;
  const overage = (price - budget) / budget;
  return Math.max(0.2, 1 - overage * 1.5);
}

/** Calculate region match */
function regionMatch(dest: Destination, region: string): number {
  if (region === "any" || region === "all") return 1;
  return dest.region === region ? 1 : 0.4;
}

/** Generate human-readable match reasons */
function generateReasons(dest: Destination, prefs: PlannerPreferences): string[] {
  const reasons: string[] = [];

  // Duration
  const durationMatch = dest.duration.includes(String(prefs.duration));
  if (durationMatch) {
    reasons.push(`${prefs.duration}-day trip — perfect length`);
  }

  // Budget
  if (dest.price <= prefs.budget) {
    reasons.push(`Within your ₹${(prefs.budget * 85).toLocaleString("en-IN")} budget`);
  } else if (dest.price <= prefs.budget * 1.15) {
    reasons.push(`Slightly over budget — but worth it`);
  }

  // Style
  if (prefs.style !== "any") {
    const styleLabels: Record<string, string> = {
      relaxation: "relaxation",
      adventure: "adventure",
      culture: "cultural experiences",
      romantic: "romantic",
      nature: "nature",
      food: "food & dining",
    };
    const matched = styleMatch(dest, prefs.style);
    if (matched > 0.6) {
      reasons.push(`Great for ${styleLabels[prefs.style]}`);
    }
  }

  // Rating
  if (dest.rating >= 4.8) {
    reasons.push(`${dest.rating}★ rating from ${dest.reviewCount} travellers`);
  }

  // Best time
  if (dest.bestTime) {
    reasons.push(`Best time: ${dest.bestTime}`);
  }

  return reasons.slice(0, 4);
}

/** Main matching function: rank destinations by preferences */
export function matchDestinations(
  destinations: Destination[],
  prefs: PlannerPreferences,
): TripMatch[] {
  return destinations
    .map((dest) => {
      const regionScore = regionMatch(dest, prefs.region) * 15;
      const budgetScore = budgetFit(dest, prefs.budget) * 25;
      const durationScore = durationMatch(dest.duration, prefs.duration) * 20;
      const styleScore = styleMatch(dest, prefs.style) * 20;
      const ratingScore = (dest.rating / 5) * 10;
      const reviewScore = Math.min(1, dest.reviewCount / 300) * 10;

      const score = Math.round(
        regionScore + budgetScore + durationScore + styleScore + ratingScore + reviewScore,
      );

      return {
        destination: dest,
        score: Math.min(100, Math.max(0, score)),
        reasons: generateReasons(dest, prefs),
        estimatedBudget: dest.price,
      };
    })
    .sort((a, b) => b.score - a.score);
}

/** Default preferences */
export const defaultPreferences: PlannerPreferences = {
  region: "any",
  budget: 500,
  duration: 3,
  style: "any",
  group: "any",
};
