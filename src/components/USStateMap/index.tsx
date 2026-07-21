"use client";

import { useState, useCallback } from "react";
import USA from "@svg-maps/usa";
import { US_STATES_BY_ABBR } from "@/data/us-states";

export interface USStateMapProps {
  /**
   * URL template with {slug} placeholder.
   * CAREDMVPrep:        "/{slug}-dmv-practice-test"
   * CARERealEstate:     "/{slug}-real-estate-practice-test"
   * CAREInsurancePrep:  "/{slug}-insurance-practice-test"
   * CAREContractorPrep: "/{slug}-contractor-practice-test"
   */
  urlPattern: string;

  /**
   * Optional set of uppercase state abbreviations shown with a stronger fill,
   * indicating full content is available (vs. sample-only).
   */
  highlightedAbbrs?: ReadonlySet<string>;

  className?: string;
}

// Brand palette: dark navy resting, light blue-gray on hover
const FILL_DEFAULT  = "#1a3a5c"; // slightly lighter navy — sample-only states
const FILL_LIVE     = "#0d2240"; // CARE dark navy — fully live states
const FILL_HOVER    = "#a8d4f5"; // light sky blue — hover/focus (lightens on interaction)
const STROKE        = "#ffffff"; // white borders

function buildHref(pattern: string, abbr: string): string {
  const state = US_STATES_BY_ABBR.get(abbr);
  const slug = state?.slug ?? abbr.toLowerCase();
  return pattern.replace("{slug}", slug).replace("{abbr}", abbr.toLowerCase());
}

export default function USStateMap({
  urlPattern,
  highlightedAbbrs,
  className = "",
}: USStateMapProps) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  type SvgLocation = { id: string; name: string; path: string };
  const states = (USA.locations as SvgLocation[]).filter((loc) => loc.id !== "dc");

  const handleEnter = useCallback((name: string) => setHoveredName(name), []);
  const handleLeave = useCallback(() => setHoveredName(null), []);

  return (
    <div className={`w-full select-none ${className}`}>
      {/* State name label — fixed height prevents layout shift */}
      <div className="h-7 flex items-center justify-center mb-1">
        <span
          className="text-sm font-semibold px-3 py-0.5 rounded-full transition-opacity duration-150"
          style={{
            color: "#1a7f3c",
            backgroundColor: "#e8f5ee",
            opacity: hoveredName ? 1 : 0,
          }}
        >
          {hoveredName ?? ""}
        </span>
      </div>

      <svg
        viewBox={USA.viewBox}
        aria-label="Interactive U.S. State Map — click a state to start your practice test"
        role="img"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <title>U.S. State Map — click a state to begin</title>
        {states.map((loc: { id: string; name: string; path: string }) => {
          const abbr = loc.id.toUpperCase();
          const isLive = highlightedAbbrs?.has(abbr) ?? false;
          const defaultFill = isLive ? FILL_LIVE : FILL_DEFAULT;
          const href = buildHref(urlPattern, abbr);

          return (
            <a
              key={loc.id}
              href={href}
              aria-label={`${loc.name} — start practice test`}
              onMouseEnter={() => handleEnter(loc.name)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(loc.name)}
              onBlur={handleLeave}
              style={{ outline: "none" }}
            >
              <title>{loc.name}</title>
              <path
                d={loc.path}
                style={{
                  fill: defaultFill,
                  stroke: STROKE,
                  strokeWidth: 0.8,
                  cursor: "pointer",
                  transition: "fill 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as SVGPathElement).style.fill = FILL_HOVER;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as SVGPathElement).style.fill = defaultFill;
                }}
                onFocus={(e) => {
                  (e.currentTarget as SVGPathElement).style.fill = FILL_HOVER;
                }}
                onBlur={(e) => {
                  (e.currentTarget as SVGPathElement).style.fill = defaultFill;
                }}
              />
            </a>
          );
        })}
      </svg>

      {/* Contextual hint — tap on mobile, click on desktop */}
      <p
        className="text-center text-xs mt-2 sm:hidden"
        style={{ color: "#9ca3af" }}
      >
        Tap a state to begin, or search above
      </p>
      <p
        className="text-center text-xs mt-2 hidden sm:block"
        style={{ color: "#9ca3af" }}
      >
        Click a state to begin, or use the search above
      </p>
    </div>
  );
}
