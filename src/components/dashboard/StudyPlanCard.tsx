"use client";

import type { StudyPlan } from '@/types/database';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  plan:          StudyPlan | null;
  userId:        string;
  weakTopicCount: number;
}

function daysUntil(isoDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(isoDate);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function urgencyColor(days: number): string {
  if (days <= 7)  return '#b91c1c';
  if (days <= 21) return '#d97706';
  return '#1a7f3c';
}

export default function StudyPlanCard({ plan, userId, weakTopicCount }: Props) {
  const [editing, setEditing]   = useState(false);
  const [date, setDate]         = useState(plan?.exam_date?.slice(0, 10) ?? '');
  const [saving, setSaving]     = useState(false);
  const router = useRouter();

  async function saveDate() {
    if (!date) return;
    setSaving(true);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('study_plans') as any).upsert(
      { user_id: userId, license_type: 'permit', exam_date: date, daily_goal_mins: 20 },
      { onConflict: 'user_id,license_type' }
    );
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  async function clearDate() {
    if (!plan) return;
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('study_plans') as any)
      .update({ exam_date: null })
      .eq('user_id', userId);
    setDate('');
    router.refresh();
  }

  const examDate = plan?.exam_date?.slice(0, 10);
  const days     = examDate ? daysUntil(examDate) : null;
  const color    = days != null ? urgencyColor(days) : '#1a7f3c';

  // Daily goal: if exam date set, spread weak topics across remaining days (floor 10)
  const dailyGoal = (days != null && days > 0 && weakTopicCount > 0)
    ? Math.max(10, Math.ceil((weakTopicCount * 15) / days))
    : (plan?.daily_goal_mins ?? 20);

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Study Plan
      </p>

      {examDate && days != null && !editing ? (
        <div>
          {days > 0 ? (
            <>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold" style={{ color }}>
                  {days}
                </span>
                <span className="text-sm text-gray-500">days until your exam</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                {new Date(examDate).toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                })}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Daily goal</span>
                  <span className="font-semibold text-gray-800">{dailyGoal} questions/day</span>
                </div>
                {weakTopicCount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Topics to improve</span>
                    <span className="font-semibold text-gray-800">{weakTopicCount}</span>
                  </div>
                )}
              </div>

              {days <= 3 && (
                <div
                  className="text-xs rounded-lg p-3 mb-3"
                  style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}
                >
                  Exam is in {days} day{days > 1 ? 's' : ''}. Focus on your strongest areas and stay calm.
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500 mb-4">Your exam date has passed. Update it to restart your plan.</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            >
              Change date
            </button>
            <button
              onClick={clearDate}
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div>
          {!editing ? (
            <>
              <p className="text-xs text-gray-500 mb-4 leading-snug">
                Set your exam date and we&apos;ll calculate a daily study goal based on your weak topics.
              </p>
              <button
                onClick={() => setEditing(true)}
                className="w-full py-2.5 text-xs font-bold rounded-lg text-white transition hover:opacity-90"
                style={{ backgroundColor: '#0f1e3c' }}
              >
                Set Exam Date →
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <label className="block">
                <span className="text-xs font-semibold text-gray-600 block mb-1.5">
                  When is your exam?
                </span>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#1a7f3c' } as React.CSSProperties}
                />
              </label>
              <div className="flex gap-2">
                <button
                  onClick={saveDate}
                  disabled={!date || saving}
                  className="flex-1 py-2 text-xs font-bold rounded-lg text-white transition hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#1a7f3c' }}
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
