export function initialTheme () {

     let initialTheme;

     if (!localStorage.getItem('app-theme') === undefined) {
          initialTheme = localStorage.getItem('app-theme')
     }else if (window.matchMedia) {
          // Check to see if Media-Queries are supported
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          //checking the theme in system at the user
               initialTheme = 'dark'
          } else {
               initialTheme = 'light'
          }
     }else {
          initialTheme = 'default'
     }
     return initialTheme
}
export default initialTheme