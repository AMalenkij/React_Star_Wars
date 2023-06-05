import React, { useState, useRef } from 'react'

export default function NavTabs() {
  const [switchOn, setSwitchOn] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Handle search logic here
    }
  }

  const handleClearInput = () => {
    setInputValue('')
    inputRef.current.focus()
  }

  const handleSwitchToggle = () => {
    setSwitchOn(!switchOn)
  }

  return (
    <nav className="container mx-auto">
      <ul className="flex gap-6">
        {!switchOn ? (
          <>
            <li>Home</li>
            <li>Explore</li>
            <li>
              <button type="button" onClick={handleSwitchToggle}>
                {switchOn ? 'Search On' : 'Search Off'}
              </button>
            </li>
          </>
        ) : null}
        <li>
          {switchOn ? (
            <SearchInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleKeyDown={handleKeyDown}
              handleClearInput={handleClearInput}
              inputRef={inputRef}
              handleSwitchToggle={handleSwitchToggle}
            />
          ) : null}
        </li>
      </ul>
    </nav>
  )
}

function SearchInput({
  inputValue,
  setInputValue,
  handleKeyDown,
  handleClearInput,
  inputRef,
  handleSwitchToggle,
}) {
  return (
    <div className="flex">
      <button type="button" onClick={handleSwitchToggle}>
        <CloseIcon />
      </button>
      <input
        ref={inputRef}
        type="text"
        className="combobox-input w-full border py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      {inputValue && (
        <button type="button" onClick={(handleClearInput, handleSwitchToggle)}>
          <ClearIcon />
        </button>
      )}
    </div>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      className="w-14"
    >
      <g className="style-scope tp-yt-iron-icon">
        <path
          d="M21,11v1H5.64l6.72,6.72l-0.71,0.71L3.72,11.5l7.92-7.92l0.71,0.71L5.64,11H21z"
          className="style-scope tp-yt-iron-icon"
        />
      </g>
    </svg>
  )
}
function ClearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      className="w-14"
    >
      <g className="style-scope tp-yt-iron-icon">
        <path
          d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z"
          className="style-scope tp-yt-iron-icon"
        />
      </g>
    </svg>
  )
}
