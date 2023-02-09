import icon from './img/cancel.svg';
import styles from './UiInput.module.css';
import '../index.css';

export function UiInput({value, handleInputChange, placeholder}) {
    return (

        <div className={styles.wrapper__input}>
            <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={placeholder}
                className={styles.UiInput_input}
            />
            <img
                onClick={() => value && handleInputChange('')}
                src={icon}
                className={!value ? styles.clear : styles.clear__disabled}
                alt="Clear"
            />
        </div>
    )
}

export default UiInput;