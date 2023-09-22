import React from 'react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScrollComponent from 'react-infinite-scroll-component'

import { getApi } from '../../../utils/api'
import { SWAPI_PARAM_PAGE } from '../../../constants/Resources'
import { getImgUrl, getNumberFromUrl } from '../../../services/getData'
import ShowDataList from '../ShowDataList/ShowDataList'
import UiLoading from '../../UI/UiLoading/UiLoading'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

export default function LoadMore({ urlSwapi, pathnameShort }) {
  const {
    fetchNextPage,
    hasNextPage, // boolean indicating if there are more pages
    isFetchingNextPage, // boolean indicating if next page is being fetched
    data, // data returned from the API
    status,
    error,
  } = useInfiniteQuery(
    ['pathname'],
    ({ pageParam = 1 }) => getApi(urlSwapi + SWAPI_PARAM_PAGE + pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.next === null ? undefined : pages.length + 1,
    }
  )

  if (error) return <ErrorMessage error={error.message} />
  if (status === 'loading') return <UiLoading />

  const dataResultFromAPI = data?.pages.flatMap((pg, i) => (
    <React.Fragment key={i}>
      {pg.results.map(({ url, name, title }) => {
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
    </React.Fragment>
  ))
  return (
    <InfiniteScrollComponent
      style={{ minHeight: '105vh' }}
      dataLength={dataResultFromAPI.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={isFetchingNextPage && <UiLoading />}
      endMessage={
        <p className="text-center trxt-lg py-2">
          All {pathnameShort} have been loaded
        </p>
      }
    >
      <ul className="flex flex-wrap justify-center">{dataResultFromAPI}</ul>
    </InfiniteScrollComponent>
  )
}
