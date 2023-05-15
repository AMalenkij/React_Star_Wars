import { Link } from 'react-router-dom'

import styles from './SearchPageInfo.module.css'
import NoPhoto from '../../Сatalog/ShowDataList/img/NoPhoto.svg'

function SearchPageInfo({ attributes: { name, title }, category, url, id }) {
  let attributTitle = null
  if (category === 'films') {
    attributTitle = title
  } else {
    attributTitle = name
  }

  return (
    <li className={styles.list__item}>
      <Link to={`/${category}/${id}`}>
        <img
          className={styles.person__photo}
          src={url}
          alt={name}
          onError={(e) => {
            e.target.src = NoPhoto
          }}
        />
        <div className={styles.container__text}>
          <p className={styles.category__name}>{category}</p>
          <p className={styles.person__name}>{attributTitle}</p>
        </div>
      </Link>
    </li>
  )
}

export default SearchPageInfo
