import './index.css'

export default function UiRadio({ name, value, onChange, checked }) {
  const inputId = `radio-${value}`
  return (
    <div className="relative inline-block cursor-pointer">
      <input
        name="radio-group"
        id={inputId}
        className="radio-button__input"
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked === value}
      />
      <label htmlFor={inputId} className="radio-button__label">
        <span className="radio-button__custom" />
        {name}
      </label>
    </div>
  )
}
