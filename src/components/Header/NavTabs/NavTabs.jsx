import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import useDebounceValueFormatted from '../../../hooks/useDebounceValueFormatted'
import SearchResultsFromApi from '../../UI/UiSearch/SearchResultsFromApi/SearchResultsFromApi'
import {
  SWAPI_PARAM_SEARCH,
  HTTPS,
  SWAPI_ROOT,
} from '../../../constants/Resources'

// -Settings
const MAX_ENTRIES = 7

const CATEGORIES_SELECTED = [
  'people',
  'species',
  'films',
  'starships',
  'planets',
  'vehicles',
]

// local storage key names
const LOCAL_STORAGE_RECENT_QUESTS = 'recentQuests'

export default function NavTabs() {
  // In case of clicking on the link inside popover, popover will be closed
  const navigate = useNavigate()

  const [switchOn, setSwitchOn] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  // storedData represents the data stored in the local storage.
  // It is initialized using the useState hook's initializer function.
  // Inside the function, we try to retrieve the data from the local storage using the key 'recentQuests'.
  // If the data exists, we parse it from JSON format using JSON.parse, otherwise, we initialize it as an empty array.
  // If an error occurs during parsing or accessing the local storage, we catch the error, log it to the console, and set the initial value as an empty array.
  // The setStoredData function is used to update the stored data.
  const [storedData, setStoredData] = useState(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_RECENT_QUESTS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      // Handle the error in an appropriate way
      // For example, display an error message to the user or log it to an error tracking system
      return []
    }
  })

  const filterEntries = (data, value) => {
    return data.filter((entry) => entry !== value).slice(0, MAX_ENTRIES - 1)
  }

  // можно бы это запрятать в инпут дебоунс там пусть и тормозит все это
  const debouncedValue = useDebounceValueFormatted(inputValue)
  // The filter method is applied to each entry in the storedData array, checking if the entry includes the useDebounceValueFormatted value.
  // This means it will keep only the entries that contain the debounced and formatted search value.
  // The filteredData array is recalculated whenever the storedData array changes.
  const filteredData = useMemo(() => {
    return storedData.filter((entry) => entry.includes(debouncedValue))
  }, [storedData, debouncedValue])
  // When clicking on the trash icon
  const deleteItemFromLocalStorage = (itemToDelete) => {
    const updatedArray = storedData.filter((item) => item !== itemToDelete)
    localStorage.setItem(
      LOCAL_STORAGE_RECENT_QUESTS,
      JSON.stringify(updatedArray)
    )
    setStoredData(updatedArray)
  }
  // Escape
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSwitchOn(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKeyPress)

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress)
    }
  }, [])

  // The `handleKeyDown` function captures the "Enter" key press event, adds the entered value to the stored data,
  // updates the state and local storage, and resets the input field value.
  // This allows the user to add new entries to the stored data by pressing "Enter" after entering a value in the input field.
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.length > 0) {
      const { value } = event.target
      // It creates a new array, `newData`, by combining the current value with the existing stored data.
      // The current value is added at the beginning of the array using the spread operator (`...`)
      // and the `filterEntries` function is used to remove the duplicate value (if any) and limit the array length to `MAX_ENTRIES - 1`.
      const newData = [value, ...filterEntries(storedData, value)]
      setStoredData(newData)
      // setSearchParams({post: newData})
      localStorage.setItem(LOCAL_STORAGE_RECENT_QUESTS, JSON.stringify(newData))
      // resetting the text field
      setInputValue('')
      // closePopover()
      navigate(`/search/value?search=${value}`)
    }
  }

  const handleClearInput = () => {
    setInputValue('')
    inputRef.current.focus()
  }

  const handleSwitchToggle = () => {
    setSwitchOn(!switchOn)
  }

  const urls = generateSearchUrls(debouncedValue, CATEGORIES_SELECTED)

  let resultsFromApi = null
  if (debouncedValue.length > 0) {
    resultsFromApi = <SearchResultsFromApi input={debouncedValue} urls={urls} />
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
                {switchOn ? null : 'Search Off'}
              </button>
            </li>
          </>
        ) : null}
        <li>
          {switchOn ? (
            <div className="fixed bg-slate-700 p-2x z-10">
              <SearchInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleKeyDown={handleKeyDown}
                handleClearInput={handleClearInput}
                inputRef={inputRef}
                handleSwitchToggle={handleSwitchToggle}
              />
              <ItemFromLocalStorage
                filteredData={filteredData}
                deleteItemFromLocalStorage={deleteItemFromLocalStorage}
                setInputValue={setInputValue}
              />
              {resultsFromApi}
            </div>
          ) : null}
        </li>
      </ul>
    </nav>
  )
}

// API
function generateSearchUrls(inputValue, categories) {
  return categories.map(
    (value) => HTTPS + SWAPI_ROOT + value + SWAPI_PARAM_SEARCH + inputValue
  )
}
function ItemFromLocalStorage({
  filteredData,
  deleteItemFromLocalStorage,
  setInputValue}
) {
  const handleEntryClick = (entry) => {
    setInputValue(entry)
  }

  const handleEntryKeyDown = (e, entry) => {
    if (e.key === 'Enter') {
      setInputValue(entry)
    }
  }
  return (
    <div className="mt-1">
      {filteredData?.map(
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
                onClick={() => deleteItemFromLocalStorage(entry)}
                type="button"
              >
                <RemoveIcon />
              </button>
            </div>
          )
      )}
    </div>
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
