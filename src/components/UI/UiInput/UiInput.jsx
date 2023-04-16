import icon from './img/cancel.svg'
import styles from './UiInput.module.css'
import '../index.css'

export function UiInput({ value, handleInputChange, placeholder }) {
  const handleClearClick = () => value && handleInputChange('')

  const handleClearKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClearClick()
    }
  }

  return (
    <div className={styles.wrapper__input}>
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        className={styles.UiInput_input}
      />
      <button
        onClick={handleClearClick}
        onKeyDown={handleClearKeyDown}
        className={styles.clear}
        disabled={!value}
        aria-label="Clear"
        type="button"
      >
        <img src={icon} className={styles.clear__icon} alt="Clear" />
      </button>
    </div>
  )
}

export default UiInput
