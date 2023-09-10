import styles from './UIBtnHamburger.module.css'

export default function UIBtnHamburger({ onChange, checked }) {
  return (
    <label className={styles.bar} htmlFor="check">
      <input type="checkbox" id="check" onChange={onChange} checked={checked} />

      <span className={styles.top} />
      <span className={styles.middle} />
      <span className={styles.bottom} />
    </label>
  )
}
