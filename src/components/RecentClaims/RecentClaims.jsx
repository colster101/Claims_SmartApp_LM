import styles from './RecentClaims.module.css'

const slaClass = {
  'sla-ok': styles.slaOk,
  'sla-watch': styles.slaWatch,
  'sla-breach': styles.slaBreach,
}

export default function RecentClaims({ claims, onOpen }) {
  const rows = Object.values(claims)

  return (
    <div className={`panel ${styles.tablePanel}`}>
      <div className={styles.tableHeadRow}>
        <div>
          <h2 style={{ margin: 0, fontSize: '16px' }}>Recent Claims</h2>
          <div className="panel-subtitle" style={{ marginBottom: 0 }}>
            {rows.length} most recently opened
          </div>
        </div>
        <a className={styles.viewAll} href="#">View all →</a>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>CLAIM #</th>
            <th>INSURED</th>
            <th>PERIL / CAUSE</th>
            <th>LOSS DATE</th>
            <th>SEVERITY</th>
            <th>STAGE</th>
            <th>CASE RESERVE</th>
            <th>SLA</th>
            <th>OPENED</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id}>
              <td>
                <a
                  className={styles.caseLink}
                  onClick={(e) => {
                    e.preventDefault()
                    onOpen(c.id)
                  }}
                >
                  {c.id}
                </a>
              </td>
              <td>{c.insured}</td>
              <td>{c.peril} — {c.lineOfBusiness}</td>
              <td>{c.lossDate}</td>
              <td><span className={`pill ${c.severityPillClass}`}>{c.severityPillLabel}</span></td>
              <td><span className={`pill ${c.stagePillClass}`}>{c.stage}</span></td>
              <td className={c.caseReservePending ? styles.muted : undefined}>{c.caseReserve}</td>
              <td className={slaClass[c.slaStatusClass]}>{c.slaStatus}</td>
              <td className={styles.muted}>{c.opened}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
