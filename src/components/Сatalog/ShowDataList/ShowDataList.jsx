import { Link } from 'react-router-dom'

import NoPhoto from './img/NoPhoto.svg'
import styles from './ShowDataList.module.css'

function ShowDataList({ name, url, id, pathname }) {
  return (
    <li className={styles.list__item}>
      <Link to={`/${pathname}/${id}`}>
        <img
          className={styles.photo}
          src={url}
          alt={name}
          onError={(e) => {
            e.target.src = NoPhoto
          }}
        />
        <p>{name}</p>
      </Link>
    </li>
  )
}
export default ShowDataList
