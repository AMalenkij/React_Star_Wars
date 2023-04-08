import { useState } from 'react'

function useToggleBtn(initialState) {
  const [isChecked, setIsChecked] = useState(initialState !== 'false')

  const handleToggle = () => {
    setIsChecked(!isChecked)
  }

  return [isChecked, handleToggle]
}

export default useToggleBtn
