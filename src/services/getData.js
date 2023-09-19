import { GUIDE_IMG_EXTENSION, GUIDE_ROOT_IMG } from '../constants/Resources'

export const getNumberFromUrl = (url) => {
  const segments = url.split('/')
  const number = segments[segments.length - 2]
  return number
}

export const getPathname = (Pathname) => Pathname.split('/').pop()

export const getRouteFromUrl = (url) => {
  const [, route] = url.split('/')
  return route
}

export const getImgUrl = (id, route) => {
  const imgRoute = route === 'people' ? 'characters' : route
  return `${GUIDE_ROOT_IMG}${imgRoute}/${id}${GUIDE_IMG_EXTENSION}`
}

export function extractCategoryFromUrl(url) {
  const urlParts = url.split('/')
  const categoryIndex = urlParts.indexOf('api') + 1
  return urlParts[categoryIndex]
}
