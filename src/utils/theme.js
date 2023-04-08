import { useLayoutEffect, useState } from 'react'

import { getInitialTheme } from './getInitialTheme'

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme())

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  return { theme, setTheme }
}

export default useTheme
