/** Maps a user's saved profile to the correct quiz testId and mock exam baseTestId. */

export function getDefaultTestId(
  targetState: string | null,
  targetLicense: string | null,
): string {
  const state   = (targetState   ?? 'CA').toUpperCase();
  const license = (targetLicense ?? 'permit').toLowerCase();

  const key = `${state}-${license}`;
  const MAP: Record<string, string> = {
    'CA-permit':      'california-permit',
    'CA-motorcycle':  'california-motorcycle',
    'CA-cdl_general': 'california-cdl-general',
    'TX-permit':      'texas-permit',
    'TX-motorcycle':  'texas-motorcycle',
    'TX-cdl_general': 'texas-cdl-general',
  };
  return MAP[key] ?? 'california-permit';
}

/** Returns true when the license type has no mock exams. */
export function hasMockExams(targetLicense: string | null): boolean {
  const license = (targetLicense ?? 'permit').toLowerCase();
  return license === 'permit';
}
