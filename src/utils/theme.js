import { useLayoutEffect } from "react"
import { useState } from "react"
import {initialTheme} from './initialTheme.js';

export function useTheme () {

     const [theme, setTheme] = useState(initialTheme());

     useLayoutEffect(() => {
          document.documentElement.setAttribute('data-theme', theme)
          localStorage.setItem('app-theme', theme)
     },[theme])

     return {theme, setTheme}
}

export default useTheme;