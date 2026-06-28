// Analytics event helpers.
// All events are no-ops if PostHog is not initialized (no key set).
// Import and call these from client components.

import posthog from "posthog-js";
import type { SubscriptionProduct } from "@/types/database";

export function trackSignup(method: "email" = "email") {
  posthog.capture("signup_completed", { method });
}

export function trackQuizStarted(testId: string, questionCount: number) {
  posthog.capture("quiz_started", { test_id: testId, question_count: questionCount });
}

export function trackQuizCompleted(args: {
  testId:        string;
  scorePercent:  number;
  passed:        boolean;
  totalTimeMs:   number;
  isMockExam:    boolean;
}) {
  const event = args.isMockExam ? "mock_exam_completed" : "quiz_completed";
  posthog.capture(event, {
    test_id:       args.testId,
    score_percent: Math.round(args.scorePercent * 100),
    passed:        args.passed,
    duration_secs: Math.round(args.totalTimeMs / 1000),
  });
}

export function trackCheckoutStarted(product: SubscriptionProduct, interval: string) {
  posthog.capture("subscription_checkout_started", { product, interval });
}

export function trackWeakTopicPracticed(category: string, testId: string) {
  posthog.capture("weak_topic_practiced", { category, test_id: testId });
}

export function trackReviewCenterOpened() {
  posthog.capture("review_center_opened");
}

export function trackBookmarkAdded(questionId: string) {
  posthog.capture("bookmark_added", { question_id: questionId });
}
