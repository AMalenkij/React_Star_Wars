import { useQuery } from 'react-query'

import UiLoading from '../../UI/UiLoading/UiLoading'
import styles from './DetailRalated.module.css'
import { getConcurrentApi } from '../../../utils/api'
import attributesSWApi from '../../../constants/attributesSWApi'

function DetailRalated({ categoryUrl, urlArray }) {
  const category = ['characters', 'pilots', 'residents'].includes(categoryUrl)
    ? 'people'
    : categoryUrl

  const [categorySWApi] = attributesSWApi[category]
  const { property, title } = categorySWApi

  const { isLoading, error, data } = useQuery(category, () =>
    getConcurrentApi(urlArray)
  )

  if (isLoading) return <UiLoading />
  if (error) return `An error has occurred: ${error.message}`
  if (!data) return null

  const results = data.map((dataFromUrl) => (
    <li className={styles.list__item} key={dataFromUrl[property]}>
      <span className={styles.item__episode}>{title}</span>
      <span className={styles.item__colon}> : </span>
      <span className={styles.item__title}>{dataFromUrl[property]}</span>
    </li>
  ))

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
