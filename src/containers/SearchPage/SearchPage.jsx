import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import LinkBack from '../../components/DetailPage/LinkBack/LinkBack'
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
import ShowDataList from '../../components/Catalog/ShowDataList/ShowDataList'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const debounceValue = useDebounce(searchQuery, 500)

  const urls = useMemo(() => {
    if (!debounceValue) return []

    return CATEGORY.map(
      (value) =>
        `${HTTPS}${SWAPI_ROOT}${value}${SWAPI_PARAM_SEARCH}${debounceValue}`
    )
  }, [debounceValue])

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

  const dataForAllCategory = data?.map((dataCategory) =>
    dataCategory.results?.map(({ url, name }) => {
      const id = getNumberFromUrl(url)
      const getCategory = extractCategoryFromUrl(url)
      const img =
        getCategory === 'people'
          ? `${GUIDE_ROOT_IMG}characters/${id}${GUIDE_IMG_EXTENSION}`
          : `${GUIDE_ROOT_IMG}${getCategory}/${id}${GUIDE_IMG_EXTENSION}`

      return (
        <ShowDataList
          key={id}
          category={getCategory}
          name={name}
          pathname={getCategory}
          url={img}
          id={id}
        />
      )
    })
  )

  return (
    <div
      className="
      shadow-border
      container 
      rounded-2xl
      bg-white
      mt-6
      mx-auto
      p-3
      pt-1"
    >
      <div
        className="
      shadow-drop-300 
      bg-knob-base 
      rounded-2xl 
      border-2 
      border-white
      "
      >
        <h1 className="text-lg text-center pt-6 pb-2">Search</h1>
        <div className="px-6 py-2">
          <LinkBack />
        </div>
        {dataForAllCategory.length > 0 ? (
          <ul
            className="
        flex 
        flex-wrap
        pb-6
        "
          >
            {dataForAllCategory}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  )
}
