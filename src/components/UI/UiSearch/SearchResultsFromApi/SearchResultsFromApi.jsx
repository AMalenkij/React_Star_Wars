import { useQuery } from 'react-query'

import SearchPageInfo from '../../../SearchPage/SearchPageInfo/SearchPageInfo'
import { getConcurrentApi } from '../../../../utils/api'
import {
  getNumberFromUrl,
  extractCategoryFromUrl,
} from '../../../../services/getData'
import {
  GUIDE_ROOT_IMG,
  GUIDE_IMG_EXTENSION,
} from '../../../../constants/Resources'

import UiLoading from '../../UiLoading/UiLoading'

export default function SearchResultsFromApi({ urls, input }) {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: ['search', input, urls],
      queryFn: () => getConcurrentApi(urls),
      keepPreviousData: true,
    },
    {
      enabled: !!input,
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  )

  if (isLoading) return <UiLoading />
  if (error) return `An error has occurred: ${error.message}`

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
  return <ul>{dataForAllCategory}</ul>
}
