import { useQuery } from 'react-query'

import UiLoading from '../../UI/UiLoading/UiLoading'
import styles from './DetailRalated.module.css'
import { getApi } from '../../../utils/api'
import attributesSWApi from '../../../constants/attributesSWApi'

export function DetailRalated({ categoryUrl, urlArray }) {
  const results = urlArray?.map((url) => {
    const category = [
      'characters',
      'pilots',
      'residents',
      'characters',
    ].includes(categoryUrl)
      ? 'people'
      : categoryUrl

    const [title] = attributesSWApi[category]

    const { isLoading, error, data } = useQuery(url, () => getApi(url), {
      keepPreviousData: true,
    })

    if (isLoading) return <UiLoading />
    if (error) return `An error has occurred: ${error.message}`

    if (data) {
      return (
        <li className={styles.list__item} key={url}>
          <span className={styles.item__episode}>{title.title}</span>
          <span className={styles.item__colon}> : </span>
          <span className={styles.item__title}>{data[title.property]}</span>
        </li>
      )
    }

    return null
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
