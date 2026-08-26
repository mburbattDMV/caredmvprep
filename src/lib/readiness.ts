import type { DashboardStats } from '@/lib/supabase/queries';
import type { WeakTopic } from '@/types/database';

// Renamed and re-derived 2026-08-26: the previous version blended real
// accuracy with two invented, uncalibrated bonus points ("coverageBonus",
// "masteryBonus") into a fabricated `passProb`, and labeled the result with
// exam-outcome certainty language ("Exam Ready") the platform has no
// statistical basis to claim. See CARE_UNIVERSAL_STANDARDS.md, "Readiness
// claim integrity." Every level below is a factual description of practice
// accuracy relative to the exam's real, published passing score — never a
// probability, never a certainty claim about the real exam.
export type ConfidenceLevel =
  | 'no_data'
  | 'needs_practice'
  | 'building_evidence'
  | 'near_threshold'
  | 'above_threshold';

export type TopicConfidence =
  | 'no_data'       // < 5 questions answered
  | 'preliminary'   // 5–9 questions
  | 'solid';        // 10+ questions

export interface ReadinessResult {
  score:              number;
  confidence:         ConfidenceLevel;
  label:              string;
  color:              string;
  description:        string;
  trend:              'up' | 'down' | 'stable' | 'unknown';
  trendLabel:         string;
  topicsMastered:     number;
  totalTopics:        number;
  officialPassingPct: number | null;
  nextStep:           string;
}

export const MASTERY_MIN_QUESTIONS   = 10;
export const MASTERY_MIN_ACCURACY    = 80;
export const TOPIC_MIN_DISPLAY       = 5;

export function topicConfidence(total: number): TopicConfidence {
  if (total < TOPIC_MIN_DISPLAY)     return 'no_data';
  if (total < MASTERY_MIN_QUESTIONS) return 'preliminary';
  return 'solid';
}

/**
 * @param officialPassingPct The exam's real, published passing percentage
 *   (0-100), sourced from the actual quiz/exam config (e.g.
 *   `quizRegistry[testId].passingScore * 100`) — never a flat site-wide
 *   guess. Pass `null` if genuinely unknown for this product/exam; the
 *   function then describes accuracy without claiming a threshold
 *   comparison it can't support.
 */
export function computeReadiness(
  stats: DashboardStats,
  weakTopics: WeakTopic[],
  strongTopics: WeakTopic[] = [],
  hasMockExam = true,
  officialPassingPct: number | null = null
): ReadinessResult {
  const topicsMastered = strongTopics.length;
  const totalTopics    = weakTopics.length + strongTopics.length;

  if (stats.sessions.length === 0) {
    return {
      score: 0, confidence: 'no_data', label: 'Not Started', color: '#94a3b8',
      description: 'Complete your first practice test to see your practice accuracy.',
      trend: 'unknown', trendLabel: '',
      topicsMastered, totalTopics,
      officialPassingPct,
      nextStep: 'Take your first practice test.',
    };
  }

  const allTracked = [...weakTopics, ...strongTopics];
  let score: number;
  if (allTracked.length >= 3) {
    score = Math.round(
      allTracked.reduce((sum, t) => sum + Number(t.accuracy_pct), 0) / allTracked.length
    );
  } else {
    score = stats.avgPct;
  }

  let trend: ReadinessResult['trend'] = 'unknown';
  let trendLabel = '';

  if (stats.sessions.length >= 4) {
    const recent = stats.sessions.slice(0, 3);
    const recentAvg =
      recent.reduce((sum, s) =>
        sum + (s.total_questions > 0 ? ((s.score ?? 0) / s.total_questions) * 100 : 0), 0
      ) / recent.length;
    const diff = recentAvg - stats.avgPct;
    if (diff > 3)       { trend = 'up';     trendLabel = `↑ +${Math.round(diff)}% recently`; }
    else if (diff < -3) { trend = 'down';   trendLabel = `↓ ${Math.round(Math.abs(diff))}% recently`; }
    else                { trend = 'stable'; trendLabel = '→ Holding steady'; }
  }

  score = Math.max(0, Math.min(100, score));

  const confidence: ConfidenceLevel =
    officialPassingPct !== null
      ? (score >= officialPassingPct ? 'above_threshold'
        : score >= officialPassingPct - 15 ? 'near_threshold'
        : score >= 50 ? 'building_evidence'
        : 'needs_practice')
      : (score >= 80 ? 'above_threshold'
        : score >= 65 ? 'near_threshold'
        : score >= 50 ? 'building_evidence'
        : 'needs_practice');

  const CONFIG: Record<ConfidenceLevel, { label: string; color: string; description: string }> = {
    above_threshold:   { label: 'At or Above Passing Threshold', color: '#16a34a', description: officialPassingPct !== null ? `Your recent practice accuracy is at or above the official passing threshold (${officialPassingPct}%). Keep a session scheduled to stay sharp.` : "Your recent practice accuracy is strong. Keep a session scheduled to stay sharp." },
    near_threshold:    { label: 'Near Passing Threshold',        color: '#1a7f3c', description: officialPassingPct !== null ? `You're close to the official passing threshold (${officialPassingPct}%). A few more focused sessions on your weak topics will help.` : "You're close. A few more focused sessions on your weak topics will help." },
    building_evidence: { label: 'Building Evidence',             color: '#d97706', description: 'Keep practicing — you’re building a track record across topics.' },
    needs_practice:    { label: 'Needs More Practice',           color: '#b91c1c', description: 'Focus on your weakest topics first — that’s the fastest way to improve.' },
    no_data:           { label: 'Not Started',                   color: '#94a3b8', description: 'Complete your first practice test to see your practice accuracy.' },
  };

  const { label, color, description } = CONFIG[confidence];

  let nextStep: string;
  if (confidence === 'above_threshold') {
    nextStep = hasMockExam
      ? 'Take a timed Mock Exam to check your performance under real conditions.'
      : 'Take another full practice test to check your performance under real conditions.';
  } else if (weakTopics.length > 0) {
    const worst = weakTopics[0];
    const name  = getCategoryLabel(worst.category_slug);
    nextStep = `Practice ${name} — your weakest area at ${Math.round(Number(worst.accuracy_pct))}%.`;
  } else if (totalTopics === 0) {
    nextStep = 'Complete a practice test to generate personalized recommendations.';
  } else {
    nextStep = 'Take a practice test to build your data across more topics.';
  }

  return { score, confidence, label, color, description, trend, trendLabel, topicsMastered, totalTopics, officialPassingPct, nextStep };
}

// ─── Weekly activity ──────────────────────────────────────────────────────────

export interface DayActivity {
  date:      string;
  isoDate:   string;
  questions: number;
  sessions:  number;
}

export function computeWeeklyActivity(sessions: DashboardStats['sessions']): DayActivity[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const isoDate = d.toISOString().slice(0, 10);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const daySessions = sessions.filter(s => s.started_at?.startsWith(isoDate));
    return {
      date:      dayName,
      isoDate,
      questions: daySessions.reduce((sum, s) => sum + (s.total_questions ?? 0), 0),
      sessions:  daySessions.length,
    };
  });
}

// ─── Category labels ──────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<string, string> = {
  // CA DMV
  traffic_signs:               'Traffic Signs',
  right_of_way:                'Right of Way',
  speed_limits:                'Speed Limits',
  alcohol_and_drugs:           'Alcohol & Drugs',
  parking:                     'Parking Rules',
  sharing_the_road:            'Sharing the Road',
  safe_driving:                'Safe Driving',
  road_markings:               'Road Markings',
  vehicle_equipment:           'Vehicle Equipment',
  getting_license:             'Getting Your License',
  penalties_and_responsibility:'Penalties & Responsibility',
  insurance_and_liability:     'Insurance & Liability',
  emergency_procedures:        'Emergency Procedures',
  driving_in_california:       'Driving in California',
  intersections:               'Intersections',
  freeway_driving:             'Freeway Driving',
  lane_usage:                  'Lane Usage',
  turning:                     'Turning',
  passing:                     'Passing',
  backing_and_turning:         'Backing & Turning',
  night_driving:               'Night Driving',
  weather_driving:             'Weather Conditions',
  // Motorcycle
  motorcycle_technique:        'Riding Technique',
  motorcycle_gear:             'Protective Gear',
  motorcycle_cornering:        'Cornering & Control',
  motorcycle_hazards:          'Hazard Awareness',
  motorcycle_laws:             'Motorcycle Laws',
  motorcycle_licensing:        'Licensing Rules',
  motorcycle_maintenance:      'Bike Maintenance',
  freeway_riding:              'Freeway Riding',
  special_riding_conditions:   'Special Conditions',
  touring:                     'Touring',
  // TX DMV
  traffic_signals:             'Traffic Signals',
  alcohol_drugs:               'Alcohol & Drugs',
  licensing:                   'Licensing',
  insurance_finance:           'Insurance & Finances',
  distracted_driving:          'Distracted Driving',
  vehicle_safety:              'Vehicle Safety',
  turning_and_lanes:           'Turning & Lanes',
  pedestrians_cyclists:        'Pedestrians & Cyclists',
  highway_driving:             'Highway Driving',
  road_signs:                  'Road Signs',
  // MI / MO / TN / VA / WA DMV
  road_rules:                  'Road Rules',
  traffic_controls:            'Traffic Signals & Controls',
  safety:                      'Safe Driving',
  sharing_road:                'Sharing the Road',
  fines_penalties:             'Fines & Penalties',
  emergencies:                 'Emergency Procedures',
  dwi_penalties:               'DWI/DUI Penalties',
  dwi_law:                     'DWI/DUI Law',
  permit_requirements:         'Permit Requirements',
  gdl:                         'Graduated License (GDL)',
  child_restraints:            'Child Restraints',
  regulatory_signs:            'Regulatory Signs',
  warning_signs:               'Warning Signs',
  guide_signs:                 'Guide Signs',
  service_signs:               'Service Signs',
  construction_signs:          'Construction Signs',
  crashes_emergencies:         'Crashes & Emergencies',
  bac_limits:                  'BAC Limits',
  headlights:                  'Headlights',
  seat_belts:                  'Seat Belts',
  school_buses:                'School Buses',
  school_zones:                'School Zones',
  move_over:                   'Move Over Law',
  open_container:              'Open Container Law',
  railroad_crossings:          'Railroad Crossings',
  reckless_driving:            'Reckless Driving',
  residential_speed:           'Residential Speed',
  rural_speed:                 'Rural Speed',
  freeway_speed:               'Freeway Speed',
  stop_signs:                  'Stop Signs',
  turn_signals:                'Turn Signals',
  work_zones:                  'Work Zones',
  implied_consent:             'Implied Consent',
  driver_fitness:              'Driver Fitness',
  points_system:               'Points System',
  insurance:                   'Insurance',
  // TX Motorcycle
  protective_gear:             'Protective Gear',
  pre_ride:                    'Pre-Ride Inspection',
  riding_skills:               'Riding Skills',
  lane_positioning:            'Lane Positioning',
  group_riding:                'Group Riding',
  visibility:                  'Visibility',
  road_hazards:                'Road Hazards',
  weather:                     'Weather Riding',
  passengers:                  'Passengers & Cargo',
  traffic_laws:                'Traffic Laws',
  night_riding:                'Night Riding',
  highway_riding:              'Highway Riding',
  // CDL
  cdl_pre_trip:                'Pre-Trip Inspection',
  cdl_cargo:                   'Cargo Handling',
  cdl_braking:                 'Braking Systems',
  cdl_hours_of_service:        'Hours of Service',
  cdl_hazmat_classes:          'HazMat Classes',
  cdl_hazmat_safety:           'HazMat Safety',
  cdl_tanker:                  'Tanker Vehicles',
  cdl_doubles_triples:         'Doubles & Triples',
  cdl_passenger:               'Passenger Vehicles',
  cdl_school_bus:              'School Bus',
  cdl_air_brakes:              'Air Brakes',
  cdl_general_knowledge:       'General Knowledge',
  cdl_vehicle_inspection:      'Vehicle Inspection',
  cdl_basic_vehicle_control:   'Basic Vehicle Control',
  cdl_shifting:                'Shifting & Backing',
  cdl_coupling:                'Coupling & Uncoupling',
  cdl_pre_trip_inspection:     'Pre-Trip Inspection',
};

export function getCategoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ??
    slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
