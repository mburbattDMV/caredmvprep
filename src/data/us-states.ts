export interface USState {
  name: string;
  abbr: string;
  emoji: string;
  slug: string;
}

export const US_STATES: USState[] = [
  { name: "Alabama",        abbr: "AL", emoji: "🌲", slug: "alabama" },
  { name: "Alaska",         abbr: "AK", emoji: "🏔️", slug: "alaska" },
  { name: "Arizona",        abbr: "AZ", emoji: "🌵", slug: "arizona" },
  { name: "Arkansas",       abbr: "AR", emoji: "💎", slug: "arkansas" },
  { name: "California",     abbr: "CA", emoji: "🌊", slug: "california" },
  { name: "Colorado",       abbr: "CO", emoji: "⛷️", slug: "colorado" },
  { name: "Connecticut",    abbr: "CT", emoji: "🏛️", slug: "connecticut" },
  { name: "Delaware",       abbr: "DE", emoji: "🦅", slug: "delaware" },
  { name: "Florida",        abbr: "FL", emoji: "🌴", slug: "florida" },
  { name: "Georgia",        abbr: "GA", emoji: "🍑", slug: "georgia" },
  { name: "Hawaii",         abbr: "HI", emoji: "🌺", slug: "hawaii" },
  { name: "Idaho",          abbr: "ID", emoji: "🥔", slug: "idaho" },
  { name: "Illinois",       abbr: "IL", emoji: "🌆", slug: "illinois" },
  { name: "Indiana",        abbr: "IN", emoji: "🏎️", slug: "indiana" },
  { name: "Iowa",           abbr: "IA", emoji: "🌽", slug: "iowa" },
  { name: "Kansas",         abbr: "KS", emoji: "🌾", slug: "kansas" },
  { name: "Kentucky",       abbr: "KY", emoji: "🏇", slug: "kentucky" },
  { name: "Louisiana",      abbr: "LA", emoji: "🎷", slug: "louisiana" },
  { name: "Maine",          abbr: "ME", emoji: "🦞", slug: "maine" },
  { name: "Maryland",       abbr: "MD", emoji: "🦀", slug: "maryland" },
  { name: "Massachusetts",  abbr: "MA", emoji: "🦃", slug: "massachusetts" },
  { name: "Michigan",       abbr: "MI", emoji: "🏭", slug: "michigan" },
  { name: "Minnesota",      abbr: "MN", emoji: "🌊", slug: "minnesota" },
  { name: "Mississippi",    abbr: "MS", emoji: "🎸", slug: "mississippi" },
  { name: "Missouri",       abbr: "MO", emoji: "🌉", slug: "missouri" },
  { name: "Montana",        abbr: "MT", emoji: "🏔️", slug: "montana" },
  { name: "Nebraska",       abbr: "NE", emoji: "🌽", slug: "nebraska" },
  { name: "Nevada",         abbr: "NV", emoji: "🎰", slug: "nevada" },
  { name: "New Hampshire",  abbr: "NH", emoji: "🍁", slug: "new-hampshire" },
  { name: "New Jersey",     abbr: "NJ", emoji: "🏖️", slug: "new-jersey" },
  { name: "New Mexico",     abbr: "NM", emoji: "🌵", slug: "new-mexico" },
  { name: "New York",       abbr: "NY", emoji: "🗽", slug: "new-york" },
  { name: "North Carolina", abbr: "NC", emoji: "🏔️", slug: "north-carolina" },
  { name: "North Dakota",   abbr: "ND", emoji: "🌾", slug: "north-dakota" },
  { name: "Ohio",           abbr: "OH", emoji: "🎡", slug: "ohio" },
  { name: "Oklahoma",       abbr: "OK", emoji: "🌾", slug: "oklahoma" },
  { name: "Oregon",         abbr: "OR", emoji: "🌲", slug: "oregon" },
  { name: "Pennsylvania",   abbr: "PA", emoji: "🔔", slug: "pennsylvania" },
  { name: "Rhode Island",   abbr: "RI", emoji: "⚓", slug: "rhode-island" },
  { name: "South Carolina", abbr: "SC", emoji: "🌴", slug: "south-carolina" },
  { name: "South Dakota",   abbr: "SD", emoji: "🦅", slug: "south-dakota" },
  { name: "Tennessee",      abbr: "TN", emoji: "🎸", slug: "tennessee" },
  { name: "Texas",          abbr: "TX", emoji: "⭐", slug: "texas" },
  { name: "Utah",           abbr: "UT", emoji: "🏜️", slug: "utah" },
  { name: "Vermont",        abbr: "VT", emoji: "🍁", slug: "vermont" },
  { name: "Virginia",       abbr: "VA", emoji: "🏛️", slug: "virginia" },
  { name: "Washington",     abbr: "WA", emoji: "☕", slug: "washington" },
  { name: "West Virginia",  abbr: "WV", emoji: "⛏️", slug: "west-virginia" },
  { name: "Wisconsin",      abbr: "WI", emoji: "🧀", slug: "wisconsin" },
  { name: "Wyoming",        abbr: "WY", emoji: "🤠", slug: "wyoming" },
];

export const US_STATES_BY_ABBR = new Map<string, USState>(
  US_STATES.map((s) => [s.abbr, s])
);
