import type { DashboardStats } from '@/lib/supabase/queries';
import type { WeakTopic } from '@/types/database';

export type ConfidenceLevel =
  | 'no_data'
  | 'needs_work'
  | 'getting_there'
  | 'almost_ready'
  | 'ready';

export interface ReadinessResult {
  score:            number;
  confidence:       ConfidenceLevel;
  label:            string;
  color:            string;       // hex for the score ring + label
  description:      string;       // one coaching sentence
  questionsToReady: number;       // rough estimate, 0 if already ready
  trend:            'up' | 'down' | 'stable' | 'unknown';
  trendLabel:       string;       // "+6% this week" or ""
}

// Score at which we consider a user exam-ready.
// Most DMV exams require 70–80% to pass; 85 gives a safety buffer.
export const PASSING_THRESHOLD = 85;

export function computeReadiness(
  stats: DashboardStats,
  weakTopics: WeakTopic[]
): ReadinessResult {
  if (stats.sessions.length === 0) {
    return {
      score: 0,
      confidence: 'no_data',
      label: 'Not Started',
      color: '#94a3b8',
      description: 'Complete your first practice test to see your readiness score.',
      questionsToReady: 0,
      trend: 'unknown',
      trendLabel: '',
    };
  }

  // Primary score: category-weighted average when we have breadth data.
  // Using category averages penalizes topic gaps more honestly than raw
  // session accuracy. Someone who aced 50 traffic-sign questions but
  // never touched alcohol/drugs won't appear "ready."
  let score: number;
  if (weakTopics.length >= 3) {
    score = Math.round(
      weakTopics.reduce((sum, t) => sum + Number(t.accuracy_pct), 0) / weakTopics.length
    );
  } else {
    // Not enough topic breadth yet — fall back to session accuracy
    score = stats.avgPct;
  }

  // Trend: compare last 3 sessions to overall average
  let trend: ReadinessResult['trend'] = 'unknown';
  let trendLabel = '';

  if (stats.sessions.length >= 4) {
    const recent = stats.sessions.slice(0, 3);
    const recentAvg =
      recent.reduce((sum, s) =>
        sum + (s.total_questions > 0 ? ((s.score ?? 0) / s.total_questions) * 100 : 0), 0
      ) / recent.length;

    const diff = recentAvg - stats.avgPct;
    if (diff > 3) {
      trend = 'up';
      trendLabel = `↑ +${Math.round(diff)}% recently`;
      score = Math.min(score + 2, 100); // small recency boost
    } else if (diff < -3) {
      trend = 'down';
      trendLabel = `↓ ${Math.round(Math.abs(diff))}% recently`;
    } else {
      trend = 'stable';
      trendLabel = '→ Holding steady';
    }
  }

  score = Math.max(0, Math.min(100, score));

  const confidence: ConfidenceLevel =
    score >= PASSING_THRESHOLD ? 'ready' :
    score >= 70               ? 'almost_ready' :
    score >= 50               ? 'getting_there' :
                                'needs_work';

  const CONFIG: Record<ConfidenceLevel, { label: string; color: string; description: string }> = {
    ready:         {
      label:       'Exam Ready',
      color:       '#16a34a',
      description: "You're consistently above passing thresholds. Keep a session scheduled.",
    },
    almost_ready:  {
      label:       'Almost Ready',
      color:       '#1a7f3c',
      description: "You're close. A few more focused sessions will push you over.",
    },
    getting_there: {
      label:       'Getting There',
      color:       '#d97706',
      description: 'Keep at it — consistent practice is the fastest path to ready.',
    },
    needs_work:    {
      label:       'Needs Work',
      color:       '#b91c1c',
      description: 'Focus on your weakest topics first — that raises your score the fastest.',
    },
    no_data:       {
      label:       'Not Started',
      color:       '#94a3b8',
      description: 'Complete your first practice test to see your readiness score.',
    },
  };

  const { label, color, description } = CONFIG[confidence];
  const questionsToReady =
    score >= PASSING_THRESHOLD ? 0 : Math.ceil((PASSING_THRESHOLD - score) / 5) * 10;

  return { score, confidence, label, color, description, questionsToReady, trend, trendLabel };
}

// ─── Weekly activity ──────────────────────────────────────────────────────────
// Computed from sessions array — no extra DB query.

export interface DayActivity {
  date:      string;   // 'Mon'
  isoDate:   string;   // '2026-06-20'
  questions: number;
  sessions:  number;
}

export function computeWeeklyActivity(
  sessions: DashboardStats['sessions']
): DayActivity[] {
  const today = new Date();

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const isoDate = d.toISOString().slice(0, 10);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

    // Timestamps stored in UTC; simple prefix comparison is consistent
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
  traffic_signs:        'Traffic Signs',
  right_of_way:         'Right of Way',
  speed_limits:         'Speed Limits',
  alcohol_and_drugs:    'Alcohol & Drugs',
  parking:              'Parking Rules',
  sharing_the_road:     'Sharing the Road',
  safe_driving:         'Safe Driving',
  road_markings:        'Road Markings',
  vehicle_equipment:    'Vehicle Equipment',
  cdl_pre_trip:         'CDL Pre-Trip',
  cdl_cargo:            'CDL Cargo',
  cdl_braking:          'CDL Braking',
  cdl_hours_of_service: 'Hours of Service',
  cdl_hazmat_classes:   'HazMat Classes',
  cdl_hazmat_safety:    'HazMat Safety',
  cdl_tanker:           'Tanker Vehicles',
  cdl_doubles_triples:  'Doubles & Triples',
  cdl_passenger:        'Passenger Vehicles',
  cdl_school_bus:       'School Bus',
  cdl_air_brakes:       'Air Brakes',
  motorcycle_technique: 'Riding Technique',
  motorcycle_gear:      'Protective Gear',
  motorcycle_cornering: 'Cornering & Control',
  motorcycle_hazards:   'Hazard Awareness',
};
