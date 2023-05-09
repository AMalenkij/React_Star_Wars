import { useQuery } from 'react-query'

import UiLoading from '../../UI/UiLoading/UiLoading'
import styles from './DetailRalated.module.css'
import { getConcurrentApi } from '../../../utils/api'
import attributesSWApi from '../../../constants/attributesSWApi'
import { getNumberFromUrl } from '../../../services/getData'

function DetailRalated({ categoryUrl, urlArray }) {
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
      <li className={styles.list__item} key={dataFromUrl[property]}>
        <a href={`/${category}/${id}`}>
          <span className={styles.item__episode}>{title}</span>
          <span className={styles.item__colon}> : </span>
          <span className={styles.item__title}>{dataFromUrl[property]}</span>
        </a>
      </li>
    )
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.category__wrapper}>
        <span className={styles.category__tag}>{categoryUrl}</span>
      </div>
      <ul className={styles.list__container}>{results}</ul>
    </div>
  )
}

export default DetailRalated
