import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { FavoriteContext } from '../../utils/Context'

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
    <Link className="relative" to="/favorites">
      <div className="absolute h-4 w-4 rounded-full mx-6 drop-shadow">
        <span className="text-golden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">
          {count}
        </span>
      </div>
      <SVGFavorite />
    </Link>
  )
}

function SVGFavorite() {
  return (
    <svg
      width="35"
      height="45"
      viewBox="0 0 35 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_58_72)">
        <path
          d="M35 44.0444L17.5 36.7044L0 44.0444V4.89333C0 2.20222 2.25 0 5 0H22.5C20.9849 1.97451 20.1168 4.36886 20.0144 6.85556C19.9164 9.34076 20.5902 11.7954 21.9433 13.8822C23.3115 15.9891 25.2855 17.6323 27.6056 18.5956C29.9427 19.5692 32.5168 19.8252 35 19.3311V44.0444Z"
          fill="#EEBF00"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_58_72"
          x="0"
          y="0"
          width="35"
          height="48.0444"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_58_72"
          />
        </filter>
      </defs>
    </svg>
  )
}
