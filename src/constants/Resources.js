// common
export const HTTPS = 'https://'

// swapi
export const SWAPI_ROOT = 'swapi.dev/api/'
export const SWAPI_PEOPLE = 'people'
export const SWAPI_PARAM_PAGE = '/?page='
export const SWAPI_PARAM_SEARCH = '/?search='

export const API_PEOPLE = HTTPS + SWAPI_ROOT + SWAPI_PEOPLE + SWAPI_PARAM_PAGE
// https://swapi.dev/api/people/?page='
export const API_PERSON = HTTPS + SWAPI_ROOT + SWAPI_PEOPLE
export const API_SEARCH = HTTPS + SWAPI_ROOT + SWAPI_PEOPLE + SWAPI_PARAM_SEARCH

// visualguide
export const GUIDE_ROOT_IMG = 'https://starwars-visualguide.com/assets/img/'
// const GUIDE_PEOPLE = 'characters'
export const GUIDE_IMG_EXTENSION = '.jpg'

export const BASE_URL = HTTPS + SWAPI_ROOT
