import { createContext, useState, useMemo } from 'react'

export const LoadingContext = createContext()

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)

  const contextValue = useMemo(() => {
    const handleLoading = () => {
      setLoading(!loading)
    }

    return {
      loading,
      handleLoading,
    }
  }, [loading])

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
}
