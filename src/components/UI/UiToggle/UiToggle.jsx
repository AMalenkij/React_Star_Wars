import styles from './UiToggle.module.css';

function Toggle() {
  return (
    <>
    <div className={styles.conteiner}>
      <input id="toggle" className={styles.toggle} type="checkbox" role="switch" name="toggle" value="on" />
      <label htmlFor="toggle" className={styles.slot}>
        <span className={styles.slot__label}>Infinity scroll</span>
        <span className={styles.slot__label}>pagination</span>
      </label>
      <div className={styles.curtain}></div> 
      </div>
    </>
  )
}

export default Toggle;
