import { Combobox } from '@headlessui/react'

export default function SearchBox({
  selected,
  setSelected,
  inputValue,
  setInputValue,
  handleKeyDown,
  filteredData,
  resultsFromApi,
  closePopover,
  deleteItemFromLocalStorageArray,
  inputRef,
}) {
  const handleClearInput = () => {
    setInputValue('')
  }

  const handleEntryClick = (entry) => {
    setInputValue(entry)
  }

  const handleEntryKeyDown = (e, entry) => {
    if (e.key === 'Enter') {
      setInputValue(entry)
    }
  }

  return (
    <div className="bg-gray-600 w-[70vh]">
      <Combobox value={selected} onChange={setSelected}>
        <div className="flex">
          <button type="button" onClick={closePopover}>
            <CloseIcon />
          </button>
          <Combobox.Input
            ref={inputRef} // Attach the ref to the input element
            type="text"
            className="combobox-input w-full border py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
          />
          {inputValue && (
            <button type="button" onClick={handleClearInput}>
              <ClearIcon />
            </button>
          )}
        </div>
        {/* reaulr search in local storage */}
        <div className="mt-1">
          {filteredData.map(
            (entry) =>
              entry && (
                <div key={entry} className="flex justify-between">
                  <div
                    className="py-2 px-3 text-gray-200 cursor-default select-none relative hover:bg-sky-700 flex justify-between"
                    onClick={() => handleEntryClick(entry)}
                    onKeyDown={(e) => handleEntryKeyDown(e, entry)}
                    role="button"
                    tabIndex={0}
                  >
                    <ClockRotateLeftIcon />
                    {entry}
                  </div>
                  <button
                    onClick={() => deleteItemFromLocalStorageArray(entry)}
                    type="button"
                  >
                    <RemoveIcon />
                  </button>
                </div>
              )
          )}
        </div>

        {resultsFromApi}
      </Combobox>
    </div>
  )
}

// - SVG
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
function RemoveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      className="w-12"
    >
      <g className="w-12">
        <path
          d="M11,17H9V8h2V17z M15,8h-2v9h2V8z M19,4v1h-1v16H6V5H5V4h4V3h6v1H19z M17,5H7v15h10V5z"
          className=""
        />
      </g>
    </svg>
  )
}
function ClockRotateLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      className="w-12"
    >
      <g className="style-scope tp-yt-iron-icon">
        <path
          d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z"
          className="w-12"
        />
      </g>
    </svg>
  )
}
