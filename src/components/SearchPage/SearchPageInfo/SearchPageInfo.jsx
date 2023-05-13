import { Link } from 'react-router-dom'

import styles from './SearchPageInfo.module.css'
import NoPhoto from '../../Сatalog/ShowDataList/img/NoPhoto.svg'

function SearchPageInfo({ name, category, url, id }) {
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
          <p className={styles.person__name}>{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default SearchPageInfo
