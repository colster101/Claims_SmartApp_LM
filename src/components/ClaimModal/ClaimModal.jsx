import styles from './ClaimModal.module.css'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'triage', label: 'Triage' },
  { key: 'analysis', label: 'Analysis' },
  { key: 'reserve', label: 'Reserve' },
  { key: 'attachments', label: 'Attachments' },
]

export default function ClaimModal({ claim, activeTab, onTab, onClose, onRecommendReserve }) {
  if (!claim) return null
  const d = claim

  const subLine = `${d.lineOfBusiness} — ${d.peril}  ·  ${d.stage}  ·  Related Broking Case ${d.brokerRef}`

  return (
    <div
      className="overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="card-modal">
        <div className="card-head">
          <div>
            <div className="case-num">{d.id}</div>
            <h2>{d.insured}</h2>
            <div className="sub-line">{subLine}</div>
          </div>
          <div className="close-x" onClick={onClose}>✕</div>
        </div>

        <div className="detail-tabs">
          {TABS.map((t) => (
            <div
              key={t.key}
              className={`detail-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => onTab(t.key)}
            >
              {t.label}
              {t.key === 'attachments' && (
                <span className="tab-count">{(d.attachments || []).length}</span>
              )}
            </div>
          ))}
        </div>

        <div className="detail-body">
          {activeTab === 'overview' && (
            <div className="detail-tab-panel active">
              <div className="worth-banner">
                FNOL headline — full loss detail, coverage and reserve are in their respective tabs.
              </div>

              <div className="card-what">
                <span className="headline-label">LOSS DESCRIPTION</span>
                <br />
                <span>{d.description}</span>
              </div>

              <div className="headline-grid">
                <div className="headline-item">
                  <div className="headline-label">POLICY NUMBER</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.policyNumber}</div>
                </div>
                <div className="headline-item">
                  <div className="headline-label">INITIAL LOSS ESTIMATE</div>
                  <div className="headline-value accent">{d.initialEstimate}</div>
                </div>
                <div className="headline-item">
                  <div className="headline-label">LOSS DATE / REPORTED</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.lossDate} / {d.dateReported}</div>
                </div>
                <div className="headline-item">
                  <div className="headline-label">BROKER REFERENCE</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.brokerRef}</div>
                </div>
                <div className="headline-item span2">
                  <div className="headline-label">LOSS LOCATION</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.lossLocation}</div>
                </div>
                <div className="headline-item span2">
                  <div className="headline-label">SEVERITY &amp; ROUTING</div>
                  <span className={`risk-flag ${d.severityClass}`}>{d.severityLabel}</span>
                  <div className="headline-note">Routed to {d.assignedTeam} — {d.routingBasis}</div>
                </div>
              </div>

              <div className="card-actions">
                <div className="btn btn-decline" onClick={onClose}>CLOSE</div>
                <div className="btn btn-quote" onClick={onRecommendReserve}>RECOMMEND RESERVE</div>
              </div>
              <div className="card-footnote">
                Every action here is logged to the immutable audit trail with timestamp, user identity, and rationale where required.
              </div>
            </div>
          )}

          {activeTab === 'triage' && (
            <div className="detail-tab-panel active">
              <div className="headline-grid" style={{ paddingTop: '18px' }}>
                <div className="headline-item span2">
                  <div className="headline-label">SEVERITY SCORE</div>
                  <span className={`risk-flag ${d.severityClass}`}>{d.severityLabel}</span>
                  <div className="headline-note">{d.routingBasis}</div>
                </div>
                <div className="headline-item">
                  <div className="headline-label">ASSIGNED TEAM</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.assignedTeam}</div>
                </div>
                <div className="headline-item">
                  <div className="headline-label">MANUAL OVERRIDE</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>None recorded</div>
                </div>
              </div>
              <div className="card-what" style={{ marginTop: '16px' }}>
                <span className="headline-label">RED FLAG CHECKS</span>
                <br />
                <span>{d.redFlags}</span>
              </div>
              <div className="headline-grid">
                <div className="headline-item">
                  <div className="headline-label">SLA — FNOL TO ACK</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.slaAck}</div>
                </div>
                <div className="headline-item">
                  <div className="headline-label">SLA — TRIAGE COMPLETION</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.slaTriageComplete}</div>
                </div>
              </div>
              <div className="card-footnote" style={{ paddingTop: '10px' }}>
                Auto-triage rules apply first; handlers may override with a mandatory reason code, which is recorded to the audit trail.
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="detail-tab-panel active">
              <div className="headline-grid" style={{ paddingTop: '18px' }}>
                <div className="headline-item">
                  <div className="headline-label">COVERAGE CONFIRMATION</div>
                  <span className="risk-flag advantageous">{d.coverageStatus}</span>
                </div>
                <div className="headline-item">
                  <div className="headline-label">EXCLUSIONS TRIGGERED</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.exclusions}</div>
                </div>
                <div className="headline-item span2">
                  <div className="headline-label">LIABILITY APPORTIONMENT</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.liability}</div>
                </div>
                <div className="headline-item span2">
                  <div className="headline-label">SUBROGATION ASSESSMENT</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.subrogation}</div>
                </div>
                <div className="headline-item span2">
                  <div className="headline-label">CLAIMS HISTORY</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>{d.claimsHistory}</div>
                </div>
              </div>
              <div className="card-footnote" style={{ paddingTop: '10px' }}>
                Coverage decisions reference the specific policy clause(s) relied upon and are logged for audit.
              </div>
            </div>
          )}

          {activeTab === 'reserve' && (
            <div className="detail-tab-panel active">
              <div className="card-what" style={{ margin: '18px 24px 0' }}>
                No reserve set yet — recommend a case reserve to route this claim for underwriter approval.
              </div>
              <div className="headline-grid">
                <div className="headline-item">
                  <div className="headline-label">CLASS / PERIL AVERAGE</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>£480,000</div>
                  <div className="headline-note">Property — Fire, benchmarked</div>
                </div>
                <div className="headline-item">
                  <div className="headline-label">YOUR DELEGATED AUTHORITY</div>
                  <div className="headline-value" style={{ fontSize: '15.5px' }}>£250,000</div>
                  <div className="headline-note">Above this, approval escalates to Senior Underwriter</div>
                </div>
              </div>
              <div className="card-actions">
                <div className="btn btn-decline" onClick={onClose}>CLOSE</div>
                <div className="btn btn-quote" onClick={onRecommendReserve}>RECOMMEND RESERVE</div>
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="detail-tab-panel active">
              {(d.attachments || []).length ? (
                <div className={styles.attachList}>
                  {d.attachments.map((a) => (
                    <div key={a.name} className={styles.attachRow}>
                      <div className={styles.attachIcon}>📄</div>
                      <div className={styles.attachInfo}>
                        <div className={styles.attachName}>{a.name}</div>
                        <div className={styles.attachMeta}>
                          <span className={styles.attachTypeBadge}>{a.type}</span>
                          <span>{a.size}</span>
                          <span>·</span>
                          <span>Uploaded {a.uploaded}</span>
                        </div>
                      </div>
                      <div className={styles.attachDownload} title="Download">⬇</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.attachEmptyNote}>No documents attached to this claim yet.</div>
              )}
              <div className="card-footnote" style={{ paddingTop: '14px' }}>
                Documents extracted from the FNOL submission and subsequent correspondence.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
