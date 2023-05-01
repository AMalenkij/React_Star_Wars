import useFetchData from '../../../hooks/useFetchData'
import UiLoading from '../../UI/UiLoading/UiLoading'
import { extractCategoryFromUrl } from '../../../services/getData'
import styles from './DetailRalated.module.css'

export function DetailRalated({ urls, detailPageId, attributes }) {
  let result = null
  urls?.forEach((route) => {
    const categoryUrl = extractCategoryFromUrl(route)
    const routeString = `${categoryUrl}String`
    const [title] = attributes[categoryUrl][routeString]

    const { isLoading, error, data } = useFetchData(route, detailPageId)

    if (isLoading) result = <UiLoading />
    if (error) result = `An error has occurred: ${error.message}`

    if (data) {
      result = (
        <div key={detailPageId} className={styles.wrapper}>
          <div className={styles.category__wrapper}>
            <span className={styles.category__tag}>{categoryUrl}</span>
          </div>
          <ul className={styles.list__container}>
            <li className={styles.list__item}>
              <span className={styles.item__episode}>{title.title}</span>
              <span className={styles.item__colon}> : </span>
              <span className={styles.item__title}>{data[title.property]}</span>
            </li>
          </ul>
        </div>
      )
    }
  })

  return result
}

export default DetailRalated
