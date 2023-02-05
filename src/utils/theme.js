import { useLayoutEffect } from "react"
import { useState } from "react"

export function useTheme () {

     //checking the theme in system at the user
     const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)')

     const defaultTheme = isDarkTheme? 'dark' : 'light'
     const initialTheme = localStorage.getItem('app-theme') || defaultTheme
     const [theme, setTheme] = useState(initialTheme)

     useLayoutEffect(() => {
          document.documentElement.setAttribute('data-theme', theme)
          //shange get from context
          localStorage.setItem('app-theme', theme)
     },[theme])

     return {theme, setTheme}
}

export default useTheme;

