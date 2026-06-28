import type { SubscriptionProduct } from '@/types/database';

// ─── Per-product Stripe price IDs ────────────────────────────────────────────
// Set each env var in .env.local after creating products in the Stripe dashboard.
// Monthly and annual prices are separate Stripe Price objects.

export interface ProductConfig {
  label:             string;
  description:       string;
  priceCentsMonthly: number;   // display price (matches subscription_plans seed)
  priceCentsAnnual:  number;
  priceIdMonthly:    string;   // Stripe Price ID — from env var
  priceIdAnnual:     string;
}

export const PRODUCT_CONFIG: Record<SubscriptionProduct, ProductConfig> = {
  dmv: {
    label:             "Driver's License",
    description:       "Full CA DMV permit question bank + 3 timed mock exams",
    priceCentsMonthly: 999,
    priceCentsAnnual:  7999,
    priceIdMonthly:    process.env.STRIPE_PRICE_DMV_MONTHLY    ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_DMV_ANNUAL     ?? '',
  },
  motorcycle: {
    label:             "Motorcycle License",
    description:       "Full CA motorcycle endorsement question bank",
    priceCentsMonthly: 799,
    priceCentsAnnual:  5999,
    priceIdMonthly:    process.env.STRIPE_PRICE_MOTO_MONTHLY   ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_MOTO_ANNUAL    ?? '',
  },
  cdl: {
    label:             "CDL Core",
    description:       "General Knowledge, Air Brakes, and Combination Vehicles banks",
    priceCentsMonthly: 1499,
    priceCentsAnnual:  9999,
    priceIdMonthly:    process.env.STRIPE_PRICE_CDL_MONTHLY    ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_CDL_ANNUAL     ?? '',
  },
  cdl_hazmat: {
    label:             "HazMat Add-on",
    description:       "CDL HazMat (H) endorsement bank — requires CDL Core",
    priceCentsMonthly: 499,
    priceCentsAnnual:  3999,
    priceIdMonthly:    process.env.STRIPE_PRICE_HAZMAT_MONTHLY ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_HAZMAT_ANNUAL  ?? '',
  },
  cdl_tanker: {
    label:             "Tank Vehicle Add-on",
    description:       "CDL Tank Vehicles (N) endorsement bank — requires CDL Core",
    priceCentsMonthly: 499,
    priceCentsAnnual:  3999,
    priceIdMonthly:    process.env.STRIPE_PRICE_TANKER_MONTHLY ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_TANKER_ANNUAL  ?? '',
  },
  cdl_doubles_triples: {
    label:             "Doubles & Triples Add-on",
    description:       "CDL Doubles & Triples (T) endorsement bank — requires CDL Core",
    priceCentsMonthly: 499,
    priceCentsAnnual:  3999,
    priceIdMonthly:    process.env.STRIPE_PRICE_DOUBLES_MONTHLY ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_DOUBLES_ANNUAL  ?? '',
  },
  cdl_school_bus: {
    label:             "School Bus Package",
    description:       "CDL School Bus (S) endorsement bank",
    priceCentsMonthly: 499,
    priceCentsAnnual:  3999,
    priceIdMonthly:    process.env.STRIPE_PRICE_SCHOOL_BUS_MONTHLY ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_SCHOOL_BUS_ANNUAL  ?? '',
  },
  cdl_passenger: {
    label:             "Passenger Package",
    description:       "CDL Passenger (P) endorsement bank",
    priceCentsMonthly: 499,
    priceCentsAnnual:  3999,
    priceIdMonthly:    process.env.STRIPE_PRICE_PASSENGER_MONTHLY ?? '',
    priceIdAnnual:     process.env.STRIPE_PRICE_PASSENGER_ANNUAL  ?? '',
  },
};

// ─── Quiz → required subscription product ────────────────────────────────────
// Used by quiz and mock-exam pages to enforce access control.

export const QUIZ_PRODUCT_MAP: Partial<Record<string, SubscriptionProduct>> = {
  'california-permit':        'dmv',
  'california-motorcycle':    'motorcycle',
  'california-cdl-general':   'cdl',
  'cdl-hazmat':               'cdl_hazmat',
  'cdl-tank-vehicles':        'cdl_tanker',
  'cdl-doubles-triples':      'cdl_doubles_triples',
  'cdl-air-brakes':           'cdl',
  'cdl-combination-vehicles': 'cdl',
  'cdl-passenger':            'cdl_passenger',
  'cdl-school-bus':           'cdl_school_bus',
  // Mock exams follow the same subscription as their base
  'california-permit-mock-1': 'dmv',
  'california-permit-mock-2': 'dmv',
  'california-permit-mock-3': 'dmv',
};

// Formats cents as "$9.99"
export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2).replace('.00', '')}`;
}
