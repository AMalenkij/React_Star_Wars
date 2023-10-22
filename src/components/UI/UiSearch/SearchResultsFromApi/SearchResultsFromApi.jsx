import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

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
import NoPhoto from '../../../Catalog/ShowDataList/img/NoPhoto.svg'

export default function SearchResultsFromApi({
  urls,
  input,
  searchResultCount = 20,
}) {
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

  const SearchResultItem = ({ dataCategory }) => {
    let remainingCount = searchResultCount

    return dataCategory.results?.map(({ url, name, title }) => {
      if (remainingCount > 0) {
        remainingCount -= 1
        const id = getNumberFromUrl(url)
        const getCategory = extractCategoryFromUrl(url)
        let img

        if (getCategory === 'people') {
          img = `${GUIDE_ROOT_IMG}characters/${id}${GUIDE_IMG_EXTENSION}`
        } else {
          img = `${GUIDE_ROOT_IMG}${getCategory}/${id}${GUIDE_IMG_EXTENSION}`
        }

        const attributTitle = getCategory === 'films' ? title : name

        return (
          <Link
            to={`/${getCategory}/${id}`}
            key={id}
            className="flex items-center text-decoration-none cursor-pointer"
          >
            <img
              className="w-16 h-16 object-cover object-top rounded-xl mb-2"
              src={img}
              alt={name}
              onError={(e) => {
                e.target.src = NoPhoto
              }}
            />
            <div className="ml-2">
              <p className="text-black text-shadow-blue capitalize">
                {getCategory}:
              </p>
              <p className="text-black text-shadow-blue ">{attributTitle}</p>
            </div>
          </Link>
        )
      }
      return null
    })
  }

  return (
    <ul>
      {data?.map((dataCategory) => (
        <SearchResultItem key={dataCategory.id} dataCategory={dataCategory} />
      ))}
    </ul>
  )
}
