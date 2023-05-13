import { useState, useMemo } from 'react'
import { useQuery } from 'react-query'

import SearchPageInfo from '../../components/SearchPage/SearchPageInfo/SearchPageInfo'
import UiInput from '../../components/UI/UiInput/UiInput'
import styles from './SearchPage.module.css'
import { getConcurrentApi } from '../../utils/api'
import { useDebounce } from '../../utils/debounce'
import {
  SWAPI_PARAM_SEARCH,
  HTTPS,
  SWAPI_ROOT,
  GUIDE_ROOT_IMG,
  GUIDE_IMG_EXTENSION,
} from '../../constants/Resources'
import {
  getNumberFromUrl,
  extractCategoryFromUrl,
} from '../../services/getData'
import UiLoading from '../../components/UI/UiLoading/UiLoading'

function SearchPage() {
  const [inputSearchValue, setInputSearchValue] = useState('')
  const debounceValue = useDebounce(inputSearchValue, 500)
  const category = useMemo(
    () => ['people', 'species', 'films', 'starships', 'planets', 'vehicles'],
    []
  )

  const urls = category.map(
    (value) => HTTPS + SWAPI_ROOT + value + SWAPI_PARAM_SEARCH + debounceValue
  )

  const { isLoading, error, data } = useQuery(
    {
      queryKey: ['search', debounceValue, urls],
      queryFn: () => getConcurrentApi(urls),
      keepPreviousData: true,
    },
    {
      enabled: !!debounceValue,
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  )

  if (isLoading) return <UiLoading />
  if (error) return `An error has occurred: ${error.message}`

  const handleInputChange = (value) => {
    setInputSearchValue(value)
  }

  const dataForAllCategory = data?.map((dataCategory) =>
    dataCategory.results?.map(({ url, name, title }) => {
      const id = getNumberFromUrl(url)
      const getCategory = extractCategoryFromUrl(url)
      let img
      if (getCategory === 'people') {
        img = `${GUIDE_ROOT_IMG}characters/${id}${GUIDE_IMG_EXTENSION}`
      } else {
        img = `${GUIDE_ROOT_IMG}${getCategory}/${id}${GUIDE_IMG_EXTENSION}`
      }

      return (
        <SearchPageInfo
          key={id}
          category={getCategory}
          attributes={{ name, title }}
          url={img}
          id={id}
        />
      )
    })
  )
  return (
    <>
      <h1 className="header__text">Search</h1>
      <h2>{isLoading}</h2>
      <UiInput
        value={inputSearchValue}
        handleInputChange={handleInputChange}
        placeholder="Input character's name"
      />
      <ul className={styles.list__container}>{dataForAllCategory}</ul>
    </>
  )
}

export default SearchPage
