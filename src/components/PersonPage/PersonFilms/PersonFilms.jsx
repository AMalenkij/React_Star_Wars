import { useQuery } from 'react-query'

import { getConcurrentApi } from '../../../utils/api'
import UiLoading from '../../UI/UiLoading/UiLoading'
import styles from './PersonFilms.module.css'

export function PersonFilms({ urls, id }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getConcurrentApi(urls),
  })

  if (isLoading) return <UiLoading />
  if (error) return `An error has occurred: ${error.message}`

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list__container}>
        {data
          .sort((a, z) => a.episodeId - z.episode_id)
          .map(({ title, episodeId }) => (
            <li className={styles.list__item} key={episodeId}>
              <span className={styles.item__episode}>Episode {episodeId}</span>
              <span className={styles.item__colon}> : </span>
              <span className={styles.item__title}>{title}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default PersonFilms