import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import type { Question } from '@/data/questions/schema';

// Raw bank imports — NOT filtered to verified-only
import caDmvQuestions                from '@/data/questions/dmv/california';
import caMotoQuestions               from '@/data/questions/motorcycle/california';
import cdlFederalQuestions           from '@/data/questions/cdl/federal';
import cdlSchoolBusQuestions         from '@/data/questions/cdl/school-bus';
import cdlTankVehicleQuestions       from '@/data/questions/cdl/tank-vehicles';
import cdlAirBrakesQuestions         from '@/data/questions/cdl/air-brakes';
import cdlCombinationVehicleQuestions from '@/data/questions/cdl/combination-vehicles';
import cdlHazmatQuestions            from '@/data/questions/cdl/hazmat';
import cdlDoublesTriplesQuestions    from '@/data/questions/cdl/doubles-triples';
import cdlPassengerQuestions         from '@/data/questions/cdl/passenger';

export const metadata: Metadata = {
  title: 'Question Coverage Dashboard | Admin',
  robots: { index: false, follow: false },
};

// ── Bank definitions ──────────────────────────────────────────────────────────
// target: how many questions this bank should have when fully built
// realTestQ: how many questions the real test draws from our bank
interface BankDef {
  id:         string;
  label:      string;
  product:    string;
  state:      string;
  target:     number;
  realTestQ:  number;
  passPct:    string;
  questions:  Question[];
}

const BANKS: BankDef[] = [
  // ── California ──────────────────────────────────────────────────────────
  {
    id:        'california-permit',
    label:     'CA DMV Permit Test',
    product:   'DMV',
    state:     'California',
    target:    200,
    realTestQ: 46,
    passPct:   '80% (37/46)',
    questions: caDmvQuestions,
  },
  {
    id:        'california-motorcycle',
    label:     'CA Motorcycle Test',
    product:   'Motorcycle',
    state:     'California',
    target:    150,
    realTestQ: 30,
    passPct:   '80% (24/30)',
    questions: caMotoQuestions,
  },
  {
    id:        'california-cdl-general',
    label:     'CDL General Knowledge',
    product:   'CDL',
    state:     'Federal',
    target:    250,
    realTestQ: 50,
    passPct:   '80% (40/50)',
    questions: cdlFederalQuestions,
  },
  // ── CDL Endorsements ────────────────────────────────────────────────────
  {
    id:        'cdl-air-brakes',
    label:     'CDL Air Brakes',
    product:   'CDL',
    state:     'Federal',
    target:    60,
    realTestQ: 25,
    passPct:   '80% (20/25)',
    questions: cdlAirBrakesQuestions,
  },
  {
    id:        'cdl-combination-vehicles',
    label:     'CDL Combination Vehicles',
    product:   'CDL',
    state:     'Federal',
    target:    60,
    realTestQ: 20,
    passPct:   '80% (16/20)',
    questions: cdlCombinationVehicleQuestions,
  },
  {
    id:        'cdl-hazmat',
    label:     'CDL HazMat (H)',
    product:   'CDL',
    state:     'Federal',
    target:    80,
    realTestQ: 30,
    passPct:   '80% (24/30)',
    questions: cdlHazmatQuestions,
  },
  {
    id:        'cdl-doubles-triples',
    label:     'CDL Doubles & Triples (T)',
    product:   'CDL',
    state:     'Federal',
    target:    60,
    realTestQ: 20,
    passPct:   '80% (16/20)',
    questions: cdlDoublesTriplesQuestions,
  },
  {
    id:        'cdl-passenger',
    label:     'CDL Passenger (P)',
    product:   'CDL',
    state:     'Federal',
    target:    60,
    realTestQ: 20,
    passPct:   '80% (16/20)',
    questions: cdlPassengerQuestions,
  },
  {
    id:        'cdl-tank-vehicles',
    label:     'CDL Tank Vehicles (N)',
    product:   'CDL',
    state:     'Federal',
    target:    60,
    realTestQ: 20,
    passPct:   '80% (16/20)',
    questions: cdlTankVehicleQuestions,
  },
  {
    id:        'cdl-school-bus',
    label:     'CDL School Bus (S)',
    product:   'CDL',
    state:     'Federal',
    target:    60,
    realTestQ: 20,
    passPct:   '80% (16/20)',
    questions: cdlSchoolBusQuestions,
  },
];

// ── Stats computation ─────────────────────────────────────────────────────────

interface BankStats {
  def:          BankDef;
  total:        number;
  verified:     number;
  draft:        number;
  needsReview:  number;
  retired:      number;
  coveragePct:  number;
  missingSource: number;   // sourceSection missing page number
  dupFingerprints: number; // fingerprint collisions within this bank
}

function computeStats(def: BankDef): BankStats {
  const qs = def.questions;
  const counts = { verified: 0, draft: 0, needs_review: 0, retired: 0 };
  let missingSource = 0;
  const seen = new Map<string, number>();

  for (const q of qs) {
    counts[q.status as keyof typeof counts]++;
    // Missing page reference in sourceSection
    if (!q.sourceSection.match(/p\.\s*[\d]/)) missingSource++;
    // Fingerprint collision detection
    seen.set(q.fingerprint, (seen.get(q.fingerprint) ?? 0) + 1);
  }

  const dupFingerprints = [...seen.values()].filter(n => n > 1).length;

  return {
    def,
    total:        qs.length,
    verified:     counts.verified,
    draft:        counts.draft,
    needsReview:  counts.needs_review,
    retired:      counts.retired,
    coveragePct:  def.target > 0 ? Math.round((counts.verified / def.target) * 100) : 0,
    missingSource,
    dupFingerprints,
  };
}

// ── Coverage bar ──────────────────────────────────────────────────────────────

function CoverageBar({ pct }: { pct: number }) {
  const color =
    pct >= 80 ? '#22c55e' :   // green
    pct >= 50 ? '#f59e0b' :   // amber
    '#ef4444';                  // red
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 120, height: 10, background: '#e5e7eb', borderRadius: 5, overflow: 'hidden',
      }}>
        <div style={{
          width: `${Math.min(pct, 100)}%`, height: '100%',
          background: color, borderRadius: 5,
        }} />
      </div>
      <span style={{ fontSize: 13, color, fontWeight: 600 }}>{pct}%</span>
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

function Badge({ n, color, label }: { n: number; color: string; label: string }) {
  if (n === 0) return <span style={{ color: '#9ca3af', fontSize: 12 }}>—</span>;
  return (
    <span style={{
      display: 'inline-block', padding: '1px 6px', borderRadius: 10,
      background: color + '20', color, fontSize: 12, fontWeight: 600,
    }}>
      {n} {label}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CoverageDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: isAdmin, error } = await supabase.rpc('is_admin');
  if (error || !isAdmin) redirect('/');

  const stats = BANKS.map(computeStats);

  const totalVerified  = stats.reduce((s, b) => s + b.verified, 0);
  const totalQuestions = stats.reduce((s, b) => s + b.total, 0);
  const totalTarget    = stats.reduce((s, b) => s + b.def.target, 0);
  const overallPct     = totalTarget > 0 ? Math.round((totalVerified / totalTarget) * 100) : 0;
  const totalWarnings  = stats.reduce((s, b) => s + b.missingSource + b.dupFingerprints, 0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Question Coverage Dashboard</h1>
        <p style={{ color: '#6b7280', marginTop: 4, fontSize: 14 }}>
          Admin · Internal only · <code style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: 3 }}>not indexed</code>
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total verified', value: totalVerified, color: '#22c55e' },
          { label: 'Total questions', value: totalQuestions, color: '#3b82f6' },
          { label: 'Target questions', value: totalTarget, color: '#6b7280' },
          { label: 'Overall coverage', value: `${overallPct}%`, color: overallPct >= 80 ? '#22c55e' : '#f59e0b' },
        ].map(c => (
          <div key={c.label} style={{
            background: '#f9fafb', border: '1px solid #e5e7eb',
            borderRadius: 8, padding: '16px 20px',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {totalWarnings > 0 && (
        <div style={{
          background: '#fffbeb', border: '1px solid #fcd34d',
          borderRadius: 8, padding: '12px 16px', marginBottom: 24,
          fontSize: 14, color: '#92400e',
        }}>
          ⚠️ <strong>{totalWarnings}</strong> warnings across all banks (missing source pages or duplicate fingerprints)
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
              {['Bank', 'State', 'Verified', 'Target', 'Coverage', 'Draft', 'Needs Review', 'Retired', 'Missing Src', 'Dup FP', 'Real Test'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((s, i) => (
              <tr key={s.def.id} style={{
                borderBottom: '1px solid #e5e7eb',
                background: i % 2 === 0 ? '#fff' : '#fafafa',
              }}>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{s.def.label}</td>
                <td style={{ padding: '10px 12px', color: '#6b7280' }}>{s.def.state}</td>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1f2937' }}>{s.verified}</td>
                <td style={{ padding: '10px 12px', color: '#6b7280' }}>{s.def.target}</td>
                <td style={{ padding: '10px 12px' }}><CoverageBar pct={s.coveragePct} /></td>
                <td style={{ padding: '10px 12px' }}>
                  <Badge n={s.draft} color="#6b7280" label="draft" />
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <Badge n={s.needsReview} color="#f59e0b" label="review" />
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <Badge n={s.retired} color="#9ca3af" label="retired" />
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <Badge n={s.missingSource} color="#ef4444" label="warn" />
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <Badge n={s.dupFingerprints} color="#ef4444" label="dup" />
                </td>
                <td style={{ padding: '10px 12px', color: '#6b7280', fontSize: 12 }}>{s.def.passPct}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: '#f3f4f6', fontWeight: 700 }}>
              <td style={{ padding: '10px 12px' }}>TOTAL</td>
              <td style={{ padding: '10px 12px' }} />
              <td style={{ padding: '10px 12px' }}>{totalVerified}</td>
              <td style={{ padding: '10px 12px' }}>{totalTarget}</td>
              <td style={{ padding: '10px 12px' }}><CoverageBar pct={overallPct} /></td>
              <td style={{ padding: '10px 12px' }}>{stats.reduce((s, b) => s + b.draft, 0)}</td>
              <td style={{ padding: '10px 12px' }}>{stats.reduce((s, b) => s + b.needsReview, 0)}</td>
              <td style={{ padding: '10px 12px' }}>{stats.reduce((s, b) => s + b.retired, 0)}</td>
              <td style={{ padding: '10px 12px', color: '#ef4444' }}>{stats.reduce((s, b) => s + b.missingSource, 0)}</td>
              <td style={{ padding: '10px 12px', color: '#ef4444' }}>{stats.reduce((s, b) => s + b.dupFingerprints, 0)}</td>
              <td style={{ padding: '10px 12px' }} />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Per-bank drilldown: warnings */}
      {stats.some(s => s.missingSource > 0 || s.dupFingerprints > 0) && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Warning Details</h2>
          {stats.filter(s => s.missingSource > 0 || s.dupFingerprints > 0).map(s => (
            <div key={s.def.id} style={{
              marginBottom: 12, padding: '12px 16px',
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 8, fontSize: 13,
            }}>
              <strong>{s.def.label}</strong>
              {s.missingSource > 0 && (
                <span style={{ marginLeft: 12, color: '#b91c1c' }}>
                  {s.missingSource} question{s.missingSource !== 1 ? 's' : ''} missing <code>p. NN</code> in sourceSection
                </span>
              )}
              {s.dupFingerprints > 0 && (
                <span style={{ marginLeft: 12, color: '#b91c1c' }}>
                  {s.dupFingerprints} duplicate fingerprint{s.dupFingerprints !== 1 ? 's' : ''} (possible near-duplicate questions)
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 40, borderTop: '1px solid #e5e7eb', paddingTop: 16, fontSize: 12, color: '#9ca3af' }}>
        Coverage % = verified ÷ target × 100. Target = planned bank size for adequate exam prep.
        Run <code>npx tsx scripts/qa/run-all.ts</code> for the full QA report.
        Last computed: server render time (no cache — data reflects current question bank state).
      </div>
    </div>
  );
}
