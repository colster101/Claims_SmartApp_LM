import styles from './ReserveSummaryModal.module.css'
import { HANDLER_AUTHORITY } from '../../data/claims'
import { parseAmount, formatGBP, deviationFromAverage } from '../../utils/format'

function formatDeadline(hours) {
  const deadline = new Date(Date.now() + hours * 3600 * 1000)
  return deadline.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ReserveSummaryModal({
  claim,
  form,
  approvalWindow,
  onApprovalWindowChange,
  onBack,
  onConfirm,
}) {
  if (!claim) return null

  const caseVal = parseAmount(form.caseAmount) || 0
  const gross = parseAmount(form.gross) || 0
  const net = parseAmount(form.net) || 0
  const deviation = deviationFromAverage(caseVal)
  const exceedsAuthority = caseVal > HANDLER_AUTHORITY
  const reason = form.reason.trim()

  return (
    <div
      className="overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onBack()
      }}
    >
      <div className="card-modal">
        <div className="card-head">
          <div>
            <div className="case-num">{claim.id}</div>
            <h2 style={{ fontSize: '19px' }}>Reserve Recommendation — Summary</h2>
            <div className="sub-line">Review before this is logged and routed for approval</div>
          </div>
          <div className="close-x" onClick={onBack}>✕</div>
        </div>

        <div className="detail-body">
          <div style={{ padding: '18px 24px 4px' }}>
            <div className="summary-section-label">RESERVE RECOMMENDATION</div>
            <div className="headline-grid" style={{ padding: 0 }}>
              <div className="headline-item">
                <div className="headline-label">RESERVE BASIS</div>
                <div className="headline-value" style={{ fontSize: '15.5px' }}>{form.basis}</div>
              </div>
              <div className="headline-item">
                <div className="headline-label">CASE RESERVE</div>
                <div className="headline-value accent">{formatGBP(caseVal)}</div>
              </div>
              <div className="headline-item">
                <div className="headline-label">GROSS / NET INCURRED</div>
                <div className="headline-value" style={{ fontSize: '15.5px' }}>
                  {formatGBP(gross)} / {formatGBP(net)}
                </div>
              </div>
              <div className="headline-item">
                <div className="headline-label">DEVIATION FROM CLASS AVG</div>
                <div className="headline-value" style={{ fontSize: '15.5px' }}>
                  {deviation >= 0 ? '+' : ''}{deviation.toFixed(1)}% vs. class average
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px 24px 4px' }}>
            <div className="summary-section-label">APPROVAL ROUTING</div>
            <span
              className={`risk-flag ${exceedsAuthority ? 'high' : 'advantageous'}`}
              style={{ marginTop: '2px' }}
            >
              {exceedsAuthority
                ? `Escalated to Senior Underwriter — exceeds ${formatGBP(HANDLER_AUTHORITY)} handler authority`
                : `Auto-approved — within ${formatGBP(HANDLER_AUTHORITY)} handler authority`}
            </span>
          </div>

          {reason && (
            <div style={{ padding: '16px 24px 4px' }}>
              <div className="summary-section-label">RATIONALE</div>
              <div className={styles.reasonBox}>{reason}</div>
            </div>
          )}

          <div style={{ padding: '16px 24px 4px' }}>
            <div className="summary-section-label">EXPECTED APPROVAL TURNAROUND</div>
            <div className={styles.summaryReplyRow}>
              <select
                value={approvalWindow}
                onChange={(e) => onApprovalWindowChange(e.target.value)}
              >
                <option value="4">4 hours (same-day escalation)</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
              </select>
              <div className={styles.summaryReplyDeadline}>
                Approval requested by <b>{formatDeadline(parseInt(approvalWindow, 10))}</b>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px 24px 4px' }}>
            <div className={styles.auditNote}>
              <span>🔒</span>
              <span>
                This action is recorded to the immutable audit trail with timestamp, user identity, and
                rationale, per Lloyd's Minimum Standards and internal compliance requirements.
              </span>
            </div>
          </div>

          <div className="card-actions" style={{ paddingTop: '20px' }}>
            <div className="btn btn-cancel" onClick={onBack}>BACK</div>
            <div className="btn btn-quote" onClick={onConfirm}>CONFIRM &amp; LOG RESERVE</div>
          </div>
        </div>
      </div>
    </div>
  )
}
