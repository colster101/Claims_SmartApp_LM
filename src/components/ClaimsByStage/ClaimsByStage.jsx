import styles from './ClaimsByStage.module.css'
import { CLAIMS_BY_STAGE } from '../../data/claims'

export default function ClaimsByStage() {
  const total = 6
  return (
    <div className="panel">
      <div className="panel-title-row">
        <h2>Claims by Stage</h2>
        <span className="count-badge">{total} total</span>
      </div>
      <div className="panel-subtitle">Distribution across the claim lifecycle</div>

      {CLAIMS_BY_STAGE.map((row) => (
        <div key={row.name} className={styles.statusRow}>
          <div className={styles.statusTop}>
            <span className={styles.statusSq} style={{ background: row.color }} />
            <span className={styles.statusName}>{row.name}</span>
            <span className={styles.statusCount}>{row.count}</span>
            <span className={styles.statusPct}>{row.pct}%</span>
          </div>
          <div className={styles.statusBar}>
            <span style={{ width: `${row.pct}%`, background: row.color }} />
          </div>
        </div>
      ))}
    </div>
  )
}
