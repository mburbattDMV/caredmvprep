import Link from "next/link";

interface Props {
  state: string;
  abbreviation: string;
  emoji: string;
  slug: string;
  description: string;
  topics: string[];
}

export default function StatePracticePage({ state, abbreviation, emoji, slug, description, topics }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#122d52] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">{emoji}</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {state} DMV Practice Test
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            {description}
          </p>
          <Link
            href="#start"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a7f3c] hover:bg-[#158532] rounded-lg font-bold text-white text-lg transition"
          >
            Start Free Practice Test
          </Link>
        </div>
      </section>

      {/* Test preview placeholder */}
      <section id="start" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Test Engine Coming Soon</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              The {state} ({abbreviation}) practice test engine is under development.
              Sign up to be notified when it launches.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#1a7f3c] text-white font-semibold rounded-lg hover:bg-[#158532] transition text-sm"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </section>

      {/* Topics covered */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Topics Covered on the {state} DMV Test
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 px-4 py-3 shadow-sm">
                <span className="text-[#1a7f3c] font-bold text-lg">✓</span>
                <span className="text-sm text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d2240] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to practice for the {abbreviation} DMV test?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Free tests for all 50 states. No account needed to begin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="#start" className="px-7 py-3 bg-[#1a7f3c] hover:bg-[#158532] rounded-lg font-semibold text-white transition">
              Start Practice Test
            </Link>
            <Link href="/" className="px-7 py-3 border border-white/30 rounded-lg font-semibold text-white hover:bg-white/10 transition">
              ← All States
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
