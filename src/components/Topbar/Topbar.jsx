import styles from './Topbar.module.css'

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.defaultSelect}>⊕ My Queue ▾</div>
      <div className={styles.gearBtn}>⚙</div>
      <div className={styles.userBlock}>
        <div className={styles.userText}>
          <div className={styles.userName}>Priya Kaur</div>
          <div className={styles.userEmail}>priya.kaur@dxc.com</div>
          <div className={styles.rolePill}>Claims Handler</div>
        </div>
        <div className={styles.avatar}>PK</div>
      </div>
    </div>
  )
}
