import { useState } from 'react'
import { useQuery } from 'react-query'

import SearchPageInfo from '../../components/SearchPage/SearchPageInfo/SearchPageInfo'
import UiInput from '../../components/UI/UiInput/UiInput'
import styles from './SearchPage.module.css'
import { getApi } from '../../utils/api'
import { useDebounce } from '../../utils/debounce'
import { API_SEARCH } from '../../constants/Resources'
import { getPeopleId, getImgUrl } from '../../services/getData'
import UiLoading from '../../components/UI/UiLoading/UiLoading'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

function SearchPage() {
  const [inputSearchValue, setInputSearchValue] = useState('')
  const debounceValue = useDebounce(inputSearchValue, 500)

  const urlPeople = API_SEARCH + debounceValue

  const { isLoading, error, data } = useQuery(
    {
      queryKey: ['search', debounceValue],
      queryFn: () => getApi(urlPeople),
      keepPreviousData: true,
    },
    {
      enabled: !!debounceValue,
    }
  )

  if (isLoading) return <UiLoading />
  if (error) return <ErrorMessage error={error.message} />

  const handleInputChange = (value) => {
    setInputSearchValue(value)
  }

  const people = data?.results?.map(({ url, name }) => {
    const id = getPeopleId(url)
    const img = getImgUrl(id)

    return <SearchPageInfo key={id} name={name} url={img} id={id} />
  })

  return (
    <>
      <h1 className="header__text">Search</h1>
      <UiInput
        value={inputSearchValue}
        handleInputChange={handleInputChange}
        placeholder="Input character's name"
      />
      <ul className={styles.list__container}>{people}</ul>
    </>
  )
}

export default SearchPage
