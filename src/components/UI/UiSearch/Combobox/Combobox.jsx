import { useState, useMemo } from 'react'
import { Combobox } from '@headlessui/react'

import useDebounceValueFormatted from '../../../../hooks/useDebounceValueFormatted'
import SearchResultsFromApi from '../SearchResultsFromApi/SearchResultsFromApi'

import {
  SWAPI_PARAM_SEARCH,
  HTTPS,
  SWAPI_ROOT,
} from '../../../../constants/Resources'

const MAX_ENTRIES = 7
const CATEGORIES_SELECTED = [
  'people',
  'species',
  'films',
  'starships',
  'planets',
  'vehicles',
]

function generateSearchUrls(inputValue, categories) {
  return categories.map(
    (value) => HTTPS + SWAPI_ROOT + value + SWAPI_PARAM_SEARCH + inputValue
  )
}

export default function MyCombobox() {
  // selected represents the currently selected value in the combobox.
  // It is initialized with an empty string, and the setSelected function is used to update its value.
  const [selected, setSelected] = useState('')
  // inputValue represents the current input value in the combobox.
  // It is also initialized with an empty string, and the setInputValue function is used to update its value.
  const [inputValue, setInputValue] = useState('')
  // storedData represents the data stored in the local storage.
  // It is initialized using the useState hook's initializer function.
  // Inside the function, we try to retrieve the data from the local storage using the key 'myData'.
  // If the data exists, we parse it from JSON format using JSON.parse, otherwise, we initialize it as an empty array.
  // If an error occurs during parsing or accessing the local storage, we catch the error, log it to the console, and set the initial value as an empty array.
  // The setStoredData function is used to update the stored data.
  const [storedData, setStoredData] = useState(() => {
    try {
      const data = localStorage.getItem('myData')
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

  // The `handleKeyDown` function captures the "Enter" key press event, adds the entered value to the stored data,
  // updates the state and local storage, and resets the input field value.
  // This allows the user to add new entries to the stored data by pressing "Enter" after entering a value in the input field.
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target
      // It creates a new array, `newData`, by combining the current value with the existing stored data.
      // The current value is added at the beginning of the array using the spread operator (`...`)
      // and the `filterEntries` function is used to remove the duplicate value (if any) and limit the array length to `MAX_ENTRIES - 1`.
      const newData = [value, ...filterEntries(storedData, value)]
      setStoredData(newData)
      localStorage.setItem('myData', JSON.stringify(newData))
      // resetting the text field
      setInputValue('')
    }
  }

  const debouncedValue = useDebounceValueFormatted(inputValue)
  // The filter method is applied to each entry in the storedData array, checking if the entry includes the useDebounceValueFormatted value.
  // This means it will keep only the entries that contain the debounced and formatted search value.
  // The filteredData array is recalculated whenever the storedData array changes.
  const filteredData = useMemo(() => {
    return storedData.filter((entry) => entry.includes(debouncedValue))
  }, [storedData, debouncedValue])

  const urls = generateSearchUrls(debouncedValue, CATEGORIES_SELECTED)

  let resultsFromApi = null
  if (debouncedValue.length > 0) {
    resultsFromApi = <SearchResultsFromApi input={debouncedValue} urls={urls} />
  }

  return (
    <div className="bg-red-300 w-[70vh]">
      <Combobox value={selected} onChange={setSelected}>
        <Combobox.Input
          type="text"
          className="combobox-input w-9/12 border py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-md"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        />
        <div className="mt-1">
          {filteredData.map((entry) => (
            <div
              key={entry}
              value={entry}
              className="py-2 px-3 text-gray-200 cursor-default select-none relative"
              onClick={() => setSelected(entry)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelected(entry)
                }
              }}
              role="button"
              tabIndex={0}
            >
              {entry}
            </div>
          ))}
        </div>
        {resultsFromApi}
      </Combobox>
    </div>
  )
}
