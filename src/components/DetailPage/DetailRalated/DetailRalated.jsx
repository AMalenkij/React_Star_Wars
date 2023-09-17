import { useQuery } from 'react-query'

import UiLoading from '../../UI/UiLoading/UiLoading'
import { getConcurrentApi } from '../../../utils/api'
import attributesSWApi from '../../../constants/attributesSWApi'
import { getNumberFromUrl } from '../../../services/getData'

export default function DetailRalated({ categoryUrl, urlArray }) {
  const category = ['characters', 'pilots', 'residents'].includes(categoryUrl)
    ? 'people'
    : categoryUrl

  const idArray = urlArray.map((url) => getNumberFromUrl(url))
  const [categorySWApi] = attributesSWApi[category]
  const { property, title } = categorySWApi

  const { isLoading, error, data } = useQuery(category, () =>
    getConcurrentApi(urlArray)
  )
  if (isLoading) return <UiLoading />
  if (error) return `An error has occurred: ${error.message}`
  if (!data) return null

  let counter = -1
  const results = data.map((dataFromUrl) => {
    counter += 1
    const id = idArray[counter]
    return (
      <li key={dataFromUrl[property]}>
        <a href={`/${category}/${id}`}>{dataFromUrl[property]}</a>
      </li>
    )
  })

  return (
    <>
      <div className="mb-2 mt-6">
        <span className="text-zinc-500 capitalize">{categoryUrl}:</span>
      </div>
      <ul className="flex gap-6 flex-wrap">{results}</ul>
    </>
  )
}
