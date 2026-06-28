import type { Question } from '../schema';

// Texas DPS Driver's License Question Bank
// Source: Texas Driver Handbook (2025) — https://www.dps.texas.gov/internetforms/forms/dl-7.pdf
// Agency: Texas Department of Public Safety (Driver License Division)
//
// STATUS: Empty — questions not yet authored.
// When the 200-question bank is complete, add questions here.
// All questions must be status:'verified' before appearing in the quiz engine.
// See schema.ts for field requirements and QA standards.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SOURCE = 'Texas Driver Handbook 2025';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SOURCE_URL = 'https://www.dps.texas.gov/internetforms/forms/dl-7.pdf';

const questions: Question[] = [
  // Questions will be added here. IDs follow the pattern: tx-dmv-{category}-{seq}
  // Examples: tx-dmv-speed-001, tx-dmv-dwi-001, tx-dmv-signs-001
];

export default questions;
