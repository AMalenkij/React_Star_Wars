import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import useOutsideClick from './useOutsideClick/useOutsideClick'
import useHandleLocalStorageSearch from './useHandleLocalStorageSearch/useHandleLocalStorageSearch'
import SearchInput from './SearchInput/SearchInput'
import ItemFromLocalStorage from './ItemFromLocalStorage/ItemFromLocalStorage'

import { SEARCH_ENDPOINT } from '../../../constants/settings'

export default function Search({ classNameInput, disableDropdownMenu = true }) {
  const [inputValue, setInputValue] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const handleFocus = () => {
    setDropdownVisible(true)
  }

  const {
    filteredData,
    resultsFromApi,
    deleteItemFromLocalStorage,
    filterEntries,
    storedData,
    setStoredData,
  } = useHandleLocalStorageSearch(inputValue)

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
    dropdownVisible,
    setDropdownVisible
  )
  useEffect(() => {
    if (
      location.pathname !== prevPathnameRef.current &&
      location.pathname !== SEARCH_ENDPOINT
    ) {
      prevPathnameRef.current = location.pathname
      if (inputValue.length > 0) setInputValue('')
    }
  }, [inputValue.length, location.pathname, setBtnClick])

  const handleClearInput = (event) => {
    setInputValue('')
    inputRef.current.focus()
    event.stopPropagation()
  }

  // Escape
  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === 'Escape') {
        setInputValue('')
      }
    }

    document.addEventListener('keydown', handleEscapeKeyPress)

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress)
    }
  }, [setBtnClick])

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
      navigate(`/search/value?search=${value}`)
      event.stopPropagation()
    }
  }
  return (
    <div ref={htmlElementRef}>
      <SearchInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyDown={handleKeyDown}
        handleClearInput={handleClearInput}
        inputRef={inputRef}
        handleFocus={handleFocus}
        className={classNameInput}
      />
      {dropdownVisible && disableDropdownMenu ? (
        // pop up panel
        <ItemFromLocalStorage
          filteredData={filteredData}
          deleteItemFromLocalStorage={deleteItemFromLocalStorage}
          inputValue={inputValue}
          setInputValue={setInputValue}
          resultsFromApi={resultsFromApi}
        />
      ) : null}
    </div>
  )
}
