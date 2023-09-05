import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import useDebounceValueFormatted from '../../../hooks/useDebounceValueFormatted'
import SearchResultsFromApi from '../../UI/UiSearch/SearchResultsFromApi/SearchResultsFromApi'
import {
  SWAPI_PARAM_SEARCH,
  HTTPS,
  SWAPI_ROOT,
} from '../../../constants/Resources'
import {
  MAX_ENTRIES,
  SEARCH_ENDPOINT,
  SEARCH_RESULT_COUNT,
  CATEGORIES_SELECTED,
  LOCAL_STORAGE_RECENT_QUESTS,
  COLOR_GOLD,
} from '../../../constants/settings'

import ShadowFilter from '../../../constants/ShadowFilter'

function useHandleLocalStorageSearch(inputValue, setTurnOnNav) {
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
      console.error(error)
      return []
    }
  })

  const filterEntries = (data, value) => {
    return data.filter((entry) => entry !== value).slice(0, MAX_ENTRIES - 1)
  }

  const debouncedValue = useDebounceValueFormatted(inputValue)
  // The filter method is applied to each entry in the storedData array, checking if the entry includes the useDebounceValueFormatted value.
  // This means it will keep only the entries that contain the debounced and formatted search value.
  // The filteredData array is recalculated whenever the storedData array changes.
  const filteredData = useMemo(() => {
    return storedData.filter((entry) => entry.includes(debouncedValue))
  }, [storedData, debouncedValue])

  const deleteItemFromLocalStorage = (itemToDelete) => {
    const updatedArray = storedData.filter((item) => item !== itemToDelete)
    localStorage.setItem(
      LOCAL_STORAGE_RECENT_QUESTS,
      JSON.stringify(updatedArray)
    )
    setStoredData(updatedArray)
  }

  const urls = generateSearchUrls(debouncedValue, CATEGORIES_SELECTED)

  let resultsFromApi = null
  if (debouncedValue.length > 0) {
    resultsFromApi = (
      <SearchResultsFromApi
        input={debouncedValue}
        urls={urls}
        searchResultCount={SEARCH_RESULT_COUNT}
        setTurnOnNav={setTurnOnNav}
      />
    )
  }

  return {
    filteredData,
    resultsFromApi,
    deleteItemFromLocalStorage,
    filterEntries,
    storedData,
    setStoredData,
  }
}

function useOutsideClick(
  inputValue,
  setInputValue,
  htmlElementRef,
  switchOn,
  setSwitchOn,
  hidePartOfSearchMenu,
  setHidePartOfSearchMenu,
  setTurnOnNav
) {
  const btnClickRef = useRef(false)
  const btnClick = btnClickRef.current
  const setBtnClick = (value) => {
    btnClickRef.current = value
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        htmlElementRef.current &&
        !htmlElementRef.current.contains(event.target)
      ) {
        if (hidePartOfSearchMenu) {
          if (btnClickRef.current && switchOn) {
            setBtnClick(false)
            setSwitchOn(false)
            setTurnOnNav(true)
            if (inputValue.length > 0) setInputValue('')
            if (!hidePartOfSearchMenu) setHidePartOfSearchMenu(false)
          } else {
            setBtnClick(true)
          }
        }
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [
    hidePartOfSearchMenu,
    htmlElementRef,
    inputValue.length,
    setHidePartOfSearchMenu,
    setInputValue,
    setSwitchOn,
    switchOn,
    setTurnOnNav,
  ])

  return { btnClick, setBtnClick }
}

export default function NavTabs({ setTurnOnNav, turnOnNav }) {
  const [inputValue, setInputValue] = useState('')
  const {
    filteredData,
    resultsFromApi,
    deleteItemFromLocalStorage,
    filterEntries,
    storedData,
    setStoredData,
  } = useHandleLocalStorageSearch(inputValue)
  const [switchOn, setSwitchOn] = useState(false)

  const [hidePartOfSearchMenu, setHidePartOfSearchMenu] = useState(true)
  const inputRef = useRef(null)

  // In case of clicking on the link inside popover, popover will be closed
  const navigate = useNavigate()
  const location = useLocation()
  const prevPathnameRef = useRef(location.pathname)

  const htmlElementRef = useRef(null)
  const { setBtnClick } = useOutsideClick(
    inputValue,
    setInputValue,
    htmlElementRef,
    switchOn,
    setSwitchOn,
    hidePartOfSearchMenu,
    setHidePartOfSearchMenu,
    setTurnOnNav,
    turnOnNav
  )
  useEffect(() => {
    if (
      location.pathname !== prevPathnameRef.current &&
      location.pathname !== SEARCH_ENDPOINT
    ) {
      prevPathnameRef.current = location.pathname
      if (inputValue.length > 0) setInputValue('')
      if (!hidePartOfSearchMenu) setHidePartOfSearchMenu(true)
      setSwitchOn(false)
      setBtnClick(false)
    }
  }, [hidePartOfSearchMenu, inputValue.length, location.pathname, setBtnClick])

  const prevInputRef = useRef(inputValue)

  useEffect(() => {
    if (inputValue !== prevInputRef.current) {
      if (!hidePartOfSearchMenu) setHidePartOfSearchMenu(!hidePartOfSearchMenu)
    }
    prevInputRef.current = inputValue
  }, [hidePartOfSearchMenu, inputValue])

  const handleClearInput = (event) => {
    setInputValue('')
    inputRef.current.focus()
    event.stopPropagation()
    // if (!hidePartOfSearchMenu) setHidePartOfSearchMenu(!hidePartOfSearchMenu)
  }

  const handleSwitchToggle = () => {
    setSwitchOn(!switchOn)
    setTurnOnNav(!turnOnNav)
    setBtnClick(false)
  }

  // Escape
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSwitchOn(false)
        setBtnClick(false)
        // if (!hidePartOfSearchMenu) setHidePartOfSearchMenu(!hidePartOfSearchMenu)
        setInputValue('')
        setTurnOnNav(true)
      }
    }

    document.addEventListener('keydown', handleEscapeKeyPress)

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress)
    }
  }, [setBtnClick, setTurnOnNav])

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
      // setHidePartOfSearchMenu(false)
      // if (location.pathname === '/search/value') setHidePartOfSearchMenu(false)
      setHidePartOfSearchMenu(false)
      navigate(`/search/value?search=${value}`)
      event.stopPropagation()
      setSwitchOn(true)
    }
  }
  return (
    <nav className="container mx-auto">
      <ul className="flex gap-6">
        {!switchOn ? (
          <button type="button" onClick={handleSwitchToggle}>
            {switchOn ? null : 'Search Off'}
          </button>
        ) : null}
        <li>
          {switchOn ? (
            <div
              ref={htmlElementRef}
              className="
            absolute
            "
            >
              <div
                className="
            rounded-3xl
            shadow-inner
            bg-gray
            px-4 py-2
            mb-4
            "
              >
                <SearchInput
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  handleKeyDown={handleKeyDown}
                  handleClearInput={handleClearInput}
                  handleSwitchToggle={handleSwitchToggle}
                />
              </div>
              {hidePartOfSearchMenu ? (
                <div
                  className="
                bg-knob_elevation
                border-2
                border-white
                rounded-3xl
                shadow-drop-300
                px-4 py-3
                "
                >
                  <ItemFromLocalStorage
                    filteredData={filteredData}
                    deleteItemFromLocalStorage={deleteItemFromLocalStorage}
                    setInputValue={setInputValue}
                    htmlElementRef={htmlElementRef}
                  />

                  {resultsFromApi}
                </div>
              ) : null}
            </div>
          ) : null}
        </li>
      </ul>
    </nav>
  )
}

// - API
function generateSearchUrls(inputValue, categories) {
  return categories.map(
    (value) => HTTPS + SWAPI_ROOT + value + SWAPI_PARAM_SEARCH + inputValue
  )
}
function ItemFromLocalStorage({
  filteredData,
  deleteItemFromLocalStorage,
  setInputValue,
  htmlElementRef,
}) {
  const handleEntryClick = (entry) => {
    setInputValue(entry)
  }

  const handleEntryKeyDown = (e, entry) => {
    if (e.key === 'Enter') {
      setInputValue(entry)
    }
  }

  const handleButtonClick = (event, entry) => {
    event.stopPropagation()
    deleteItemFromLocalStorage(entry)
  }

  return (
    <div ref={htmlElementRef} className='mb-2'>
      {filteredData?.map(
        (entry) =>
          entry && (
            <div key={entry} className="flex justify-between mb-3">
              <button
                type="button"
                onClick={() => handleEntryClick(entry)}
                onKeyDown={(e) => handleEntryKeyDown(e, entry)}
                tabIndex={0}
                className="
                h-12 w-12 
                flex 
                justify-center 
                items-center
                shadow-drop-400
                rounded-xl
                hover:shadow-drop-300
                "
              >
                <BookmarkIcon />
              </button>
              <div className="pt-4 text-lg pr-24">{entry}</div>
              <button
                className="
              h-12 w-12 
              flex 
              justify-center 
              items-center
              shadow-drop-400
              rounded-xl
              hover:shadow-drop-300"
                onClick={(event) => handleButtonClick(event, entry)}
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
  handleSwitchToggle,
}) {
  return (
    <div className="flex">
      <button type="button" onClick={(handleClearInput, handleSwitchToggle)}>
        <SearchIcon />
      </button>
      <input
        type="text"
        className="
        bg-gray
        combobox-input
        w-full 
        py-2 px-3 
        text-gray-900 
        placeholder-gray-500 
        focus:outline-none 
        focus:ring-2 
        focus:ring-teal-500 
        focus:border-transparent
        "
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      {inputValue ? (
        <button className="ml-2" type="button" onClick={handleClearInput}>
          <CloseIconX color={COLOR_GOLD} />
        </button>
      ) : (
        <button
          className="ml-2"
          type="button"
          onClick={handleClearInput}
          disabled
        >
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
      <g filter="url(#filter0_i_32_438)">
        <path
          d="M19.0607 19.0815L26 26M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="#EEBF00"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_32_438"
          x="0.5"
          y="0.5"
          width="27"
          height="31"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_32_438"
          />
        </filter>
      </defs>
    </svg>
  )
}
function BookmarkIcon() {
  return (
    <svg
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.18.5c.442 0 .82.17 1.133.508.338.338.507.729.507 1.172V15.5L6 13 .18 15.5V2.18c0-.443.156-.834.468-1.172C.987.669 1.378.5 1.82.5h8.36Z"
        fill="#EEBF00"
      />
    </svg>
  )
}
function RemoveIcon() {
  return (
    <svg
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.82 1.82H.18V.18h11.64v1.64Z" fill="#EEBF00" />
    </svg>
  )
}
