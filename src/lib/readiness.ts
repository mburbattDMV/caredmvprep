import type { DashboardStats } from '@/lib/supabase/queries';
import type { WeakTopic } from '@/types/database';

export type ConfidenceLevel =
  | 'no_data'
  | 'needs_work'
  | 'getting_there'
  | 'almost_ready'
  | 'ready';

export type TopicConfidence =
  | 'no_data'       // < 5 questions answered
  | 'preliminary'   // 5–9 questions
  | 'solid';        // 10+ questions

export interface ReadinessResult {
  score:            number;
  confidence:       ConfidenceLevel;
  label:            string;
  color:            string;
  description:      string;
  questionsToReady: number;
  trend:            'up' | 'down' | 'stable' | 'unknown';
  trendLabel:       string;
  topicsMastered:   number;
  totalTopics:      number;
  passProb:         number;
  nextStep:         string;
}

export const PASSING_THRESHOLD       = 85;
export const MASTERY_MIN_QUESTIONS   = 10;
export const MASTERY_MIN_ACCURACY    = 80;
export const TOPIC_MIN_DISPLAY       = 5;

export function topicConfidence(total: number): TopicConfidence {
  if (total < TOPIC_MIN_DISPLAY)     return 'no_data';
  if (total < MASTERY_MIN_QUESTIONS) return 'preliminary';
  return 'solid';
}

export function computeReadiness(
  stats: DashboardStats,
  weakTopics: WeakTopic[],
  strongTopics: WeakTopic[] = []
): ReadinessResult {
  const topicsMastered = strongTopics.length;
  const totalTopics    = weakTopics.length + strongTopics.length;

  if (stats.sessions.length === 0) {
    return {
      score: 0, confidence: 'no_data', label: 'Not Started', color: '#94a3b8',
      description: 'Complete your first practice test to see your readiness score.',
      questionsToReady: 0, trend: 'unknown', trendLabel: '',
      topicsMastered, totalTopics,
      passProb: 0,
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
    if (diff > 3)       { trend = 'up';     trendLabel = `↑ +${Math.round(diff)}% recently`;          score = Math.min(score + 2, 100); }
    else if (diff < -3) { trend = 'down';   trendLabel = `↓ ${Math.round(Math.abs(diff))}% recently`; }
    else                { trend = 'stable'; trendLabel = '→ Holding steady'; }
  }

  score = Math.max(0, Math.min(100, score));

  const confidence: ConfidenceLevel =
    score >= PASSING_THRESHOLD ? 'ready' :
    score >= 70               ? 'almost_ready' :
    score >= 50               ? 'getting_there' : 'needs_work';

  const CONFIG: Record<ConfidenceLevel, { label: string; color: string; description: string }> = {
    ready:         { label: 'Exam Ready',    color: '#16a34a', description: "You're consistently above passing thresholds. Keep a session scheduled." },
    almost_ready:  { label: 'Almost Ready',  color: '#1a7f3c', description: "You're close. A few more focused sessions will push you over." },
    getting_there: { label: 'Getting There', color: '#d97706', description: 'Keep at it — consistent practice is the fastest path to ready.' },
    needs_work:    { label: 'Needs Work',    color: '#b91c1c', description: 'Focus on your weakest topics first — that raises your score the fastest.' },
    no_data:       { label: 'Not Started',   color: '#94a3b8', description: 'Complete your first practice test to see your readiness score.' },
  };

  const { label, color, description } = CONFIG[confidence];
  const questionsToReady = score >= PASSING_THRESHOLD ? 0 : Math.ceil((PASSING_THRESHOLD - score) / 5) * 10;

  const coverageBonus = totalTopics >= 8 ? 5 : totalTopics >= 5 ? 2 : 0;
  const masteryBonus  = topicsMastered >= 5 ? 3 : 0;
  const passProb      = Math.min(97, Math.max(0, score + coverageBonus + masteryBonus));

  let nextStep: string;
  if (confidence === 'ready') {
    nextStep = 'Take the California Permit Mock Exam to confirm readiness.';
  } else if (weakTopics.length > 0) {
    const worst = weakTopics[0];
    const name  = getCategoryLabel(worst.category_slug);
    nextStep = `Practice ${name} — your weakest area at ${Math.round(Number(worst.accuracy_pct))}%.`;
  } else if (totalTopics === 0) {
    nextStep = 'Complete a practice test to generate personalized recommendations.';
  } else {
    nextStep = 'Take a practice test to build your data across more topics.';
  }

  return { score, confidence, label, color, description, questionsToReady, trend, trendLabel, topicsMastered, totalTopics, passProb, nextStep };
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
