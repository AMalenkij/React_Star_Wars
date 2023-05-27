import { useDebounce } from '../utils/debounce'

const DEBOUNCE_MILLISECONDS = 500

const formatString = (value) => {
  if (value.length <= 2) {
    return value // Return the value as is if it has two or fewer characters
  }

  return value.toLowerCase().replace(/\s+/g, '') // Convert to lowercase and remove spaces
}

export default function useDebounceValueFormatted(inputValue) {
  const debounceValue = useDebounce(inputValue, DEBOUNCE_MILLISECONDS)
  return formatString(debounceValue)
}
