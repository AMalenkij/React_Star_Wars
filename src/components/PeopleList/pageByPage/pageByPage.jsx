import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

import { getApi } from '../../../utils/api'
import { API_PEOPLE } from '../../../constants/Resources'
import { getPeopleId, getPeopleImg } from '../../../services/getPeopleData'
import PeopleList from '../PeopleList'
import Pagination from '../Pagination/Pagination'
import styles from './PageByPage.module.css'
import UiLoading from '../../UI/UiLoading/UiLoading'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

export function PageByPage() {
  const query = new URLSearchParams(useLocation().search)
  const queryPage = query.get('page') || 1

  const [page, setPage] = useState(parseInt(queryPage, 10))

  const { isLoading, error, data, isPreviousData } = useQuery({
    queryKey: ['people', queryPage],
    queryFn: () => getApi(API_PEOPLE + page),
    keepPreviousData: true,
  })

  if (isLoading) return <UiLoading />
  if (error) return <ErrorMessage error={error.message} />

  const people = data.results.map(({ url, name }) => {
    const id = getPeopleId(url)
    const img = getPeopleImg(id)

    return <PeopleList key={id} name={name} url={img} id={id} />
  })

  return (
    <>
      <Pagination
        setPage={setPage}
        page={page}
        nextPage={data.next}
        isPrevDt={isPreviousData}
      />
      <ul className={styles.list__container}>{people}</ul>
    </>
  )
}

export default PageByPage
