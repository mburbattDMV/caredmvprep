import type { Question } from '../schema';

// Texas DPS Motorcycle (Class M) Question Bank
// Source: Texas Motorcycle Operator Manual (2025) — https://www.dps.texas.gov/internetforms/forms/dl-9.pdf
// Agency: Texas Department of Public Safety (Driver License Division)
// Test: 25 questions, pass with 20 correct (80%)
//
// STATUS: Empty — questions not yet authored.
// When the bank is complete, add questions here.
// All questions must be status:'verified' before appearing in the quiz engine.
// See schema.ts for field requirements and QA standards.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SOURCE = 'Texas Motorcycle Operator Manual 2025';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SOURCE_URL = 'https://www.dps.texas.gov/internetforms/forms/dl-9.pdf';

const questions: Question[] = [
  // Questions will be added here. IDs follow the pattern: tx-moto-{category}-{seq}
  // Examples: tx-moto-braking-001, tx-moto-helmet-001, tx-moto-lane-001
];

export default questions;
