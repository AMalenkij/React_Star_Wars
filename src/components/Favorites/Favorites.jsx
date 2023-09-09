import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { FavoriteContext } from '../../utils/Context'
import ShadowFilter from '../../constants/ShadowFilter'
import { COLOR_GOLD } from '../../constants/settings'

export default function Favorite() {
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
    <div className="relative w-12 h-12">
      <Link to="/favorites">
        <div className="absolute -top-[1%] left-[50%] h-4 w-4 rounded-full drop-shadow">
          <span className="text-gold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">
            {count}
          </span>
        </div>
        <SVGFavorite color={COLOR_GOLD} />
      </Link>
    </div>
  )
}

function SVGFavorite({ color }) {
  return (
    <svg
      width="35"
      height="45"
      viewBox="0 0 35 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#shadow)">
        <path
          d="M35 44.0444L17.5 36.7044L0 44.0444V4.89333C0 2.20222 2.25 0 5 0H22.5C20.9849 1.97451 20.1168 4.36886 20.0144 6.85556C19.9164 9.34076 20.5902 11.7954 21.9433 13.8822C23.3115 15.9891 25.2855 17.6323 27.6056 18.5956C29.9427 19.5692 32.5168 19.8252 35 19.3311V44.0444Z"
          fill={color}
        />
      </g>
      <defs>
        <ShadowFilter />
      </defs>
    </svg>
  )
}
