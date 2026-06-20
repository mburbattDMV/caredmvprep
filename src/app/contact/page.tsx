import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – CAREDMVPrep",
  description:
    "Get in touch with the CAREDMVPrep team. Report an error, ask a question, or send us feedback.",
  alternates: { canonical: "https://caredmvprep.com/contact" },
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2240] to-[#122d52] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            Found an error? Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact form placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select disabled className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-400 cursor-not-allowed">
                  <option>General question</option>
                  <option>Report an error</option>
                  <option>Feedback</option>
                  <option>Business inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-400 cursor-not-allowed resize-none"
                />
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <p className="text-xs text-amber-700">
                  <strong>Contact form coming soon.</strong> In the meantime, email us at{" "}
                  <a href="mailto:hello@caredmvprep.com" className="underline font-medium">
                    hello@caredmvprep.com
                  </a>
                </p>
              </div>
              <button
                disabled
                className="w-full py-3 bg-[#1a7f3c] text-white font-semibold rounded-lg opacity-50 cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: "✉️", label: "Email", value: "hello@caredmvprep.com" },
              { icon: "⏱️", label: "Response time", value: "Within 48 hours" },
              { icon: "📍", label: "Based in", value: "United States" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</p>
                <p className="text-sm text-gray-800 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
