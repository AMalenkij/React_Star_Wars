import { useEffect } from 'react'

export default function useOutsideClick(
  inputValue,
  setInputValue,
  htmlElementRef,
  dropdownVisible,
  setDropdownVisible
) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        htmlElementRef.current &&
        !htmlElementRef.current.contains(event.target)
      ) {
        if (dropdownVisible) {
          if (inputValue.length > 0) setInputValue('')
          setDropdownVisible(false)
        }
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [
    htmlElementRef,
    inputValue.length,
    setInputValue,
    dropdownVisible,
    setDropdownVisible,
  ])

  return {}
}
