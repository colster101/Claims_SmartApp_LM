import { useState, useRef, useCallback } from 'react'
import styles from './App.module.css'

import Sidebar from './components/Sidebar/Sidebar'
import Topbar from './components/Topbar/Topbar'
import StatCards from './components/StatCards/StatCards'
import ClaimsByStage from './components/ClaimsByStage/ClaimsByStage'
import TriageConsistency from './components/TriageConsistency/TriageConsistency'
import RecentClaims from './components/RecentClaims/RecentClaims'
import ClaimModal from './components/ClaimModal/ClaimModal'
import ReserveModal from './components/ReserveModal/ReserveModal'
import ReserveSummaryModal from './components/ReserveSummaryModal/ReserveSummaryModal'
import Toast from './components/Toast/Toast'

import { INITIAL_CLAIMS, HANDLER_AUTHORITY } from './data/claims'
import { parseAmount, formatGBP, deviationFromAverage } from './utils/format'

const EMPTY_FORM = { basis: 'Best Estimate', caseAmount: '', gross: '', net: '', ibnr: false, reason: '' }

export default function App() {
  const [claims, setClaims] = useState(INITIAL_CLAIMS)
  const [activeClaimId, setActiveClaimId] = useState(null)
  const [view, setView] = useState(null) // 'claim' | 'reserve' | 'summary' | null
  const [detailTab, setDetailTab] = useState('overview')
  const [form, setForm] = useState(EMPTY_FORM)
  const [approvalWindow, setApprovalWindow] = useState('24')
  const [toast, setToast] = useState('')

  const toastTimer = useRef(null)
  const activeClaim = activeClaimId ? claims[activeClaimId] : null

  const showToast = useCallback((msg) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 4200)
  }, [])

  function openClaim(id) {
    setActiveClaimId(id)
    setDetailTab('overview')
    setView('claim')
  }

  function closeAll() {
    setView(null)
  }

  function openReserveModal() {
    const suggested = parseAmount(activeClaim?.initialEstimate)
    const suggestedStr = suggested !== null ? String(suggested) : ''
    setForm({
      basis: 'Best Estimate',
      caseAmount: suggestedStr,
      gross: suggestedStr,
      net: suggestedStr,
      ibnr: false,
      reason: '',
    })
    setView('reserve')
  }

  function handleFormChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function submitReserve() {
    const caseVal = parseAmount(form.caseAmount)
    if (caseVal === null) {
      showToast('Enter a case reserve amount before submitting.')
      return
    }
    const devAbs = Math.abs(deviationFromAverage(caseVal))
    const exceedsAuthority = caseVal > HANDLER_AUTHORITY
    const needsReason = devAbs > 20 || exceedsAuthority
    if (needsReason && !form.reason.trim()) {
      showToast('A rationale is required — deviation exceeds 20% or the amount exceeds your authority.')
      return
    }
    setView('summary')
  }

  function finalizeReserve() {
    const caseVal = parseAmount(form.caseAmount)
    const exceedsAuthority = caseVal > HANDLER_AUTHORITY
    const id = activeClaimId

    setClaims((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        stage: exceedsAuthority ? 'Pending UW Approval' : 'Reserve Approved',
        stagePillClass: 'pill-open',
        caseReserve: formatGBP(caseVal),
        caseReservePending: false,
      },
    }))

    setView(null)
    showToast(
      `Case reserve of ${formatGBP(caseVal)} logged for ${id}` +
        (exceedsAuthority
          ? ' — escalated to Senior Underwriter for approval.'
          : ' — auto-approved within handler authority.') +
        ' Entry recorded to the audit trail.'
    )
  }

  return (
    <div className={styles.app}>
      <Sidebar />

      <div className={styles.main}>
        <Topbar />

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div>
              <h1>Claims Dashboard</h1>
              <div className={styles.date}>Thursday, August 6, 2026</div>
            </div>
            <div className={styles.headerActions}>
              <div className="btn btn-outline">FNOL QUEUE</div>
              <div className="btn btn-solid">MY CLAIMS</div>
            </div>
          </div>

          <StatCards />

          <div className={styles.panelRow}>
            <ClaimsByStage />
            <TriageConsistency />
          </div>

          <RecentClaims claims={claims} onOpen={openClaim} />
        </div>
      </div>

      {view === 'claim' && (
        <ClaimModal
          claim={activeClaim}
          activeTab={detailTab}
          onTab={setDetailTab}
          onClose={closeAll}
          onRecommendReserve={openReserveModal}
        />
      )}

      {view === 'reserve' && (
        <ReserveModal
          claim={activeClaim}
          form={form}
          onChange={handleFormChange}
          onCancel={closeAll}
          onSubmit={submitReserve}
        />
      )}

      {view === 'summary' && (
        <ReserveSummaryModal
          claim={activeClaim}
          form={form}
          approvalWindow={approvalWindow}
          onApprovalWindowChange={setApprovalWindow}
          onBack={() => setView('reserve')}
          onConfirm={finalizeReserve}
        />
      )}

      <Toast message={toast} />
    </div>
  )
}
