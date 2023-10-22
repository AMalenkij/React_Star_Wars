import { useEffect, createContext, useState, useMemo, useCallback } from 'react'

export const FavoriteContext = createContext()

export default function FavoriteProvider({ children }) {
  const [favorite, setFavorite] = useState([])

  const addToFavorites = useCallback((id, imgSrc, swapiName, pathname) => {
    setFavorite((prev) => [...prev, { id, imgSrc, swapiName, pathname }])
  }, [])

  const delFromFavorites = useCallback((id) => {
    setFavorite((prev) => prev.filter((p) => p.id !== id))
  }, [])

  useEffect(() => {
    const res = sessionStorage.getItem('favorite')
    if (res) {
      setFavorite(JSON.parse(res))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('favorite', JSON.stringify(favorite))
  }, [favorite])

  const contextValue = useMemo(() => {
    return { favorite, addToFavorites, delFromFavorites }
  }, [favorite, addToFavorites, delFromFavorites])

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  )
}
