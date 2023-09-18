import { useLayoutEffect, useState } from 'react'

function getInitialTypeNavigation() {
  let TypeNavigation

  if (localStorage.getItem('app-typeNavigation') !== null) {
    TypeNavigation = localStorage.getItem('app-typeNavigation')
  } else {
    TypeNavigation = 'infinityScroll'
  }

  return TypeNavigation
}

export function useTypeNavigation() {
  const [typeNavigation, setTypeNavigation] = useState(
    getInitialTypeNavigation()
  )

  useLayoutEffect(() => {
    document.documentElement.setAttribute('app-typeNavigation', typeNavigation)
    localStorage.setItem('app-typeNavigation', typeNavigation)
  }, [typeNavigation])

  return { typeNavigation, setTypeNavigation }
}

export default useTypeNavigation
