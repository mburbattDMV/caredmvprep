// Browser-safe FNV-1a 32-bit hash for question deduplication.
// Stored in each question's `fingerprint` field for fast exact-match lookup.
// QA scripts compute SHA-256 independently (Node.js only) for near-duplicate detection.
export function fp(questionText: string): string {
  const s = questionText
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
