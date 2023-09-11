import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

import { getApi } from '../../../utils/api'
import { SWAPI_PARAM_PAGE } from '../../../constants/Resources'
import { getPeopleId, getImgUrl } from '../../../services/getData'
import ShowDataList from '../ShowDataList/ShowDataList'
import Pagination from './Pagination/Pagination'
import UiLoading from '../../UI/UiLoading/UiLoading'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

export default function DefaultLoadPage({ urls }) {
  const { urlSwapi, pathnameShort } = urls

  const query = new URLSearchParams(useLocation().search)
  const queryPage = query.get('page') || 1

  const [page, setPage] = useState(parseInt(queryPage, 10))

  const { isLoading, error, data, isPreviousData } = useQuery({
    queryKey: [pathnameShort, queryPage],
    queryFn: () => getApi(urlSwapi + SWAPI_PARAM_PAGE + page),
    keepPreviousData: true,
  })

  if (isLoading) return <UiLoading />
  if (error) return <ErrorMessage error={error.message} />

  const people = data.results.map(({ url, name }) => {
    const id = getPeopleId(url)
    const img = getImgUrl(id, pathnameShort)

    return (
      <ShowDataList
        key={id}
        name={name}
        url={img}
        id={id}
        pathname={pathnameShort}
      />
    )
  })

  return (
    <>
      <ul className="flex flex-wrap justify-center">{people}</ul>
      <Pagination
        pathname={pathnameShort}
        setPage={setPage}
        page={page}
        nextPage={data.next}
        isPrevDt={isPreviousData}
      />
    </>
  )
}
