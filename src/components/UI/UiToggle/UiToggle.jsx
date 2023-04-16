/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './UiToggle.module.css'

function Toggle({ handleToggle, isChecked }) {
  return (
    <div className={styles.container}>
      <input
        id="toggle"
        className={styles.toggle}
        type="checkbox"
        role="switch"
        name="toggle"
        value="on"
        checked={!!isChecked}
        onChange={handleToggle}
      />
      <label htmlFor="toggle" className={styles.slot}>
        <span className={styles.slot__label}>Infinity scroll</span>
        <span className={styles.slot__label}>pagination</span>
      </label>
      <div className={styles.curtain} />
    </div>
  )
}

export default Toggle
