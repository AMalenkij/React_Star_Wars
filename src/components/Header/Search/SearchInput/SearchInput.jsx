import { COLOR_GOLD } from '../../../../constants/settings'
import ShadowFilter from '../../../../constants/ShadowFilter'

export default function SearchInput({
  inputValue,
  setInputValue,
  handleKeyDown,
  handleClearInput,
  inputRef,
  handleFocus,
  className,
}) {
  return (
    <div
      className="
        rounded-2xl
        shadow-inner
        bg-gray
        flex 
        items-center
        justify-between
        py-2 px-3 gap-2
      "
    >
      <SearchIcon />
      <input
        ref={inputRef}
        onFocus={handleFocus}
        type="text"
        className={`
           flex-1
           bg-gray
           text-gray-900 
           placeholder-gray-500 
           focus:outline-none
           focus:border-b-2
           focus:border-b-gold
           focus:-mb-0.5
           ${className || ''}
           `}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find your favourite character"
      />
      {inputValue ? (
        <button type="button" onClick={handleClearInput}>
          <CloseIconX color={COLOR_GOLD} />
        </button>
      ) : (
        <button type="button" onClick={handleClearInput} disabled>
          <CloseIconX />
        </button>
      )}
    </div>
  )
}

// - SVG
function CloseIconX({ color }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#shadow)">
        <rect width="24" height="24" rx="12" fill={color} />
        <path
          d="M8.5 14.71a.876.876 0 0 0 0 1.242.884.884 0 0 0 1.247 0l2.478-2.467 2.511 2.5a.885.885 0 0 0 1.247 0 .876.876 0 0 0 0-1.242l-2.51-2.5 2.51-2.501a.876.876 0 0 0 0-1.242.885.885 0 0 0-1.247 0L12.225 11 9.747 8.534a.885.885 0 0 0-1.247 0 .876.876 0 0 0 0 1.242l2.478 2.468L8.5 14.71Z"
          fill="#fff"
        />
      </g>
      <ShadowFilter />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#shadow)">
        <path
          d="M19.0607 19.0815L26 26M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="#EEBF00"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <ShadowFilter />
    </svg>
  )
}
