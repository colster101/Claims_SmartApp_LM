import styles from './ReserveModal.module.css'
import { CLASS_PERIL_AVERAGE, HANDLER_AUTHORITY } from '../../data/claims'
import { parseAmount, formatGBP, deviationFromAverage } from '../../utils/format'

export default function ReserveModal({ claim, form, onChange, onCancel, onSubmit }) {
  if (!claim) return null
  const d = claim

  const caseVal = parseAmount(form.caseAmount)
  const hasAmount = caseVal !== null

  const deviation = hasAmount ? deviationFromAverage(caseVal) : null
  const devAbs = deviation !== null ? Math.abs(deviation) : 0
  const exceedsAuthority = hasAmount && caseVal > HANDLER_AUTHORITY
  const needsReason = hasAmount && (devAbs > 20 || exceedsAuthority)

  const subLine = `${d.lineOfBusiness} — ${d.peril} · Initial estimate ${d.initialEstimate}`

  return (
    <div
      className="overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div className="carrier-modal">
        <div className="card-head">
          <div>
            <div className="case-num">{d.id}</div>
            <h2 style={{ fontSize: '19px' }}>Reserve Setting &amp; Approval</h2>
            <div className="sub-line">{subLine}</div>
          </div>
          <div className="close-x" onClick={onCancel}>✕</div>
        </div>

        <div className={styles.carrierBody}>
          <div className={styles.carrierDesc}>
            Set the case reserve for this claim. Reserves are benchmarked against the class/peril average
            and checked against your delegated authority limit before approval routing.
          </div>

          <div className={styles.reserveFormGrid}>
            <div className={styles.reserveField}>
              <label>Reserve Basis</label>
              <select value={form.basis} onChange={(e) => onChange('basis', e.target.value)}>
                <option>Best Estimate</option>
                <option>Worst Case</option>
              </select>
            </div>
            <div className={styles.reserveField}>
              <label>Case Reserve Amount (£)</label>
              <input
                type="text"
                placeholder="0"
                value={form.caseAmount}
                onChange={(e) => onChange('caseAmount', e.target.value)}
              />
            </div>
            <div className={styles.reserveField}>
              <label>Gross Incurred (£)</label>
              <input
                type="text"
                placeholder="0"
                value={form.gross}
                onChange={(e) => onChange('gross', e.target.value)}
              />
            </div>
            <div className={styles.reserveField}>
              <label>Net Incurred (£)</label>
              <input
                type="text"
                placeholder="0"
                value={form.net}
                onChange={(e) => onChange('net', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.reserveCheckboxRow}>
            <input
              type="checkbox"
              id="reserveIBNR"
              style={{ width: '16px', height: '16px' }}
              checked={form.ibnr}
              onChange={(e) => onChange('ibnr', e.target.checked)}
            />
            <label htmlFor="reserveIBNR">Mark as IBNR — further development expected</label>
          </div>

          <div className={styles.benchmarkPanel}>
            <div className="summary-section-label" style={{ marginBottom: '10px' }}>BENCHMARKING</div>
            <div className={styles.benchmarkRow}>
              <span>Class/Peril average (Property — Fire)</span>
              <span><strong>{formatGBP(CLASS_PERIL_AVERAGE)}</strong></span>
            </div>
            <div className={styles.benchmarkRow}>
              <span>Deviation from average</span>
              <span className={`${styles.benchmarkDeviation} ${hasAmount ? (devAbs <= 20 ? styles.ok : styles.warn) : ''}`}>
                {hasAmount ? `${deviation >= 0 ? '+' : ''}${deviation.toFixed(1)}%` : '—'}
              </span>
            </div>
          </div>

          <div className={`${styles.authorityPanel} ${hasAmount ? (exceedsAuthority ? styles.escalate : styles.auto) : ''}`}>
            {!hasAmount && 'Enter a case reserve amount to check it against your delegated authority.'}
            {hasAmount && exceedsAuthority &&
              `⚠ Exceeds your delegated authority (${formatGBP(HANDLER_AUTHORITY)}) — will route to Senior Underwriter for approval.`}
            {hasAmount && !exceedsAuthority &&
              `✓ Within your delegated authority (${formatGBP(HANDLER_AUTHORITY)}) — will auto-approve.`}
          </div>

          {needsReason && (
            <div className={styles.reasonCodeWrap}>
              <label>Rationale / Reason Code (mandatory — deviation &gt;20% or exceeds authority)</label>
              <textarea
                placeholder="e.g. Site survey confirms extensive structural damage beyond initial estimate…"
                value={form.reason}
                onChange={(e) => onChange('reason', e.target.value)}
              />
            </div>
          )}
        </div>

        <div className={styles.carrierActions}>
          <div className="btn btn-cancel" onClick={onCancel}>CANCEL</div>
          <div className="btn btn-confirm" onClick={onSubmit}>SUBMIT RESERVE RECOMMENDATION</div>
        </div>
      </div>
    </div>
  )
}
