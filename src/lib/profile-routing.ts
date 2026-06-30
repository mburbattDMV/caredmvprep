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
    'FL-permit':      'florida-permit',
    'FL-motorcycle':  'florida-motorcycle',
    'FL-cdl_general': 'florida-cdl-general',
    'NY-permit':      'new-york-permit',
    'NY-motorcycle':  'new-york-motorcycle',
    'NY-cdl_general': 'new-york-cdl-general',
    'GA-permit':      'georgia-permit',
    'GA-motorcycle':  'georgia-motorcycle',
    'GA-cdl_general': 'georgia-cdl-general',
    'OH-permit':      'ohio-permit',
    'OH-motorcycle':  'ohio-motorcycle',
    'OH-cdl_general': 'ohio-cdl-general',
    'PA-permit':      'pennsylvania-permit',
    'PA-motorcycle':  'pennsylvania-motorcycle',
    'PA-cdl_general': 'pennsylvania-cdl-general',
    'IL-permit':      'illinois-permit',
    'IL-motorcycle':  'illinois-motorcycle',
    'IL-cdl_general': 'illinois-cdl-general',
    'NC-permit':      'north-carolina-permit',
    'NC-motorcycle':  'north-carolina-motorcycle',
    'NC-cdl_general': 'north-carolina-cdl-general',
  };
  return MAP[key] ?? 'california-permit';
}

/** Returns true when the license type has no mock exams. */
export function hasMockExams(targetLicense: string | null): boolean {
  const license = (targetLicense ?? 'permit').toLowerCase();
  return license === 'permit';
}
