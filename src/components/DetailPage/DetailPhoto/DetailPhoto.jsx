import { useContext, useEffect, useState } from 'react'

import iconFavorite from './img/favorite.svg'
import iconFavoriteFill from './img/favorite-fill.svg'
import styles from './DetailPhoto.module.css'
import { FavoriteContext } from '../../../utils/Context'

export default function DetailPhoto({ detailPhotoUrl, detailName, id }) {
  const [isFavorite, setIsFavorite] = useState()

  const { addToFavorites, delFromFavorites, favorite } =
    useContext(FavoriteContext)

  useEffect(() => {
    if (favorite.some((item) => item.id === id)) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [favorite, id])

  const handleFavorites = () => {
    if (!isFavorite) {
      addToFavorites(id, detailPhotoUrl, detailName)
      setIsFavorite(true)
    } else {
      delFromFavorites(id)
      setIsFavorite(false)
    }
  }

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={detailPhotoUrl} alt={detailName} />
      <button onClick={handleFavorites} type="button">
        <img
          className={styles.favorite}
          src={!isFavorite ? iconFavorite : iconFavoriteFill}
          alt="favorites"
        />
      </button>
    </div>
  )
}
