import styles from './TriageConsistency.module.css'

export default function TriageConsistency() {
  return (
    <div className={`panel ${styles.touchPanel}`}>
      <h2 style={{ margin: 0, fontSize: '16px' }}>Triage Consistency</h2>
      <div className="panel-subtitle">Auto-routed vs. manually re-routed</div>

      <div className={styles.donutWrap}>
        <div className={styles.donut}>
          <div className={styles.donutInner}>
            <div className={styles.donutPct}>88%</div>
            <div className={styles.donutSub}>AUTO-ROUTED</div>
          </div>
        </div>
      </div>

      <div className={styles.legendRow}>
        <span>
          <span className={styles.dot} style={{ background: 'var(--teal)' }} />
          Automated Routing
        </span>
        <span className={styles.val} style={{ color: 'var(--teal)' }}>88%</span>
      </div>
      <div className={styles.legendRow}>
        <span>
          <span className={styles.dot} style={{ background: '#c7ccd3' }} />
          Manually Re-routed
        </span>
        <span className={styles.val} style={{ color: 'var(--text-mid)' }}>12%</span>
      </div>

      <div className={styles.stpNote}>
        Re-routing target: <b>&lt;10%</b> — currently 12%, 2pts above target
      </div>
    </div>
  )
}
