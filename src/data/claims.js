// Business constants used for reserve benchmarking and authority checks.
export const CLASS_PERIL_AVERAGE = 480000
export const HANDLER_AUTHORITY = 250000

// Seed claim data. In a real app this would come from an API.
export const INITIAL_CLAIMS = {
  CLM0032187: {
    id: 'CLM0032187',
    insured: 'Blackfriars Logistics Ltd',
    policyNumber: 'PRP-2026-004471',
    brokerRef: 'BRO0001688',
    lineOfBusiness: 'Property',
    peril: 'Fire',
    lossDate: 'Aug 3, 2026',
    dateReported: 'Aug 4, 2026',
    lossLocation: 'Farringdon, London EC4',
    description:
      'Fire originating in chemical reprocessing area, contained by sprinkler system; partial building and stock damage. No injuries reported.',
    initialEstimate: '£650,000',
    stage: 'In Analysis',
    severityClass: 'high',
    severityLabel: 'High — Specialist Referral',
    routingBasis: 'Loss estimate ≥ £500,000 (Auto-Triage Rule)',
    assignedTeam: 'Specialist Property Team',
    redFlags:
      'Late notification, inception proximity and fraud indicator checks all clear — no flags triggered.',
    slaAck: '18 hrs (target ≤ 24 hrs) ✓',
    slaTriageComplete: '36 hrs (target ≤ 48 hrs) ✓',
    coverageStatus: 'Confirmed (Y)',
    exclusions: 'None triggered',
    liability: '100% insured — no third-party liability dispute',
    subrogation:
      'Possible — faulty electrical equipment supplier; Recovery Team notified',
    claimsHistory: 'No prior claims on this policy in the last 5 years',
    // Table row fields
    severityPillClass: 'pill-high',
    severityPillLabel: 'High',
    stagePillClass: 'pill-wip',
    caseReserve: 'Pending',
    caseReservePending: true,
    slaStatus: 'On track',
    slaStatusClass: 'sla-ok',
    opened: 'Aug 4, 2026',
    attachments: [
      { name: 'Adjuster Report.pdf', type: 'Adjuster', size: '3.1 MB', uploaded: 'Aug 5, 2026' },
      { name: 'Fire Investigation Report.pdf', type: 'Investigation', size: '2.2 MB', uploaded: 'Aug 5, 2026' },
      { name: 'Site Photos.zip', type: 'Photos', size: '8.4 MB', uploaded: 'Aug 4, 2026' },
      { name: 'Policy Schedule.pdf', type: 'Policy', size: '410 KB', uploaded: 'Aug 4, 2026' },
    ],
  },
}

// Distribution shown in the "Claims by Stage" panel.
export const CLAIMS_BY_STAGE = [
  { name: 'FNOL Received', count: '1 claim', pct: 17, color: '#2f6fed' },
  { name: 'In Triage', count: '2 claims', pct: 33, color: '#8a5a2b' },
  { name: 'In Analysis', count: '2 claims', pct: 33, color: '#d1462f' },
  { name: 'Reserve Approved', count: '1 claim', pct: 17, color: '#1e9e5a' },
  { name: 'Closed / Settled', count: '0 claims', pct: 0, color: '#8b95a1' },
]

// Top stat cards.
export const STAT_CARDS = [
  { value: '6', label: 'ACTIVE CLAIMS', variant: '' },
  { value: '2', label: 'IN TRIAGE / RED FLAGS', variant: 'orange' },
  { value: '1', label: 'PENDING RESERVE APPROVAL', variant: 'purple' },
  {
    value: '92%',
    label: 'SLA COMPLIANCE (RESERVE)',
    variant: 'teal',
    sub: 'Target ≥ 95% within 5 business days',
  },
]
