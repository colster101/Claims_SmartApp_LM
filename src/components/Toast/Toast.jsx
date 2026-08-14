import styles from './Toast.module.css'

export default function Toast({ message }) {
  if (!message) return null
  return <div className={styles.miniToast}>{message}</div>
}
