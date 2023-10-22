import { useState, useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

import { getApi } from '../../../utils/api'
import { SWAPI_PARAM_PAGE } from '../../../constants/Resources'
import { getNumberFromUrl, getImgUrl } from '../../../services/getData'
import ShowDataList from '../ShowDataList/ShowDataList'
import Pagination from './Pagination/Pagination'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import { LoadingContext } from '../../../utils/ContextLoading'

export default function DefaultLoadPage({ urlSwapi, pathnameShort }) {
  const { loading, handleLoading } = useContext(LoadingContext)
  const query = new URLSearchParams(useLocation().search)
  const queryPage = query.get('page') || 1

  const [page, setPage] = useState(parseInt(queryPage, 10))

  const { isLoading, error, data, isPreviousData } = useQuery(
    [urlSwapi, page],
    () => getApi(urlSwapi + SWAPI_PARAM_PAGE + page),
    {
      keepPreviousData: true,
    }
  )

  useEffect(() => {
    if (isLoading && !loading) {
      handleLoading()
    }
    if (data && loading) {
      handleLoading()
    }
  }, [isLoading, loading, handleLoading, data])

  if (isLoading) {
    return null
  }
  if (error) {
    return <ErrorMessage error={error.message} />
  }
  return (
    <>
      <ul className="flex flex-wrap justify-center pb-4">
        {data?.results?.map(({ url, name, title }) => {
          const id = getNumberFromUrl(url)
          const img = getImgUrl(id, pathnameShort)
          const swapiName = name || title
          return (
            <ShowDataList
              key={id}
              name={swapiName}
              url={img}
              id={id}
              pathname={pathnameShort}
            />
          )
        })}
      </ul>
      {pathnameShort === 'films' ? null : (
        <Pagination
          pathname={pathnameShort}
          setPage={setPage}
          page={page}
          nextPage={data?.next}
          isPrevDt={isPreviousData}
        />
      )}
    </>
  )
}
