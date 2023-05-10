import { useState, useEffect } from 'react'

import { getRouteFromUrl } from '../services/getData'

function useRoute() {
  const [routeUrl, setRouteUrl] = useState(window.location.pathname)

  useEffect(() => {
    const handlePathnameChange = () => setRouteUrl(window.location.pathname)
    window.addEventListener('popstate', handlePathnameChange)
    return () => window.removeEventListener('popstate', handlePathnameChange)
  }, [])

  return getRouteFromUrl(routeUrl)
}

export default useRoute
