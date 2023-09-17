import { useContext, useEffect, useState } from 'react'

import { FavoriteContext } from '../../../utils/Context'
import ShadowFilter from '../../../constants/ShadowFilter'
import NoPhoto from '../../Сatalog/ShowDataList/img/NoPhoto.svg'

export default function DetailPhoto({
  detailPhotoUrl,
  detailName,
  id,
  pathname,
}) {
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
      addToFavorites(id, detailPhotoUrl, detailName, pathname)
      setIsFavorite(true)
    } else {
      delFromFavorites(id)
      setIsFavorite(false)
    }
  }

  return (
    <div className="h-1/2 flex sm:static justify-center ">
      <div className=" sm:flex ">
        <h2 className="sm:[writing-mode:sideways-lr] text-2xl xl:text-5xl sm:text-3xl  sm:pb-6  pb-1 text-start ">
          {detailName}
        </h2>
        <div className="relative">
          <img
            className="rounded-2xl shadow-card object-cover object-center "
            src={detailPhotoUrl}
            alt={detailName}
            onError={(e) => {
              e.target.src = NoPhoto
            }}
          />
          <button
            className="absolute w-8 h-8 -top-2 right-2"
            onClick={handleFavorites}
            type="button"
          >
            {!isFavorite ? (
              <BookmarkIcon fill="#EEBF00" />
            ) : (
              <BookmarkIcon color="#EEBF00" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function BookmarkIcon({ color, fill }) {
  return (
    <svg viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#shadow)">
        <path
          d="M10.18.5c.442 0 .82.17 1.133.508.338.338.507.729.507 1.172V15.5L6 13 .18 15.5V2.18c0-.443.156-.834.468-1.172C.987.669 1.378.5 1.82.5h8.36Z"
          fill={color}
          stroke={fill}
          strokeWidth="1"
        />
      </g>
      <ShadowFilter />
    </svg>
  )
}
