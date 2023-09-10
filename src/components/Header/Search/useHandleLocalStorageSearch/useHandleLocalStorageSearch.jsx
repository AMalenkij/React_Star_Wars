import React, { useState, useMemo } from 'react'

import useDebounceValueFormatted from '../../../../hooks/useDebounceValueFormatted'
import SearchResultsFromApi from '../../../UI/UiSearch/SearchResultsFromApi/SearchResultsFromApi'

import {
  MAX_ENTRIES,
  SEARCH_RESULT_COUNT,
  CATEGORIES_SELECTED,
  LOCAL_STORAGE_RECENT_QUESTS,
} from '../../../../constants/settings'

import {
  SWAPI_PARAM_SEARCH,
  HTTPS,
  SWAPI_ROOT,
} from '../../../../constants/Resources'

// - API
function generateSearchUrls(inputValue, categories) {
  return categories.map(
    (value) => HTTPS + SWAPI_ROOT + value + SWAPI_PARAM_SEARCH + inputValue
  )
}

export default function useHandleLocalStorageSearch(inputValue) {
  const debouncedValue = useDebounceValueFormatted(inputValue)
  const urls = generateSearchUrls(debouncedValue, CATEGORIES_SELECTED)

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

  let resultsFromApi = null
  if (debouncedValue.length > 0) {
    resultsFromApi = (
      <SearchResultsFromApi
        input={debouncedValue}
        urls={urls}
        searchResultCount={SEARCH_RESULT_COUNT}
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
