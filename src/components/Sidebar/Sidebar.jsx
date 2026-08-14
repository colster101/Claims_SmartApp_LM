import styles from './Sidebar.module.css'

const NAV = [
  { icon: '⌂', label: 'Dashboard', active: true, badge: true },
  {
    icon: '✎',
    label: 'FNOL Intake',
    children: [
      { icon: '+', label: 'New FNOL' },
      { icon: '▤', label: 'Draft / Incomplete' },
    ],
  },
  {
    icon: '◈',
    label: 'Triage & Routing',
    children: [
      { icon: '⚑', label: 'Awaiting Triage' },
      { icon: '⚠', label: 'Red Flags / Escalated' },
    ],
  },
  {
    icon: '🔍',
    label: 'Claims Analysis',
    children: [
      { icon: '🛡', label: 'Coverage Review' },
      { icon: '↺', label: 'Subrogation' },
    ],
  },
  {
    icon: '£',
    label: 'Reserve Setting',
    chip: '1',
    children: [
      { icon: '⏳', label: 'Pending Approval' },
      { icon: '✓', label: 'Approved' },
    ],
  },
  { icon: '🔒', label: 'Compliance & Audit' },
  { icon: '▥', label: 'Reporting' },
]

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <svg width="70" height="20" viewBox="0 0 70 20">
          <path d="M2 2 L14 10 L2 18" stroke="#e8792a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 2 L22 10 L10 18" stroke="#2f6fed" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
          <text x="26" y="15" fontFamily="Segoe UI, Arial" fontSize="15" fontWeight="700" fill="#1b2430">XC</text>
        </svg>
      </div>
      <div className={styles.moduleTag}>CLAIMS MODULE</div>

      <div className={styles.appsHeader}>
        <span>APPLICATIONS</span>
        <span className={styles.plus}>+&nbsp;&nbsp;−</span>
      </div>

      {NAV.map((item) => (
        <div key={item.label}>
          <a
            className={[
              styles.navItem,
              styles.topLevel,
              item.active ? styles.active : '',
            ].join(' ')}
          >
            <span className={styles.navIcon}>{item.icon}</span> {item.label}
            {item.badge && <span className={styles.badgeDot} />}
            {item.chip && <span className={styles.countChip}>{item.chip}</span>}
          </a>
          {item.children?.map((child) => (
            <a key={child.label} className={`${styles.navItem} ${styles.subItem}`}>
              <span className={styles.navIcon}>{child.icon}</span> {child.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}
