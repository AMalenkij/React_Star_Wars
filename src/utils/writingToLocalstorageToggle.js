import { useLayoutEffect, useState } from 'react'

// rewrite to hook
// don't repit himself

function getInitialTypeNavigation() {
  let TypeNavigation

  if (localStorage.getItem('app-typeNavigation') !== null) {
    TypeNavigation = localStorage.getItem('app-typeNavigation')
  } else {
    TypeNavigation = 'false'
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
