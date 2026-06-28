"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const STATES = [
  { abbr: 'CA', name: 'California', available: true },
  { abbr: 'TX', name: 'Texas', available: false },
  { abbr: 'FL', name: 'Florida', available: false },
  { abbr: 'NY', name: 'New York', available: false },
  { abbr: 'PA', name: 'Pennsylvania', available: false },
  { abbr: 'IL', name: 'Illinois', available: false },
];

const LICENSE_TYPES = [
  {
    id: 'permit',
    label: "Driver's Permit",
    description: 'First-time driver studying for the written knowledge test',
    icon: '🚗',
  },
  {
    id: 'motorcycle',
    label: 'Motorcycle License',
    description: 'Adding a motorcycle endorsement or getting a first moto license',
    icon: '🏍️',
  },
  {
    id: 'cdl_general',
    label: 'Commercial (CDL)',
    description: "Commercial driver's license — general knowledge and endorsements",
    icon: '🚛',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleFinish() {
    if (!selectedState || !selectedLicense) return;
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('profiles') as any).upsert({
      id:             user.id,
      target_state:   selectedState,
      target_license: selectedLicense,
      exam_date:      examDate || null,
      updated_at:     new Date().toISOString(),
    });

    router.push('/dashboard?welcome=1');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="CAREDMVPrep" width={200} height={80} style={{ height: '52px', width: 'auto' }} />
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: s <= step ? '#1a7f3c' : '#e5e7eb',
                  color: s <= step ? '#fff' : '#9ca3af',
                }}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 3 && (
                <div className="flex-1 h-0.5 rounded" style={{ backgroundColor: s < step ? '#1a7f3c' : '#e5e7eb' }} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* Step 1: State */}
          {step === 1 && (
            <div>
              <h1 className="text-xl font-bold mb-1" style={{ color: '#0f1e3c' }}>
                Which state are you in?
              </h1>
              <p className="text-sm text-gray-500 mb-6">We'll show you questions tailored to your state's DMV handbook.</p>
              <div className="grid grid-cols-2 gap-3">
                {STATES.map((s) => (
                  <button
                    key={s.abbr}
                    disabled={!s.available}
                    onClick={() => setSelectedState(s.abbr)}
                    className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition ${
                      !s.available
                        ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                        : selectedState === s.abbr
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                      {!s.available && (
                        <p className="text-xs text-gray-400">Coming soon</p>
                      )}
                    </div>
                    {selectedState === s.abbr && (
                      <span className="absolute top-2 right-2 text-green-600 text-xs font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedState}
                onClick={() => setStep(2)}
                className="mt-6 w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1a7f3c' }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: License type */}
          {step === 2 && (
            <div>
              <h1 className="text-xl font-bold mb-1" style={{ color: '#0f1e3c' }}>
                What are you studying for?
              </h1>
              <p className="text-sm text-gray-500 mb-6">Choose the license type you're preparing for.</p>
              <div className="space-y-3">
                {LICENSE_TYPES.map((lt) => (
                  <button
                    key={lt.id}
                    onClick={() => setSelectedLicense(lt.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border text-left transition ${
                      selectedLicense === lt.id
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{lt.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{lt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{lt.description}</p>
                    </div>
                    {selectedLicense === lt.id && (
                      <span className="ml-auto shrink-0 text-green-600 text-sm font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  disabled={!selectedLicense}
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#1a7f3c' }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Exam date */}
          {step === 3 && (
            <div>
              <h1 className="text-xl font-bold mb-1" style={{ color: '#0f1e3c' }}>
                When is your exam?
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                Optional — we'll show a countdown and customize your study plan if you set a date.
              </p>
              <input
                type="date"
                value={examDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-400">Leave blank if you haven't scheduled your test yet.</p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  disabled={loading}
                  onClick={handleFinish}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: '#1a7f3c' }}
                >
                  {loading ? 'Setting up…' : 'Go to Dashboard →'}
                </button>
              </div>
            </div>
          )}

        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          CAREDMVPrep.com is not affiliated with any government agency.
        </p>
      </div>
    </div>
  );
}
