import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import icon from './img/bookmark.svg'
import styles from './Favorite.module.css'
import { FavoriteContext } from '../../utils/Context'

function Favorite() {
  const { favorite } = useContext(FavoriteContext)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const { length } = favorite
    if (length.toString().length > 2) {
      setCount('...')
    } else {
      setCount(length)
    }
  }, [favorite, setCount])

  return (
    <div className={styles.container}>
      <Link to="/favorites">
        <span className={styles.counter}>{count}</span>
        <img className={styles.icon} src={icon} alt="Favorites" />
      </Link>
    </div>
  )
}

export default Favorite
