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
import { CATEGORY } from '../../constants/swApiProps'

function SearchPage() {
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [filteredCategory, setFilteredCategory] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = () => {
    if (selectAll) {
      setFilteredCategory([])
      setSelectAll(false)
    } else {
      setFilteredCategory(CATEGORY)
      setSelectAll(true)
    }
  }

  const handleCategoryToggle = (value) => {
    if (filteredCategory.includes(value)) {
      setFilteredCategory(filteredCategory.filter((cat) => cat !== value))
      setSelectAll(false)
    } else {
      setFilteredCategory([...filteredCategory, value])
      if (filteredCategory.length + 1 === CATEGORY.length) {
        setSelectAll(true)
      }
    }
  }

  const debounceValue = useDebounce(inputSearchValue, 500)
  const urls = useMemo(
    () =>
      filteredCategory.map(
        (value) =>
          HTTPS + SWAPI_ROOT + value + SWAPI_PARAM_SEARCH + debounceValue
      ),
    [debounceValue, filteredCategory]
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
      <h1 className={styles.header__text}>Search</h1>
      <h2>{isLoading}</h2>
      <div className={styles.nav__container}>
        <div className={styles.input__container}>
          <UiInput
            value={inputSearchValue}
            handleInputChange={handleInputChange}
            placeholder="Input character's name"
          />
          <div>Selected categories: {filteredCategory.join(', ')}</div>
        </div>
        <nav>
          <nav>
            <ul>
              <li>
                <label htmlFor="select-all-checkbox">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              </li>
              {CATEGORY.map((value) => (
                <li key={value}>
                  <label htmlFor={value}>
                    <input
                      id={value}
                      type="checkbox"
                      checked={filteredCategory.includes(value)}
                      onClick={() => handleCategoryToggle(value)}
                    />
                    {value}
                  </label>
                </li>
              ))}
            </ul>
          </nav>
        </nav>
      </div>

      <ul className={styles.list__container}>{dataForAllCategory}</ul>
    </>
  )
}

export default SearchPage
