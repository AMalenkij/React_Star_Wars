export function getInitialTheme () {

     let initialTheme;

     if (localStorage.getItem('app-theme') !== null) 
          initialTheme = localStorage.getItem('app-theme')
     //checking the theme in system at the user
     else if (window.matchMedia('(prefers-color-scheme: dark)').matches) 
          initialTheme = 'dark'
     else if (window.matchMedia('(prefers-color-scheme: light)').matches)
          initialTheme = 'light'
     else 
          initialTheme = 'default'

     return initialTheme
}
export default getInitialTheme