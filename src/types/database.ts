// ================================================================
// Database types — matches supabase/migrations/ after 002 is applied.
// Regenerate via: npx supabase gen types typescript --project-id <id>
// ================================================================

// ─── ENUMS ───────────────────────────────────────────────────────────────────

export type QuestionStatus     = 'draft' | 'review' | 'approved' | 'deprecated';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type SubscriptionProduct =
  | 'dmv'
  | 'motorcycle'
  | 'cdl'
  | 'cdl_hazmat'
  | 'cdl_tanker'
  | 'cdl_doubles_triples'
  | 'cdl_school_bus'    // standalone product — separate licensing path
  | 'cdl_passenger';    // standalone product — separate licensing path
export type SubscriptionInterval = 'monthly' | 'annual';
export type SubscriptionStatus   = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
export type AdminRole            = 'admin' | 'content_editor' | 'moderator';

// Legacy alias kept for TypeScript question bank compatibility
export type LicenseType =
  | 'permit'
  | 'motorcycle'
  | 'cdl_general'
  | 'cdl_hazmat'
  | 'cdl_passenger'
  | 'cdl_school_bus'
  | 'cdl_air_brakes'
  | 'cdl_tanker'
  | 'cdl_doubles_triples'
  | 'cdl_combination';

// ─── ROW TYPES ───────────────────────────────────────────────────────────────

export interface State {
  abbr: string;    // CHAR(2): 'CA'
  name: string;
  slug: string;    // 'california'
}

export interface Category {
  id:         string;
  slug:       string;
  label:      string;
  sort_order: number;
}

export interface Subcategory {
  id:          string;
  category_id: string;
  slug:        string;
  label:       string;
  sort_order:  number;
}

export interface Profile {
  id:              string;
  display_name:    string | null;
  avatar_url:      string | null;
  target_state:    string | null;   // CHAR(2) state abbr
  target_license:  string | null;   // LicenseType slug
  exam_date:       string | null;   // ISO date
  streak_current:  number;
  streak_best:     number;
  streak_updated:  string | null;   // ISO date
  created_at:      string;
  updated_at:      string;
}

export interface SubscriptionPlan {
  id:              string;
  product:         SubscriptionProduct;
  interval:        SubscriptionInterval;
  price_cents:     number;
  stripe_price_id: string | null;
  label:           string;
  active:          boolean;
}

export interface Subscription {
  id:                          string;
  user_id:                     string;
  plan_id:                     string;
  product:                     SubscriptionProduct;
  stripe_customer_id:          string | null;
  stripe_subscription_id:      string | null;
  stripe_subscription_item_id: string | null;
  status:                      SubscriptionStatus;
  current_period_start:        string | null;
  current_period_end:          string | null;
  cancel_at_period_end:        boolean;
  canceled_at:                 string | null;
  trial_end:                   string | null;
  created_at:                  string;
  updated_at:                  string;
}

export interface Question {
  id:               string;
  state_abbr:       string | null;   // NULL = federal/CDL
  license_type:     string;
  category_id:      string;
  subcategory_id:   string | null;
  prompt:           string;
  options:          string[];        // JSONB ["A","B","C","D"]
  correct_index:    number;
  explanation:      string;
  image_url:        string | null;
  status:           QuestionStatus;
  difficulty:       QuestionDifficulty;
  handbook_section: string | null;
  source_notes:     string | null;
  verified_at:      string | null;
  verified_by:      string | null;
  report_count:     number;
  times_seen:       number;
  times_correct:    number;
  created_by:       string | null;
  created_at:       string;
  updated_at:       string;
}

export interface QuizSession {
  id:              string;
  user_id:         string;
  test_id:         string;
  state:           string;
  license_type:    string;
  total_questions: number;
  score:           number | null;
  passed:          boolean | null;
  time_limit_secs: number | null;
  started_at:      string;
  completed_at:    string | null;
}

export interface UserAnswer {
  id:             string;
  session_id:     string;
  user_id:        string | null;
  question_id:    string;
  selected_index: number;
  correct_index:  number;
  is_correct:     boolean;
  category:       string;
  time_spent_ms:  number | null;
  created_at:     string;
}

export interface Bookmark {
  id:          string;
  user_id:     string;
  question_id: string;
  note:        string | null;
  created_at:  string;
}

export interface StudySession {
  id:            string;
  user_id:       string;
  license_type:  string | null;
  state_abbr:    string | null;
  started_at:    string;
  ended_at:      string | null;
  duration_secs: number | null;
}

export interface WeakTopic {
  user_id:       string;
  category_slug: string;
  license_type:  string;
  correct:       number;
  total:         number;
  accuracy_pct:  number;   // GENERATED ALWAYS AS
  last_seen_at:  string | null;
  updated_at:    string;
}

export interface FlashcardDeck {
  id:           string;
  user_id:      string;
  name:         string;
  license_type: string | null;
  state_abbr:   string | null;
  created_at:   string;
  updated_at:   string;
}

export interface Flashcard {
  id:            string;
  deck_id:       string;
  question_id:   string | null;
  front:         string;
  back:          string;
  ease_factor:   number;
  interval_days: number;
  repetitions:   number;
  next_review:   string;   // ISO date
  created_at:    string;
  updated_at:    string;
}

export interface StudyPlan {
  id:              string;
  user_id:         string;
  license_type:    string;
  state_abbr:      string | null;
  exam_date:       string | null;
  daily_goal_mins: number;
  created_at:      string;
}

export interface UserRole {
  user_id:    string;
  role:       AdminRole;
  granted_at: string;
  granted_by: string | null;
}

// ─── SUPABASE DATABASE TYPE ───────────────────────────────────────────────────

type TableDef<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      states:             TableDef<State,            Omit<State, never>>;
      categories:         TableDef<Category,         Omit<Category, 'id'>>;
      subcategories:      TableDef<Subcategory,       Omit<Subcategory, 'id'>>;
      profiles:           TableDef<Profile,           Omit<Profile, 'created_at' | 'updated_at'>>;
      subscription_plans: TableDef<SubscriptionPlan,  Omit<SubscriptionPlan, 'id'>>;
      subscriptions:      TableDef<Subscription,      Omit<Subscription, 'id' | 'created_at' | 'updated_at'>>;
      questions:          TableDef<Question,           Omit<Question, 'id' | 'created_at' | 'updated_at'>>;
      // started_at has DEFAULT now() — omit from required Insert but allow explicit override
      quiz_sessions:      TableDef<QuizSession, Omit<QuizSession, 'id'> & { started_at?: string }>;
      user_answers:       TableDef<UserAnswer,         Omit<UserAnswer, 'id' | 'created_at'>>;
      bookmarks:          TableDef<Bookmark,           Omit<Bookmark, 'id' | 'created_at'>>;
      study_sessions:     TableDef<StudySession,       Omit<StudySession, 'id' | 'started_at'>>;
      weak_topics:        TableDef<WeakTopic,          Omit<WeakTopic, 'accuracy_pct' | 'updated_at'>>;
      flashcard_decks:    TableDef<FlashcardDeck,      Omit<FlashcardDeck, 'id' | 'created_at' | 'updated_at'>>;
      flashcards:         TableDef<Flashcard,          Omit<Flashcard, 'id' | 'created_at' | 'updated_at'>>;
      study_plans:        TableDef<StudyPlan,          Omit<StudyPlan, 'id' | 'created_at'>>;
      user_roles:         TableDef<UserRole,           Omit<UserRole, 'granted_at'>>;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin:              { Args: { uid?: string }; Returns: boolean };
      user_active_products:  { Args: { uid?: string }; Returns: string[] };
      refresh_weak_topics:   { Args: { p_user_id: string }; Returns: void };
      update_streak:         { Args: { p_user_id: string }; Returns: void };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
