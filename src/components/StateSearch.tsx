"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { US_STATES } from "@/data/us-states";
import { LIVE_STATE_ABBRS } from "@/lib/stripe/config";
import USStateMap from "@/components/USStateMap";

const featuredCards = [
  {
    state: "California",
    slug: "california-dmv-practice-test",
    photo: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80",
    alt: "Golden Gate Bridge, San Francisco, California",
  },
  {
    state: "Texas",
    slug: "texas-dmv-practice-test",
    photo: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=600&q=80",
    alt: "Dallas, Texas skyline",
  },
  {
    state: "Florida",
    slug: "florida-dmv-practice-test",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    alt: "Florida beach and palm trees",
  },
  {
    state: "New York",
    slug: "new-york-dmv-practice-test",
    photo: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80",
    alt: "Statue of Liberty, New York",
  },
];

function toSlug(stateName: string) {
  return stateName.toLowerCase().replace(/\s+/g, "-") + "-dmv-practice-test";
}

function rankResults(q: string) {
  // Prefix-only: only show states whose names begin with the typed text.
  // US_STATES is already in alphabetical order, so the result is alphabetical.
  return US_STATES.filter((s) => s.name.toLowerCase().startsWith(q));
}

export default function StateSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const q = query.trim().toLowerCase();
  const filtered = q ? rankResults(q) : [];
  const isSearching = q.length > 0;

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isSearching || filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = selectedIndex >= 0 ? filtered[selectedIndex] : filtered[0];
      if (target) router.push(`/${toSlug(target.name)}`);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setQuery("");
      setSelectedIndex(-1);
    }
  }

  return (
    <>
      {/* Search input */}
      <div className="mb-6 max-w-lg mx-auto">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: "#9ca3af" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by state..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search for a state"
            aria-autocomplete="list"
            className="w-full pl-12 pr-10 py-3.5 rounded-xl text-sm focus:outline-none"
            style={{ border: "2px solid #e5e7eb", fontSize: "15px" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1a7f3c")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setSelectedIndex(-1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {isSearching && filtered.length > 0 && (
          <p className="text-xs mt-1.5 text-center" style={{ color: "#9ca3af" }}>
            ↑ ↓ to navigate &nbsp;·&nbsp; Enter to open &nbsp;·&nbsp; Esc to clear
          </p>
        )}
      </div>

      {/* Search results — replaces map while typing */}
      {isSearching && (
        <div className="mb-6">
          {filtered.length === 0 ? (
            <p className="text-center text-sm" style={{ color: "#6b7280" }}>
              No states found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map((state, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <Link
                    key={state.abbr}
                    href={`/${toSlug(state.name)}`}
                    className="flex items-center justify-center px-3 py-3 rounded-lg border text-sm font-medium text-center transition-colors"
                    style={{
                      borderColor: isSelected ? "#1a7f3c" : "#e5e7eb",
                      color: isSelected ? "#1a7f3c" : "#374151",
                      backgroundColor: isSelected ? "#f0fdf4" : "#fff",
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseLeave={() => setSelectedIndex(-1)}
                  >
                    {state.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Map + popular cards — restored when search is cleared */}
      {!isSearching && (
        <>
          {/* Map: constrained to ~75% of max-4xl to reduce height 20-25% */}
          <div className="mb-10 max-w-2xl mx-auto">
            <USStateMap
              urlPattern="/{slug}-dmv-practice-test"
              highlightedAbbrs={LIVE_STATE_ABBRS}
            />
          </div>

          {/* Popular state photo cards */}
          <div>
            <p
              className="text-center text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: "#9ca3af" }}
            >
              Popular States
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/${card.slug}`}
                  className="group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={card.photo}
                      alt={card.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="font-semibold text-gray-900 text-sm">{card.state}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{card.state} Permit Test</p>
                    <span
                      className="inline-flex items-center gap-1 mt-2 text-xs font-semibold group-hover:underline"
                      style={{ color: "#1a7f3c" }}
                    >
                      Start Practice →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
