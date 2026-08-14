import styles from './StatCards.module.css'
import { STAT_CARDS } from '../../data/claims'

const variantClass = {
  orange: styles.orange,
  purple: styles.purple,
  teal: styles.teal,
}

export default function StatCards() {
  return (
    <div className={styles.statRow}>
      {STAT_CARDS.map((card) => (
        <div
          key={card.label}
          className={[styles.statCard, variantClass[card.variant] || ''].join(' ')}
        >
          <div className={styles.statValue}>{card.value}</div>
          <div className={styles.statLabel}>{card.label}</div>
          {card.sub && <div className={styles.statSub}>{card.sub}</div>}
        </div>
      ))}
    </div>
  )
}
