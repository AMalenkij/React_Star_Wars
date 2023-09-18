import { Link } from 'react-router-dom'

import ShadowFilter from '../../../../constants/ShadowFilter'

function SVGBack({ rotate }) {
  return (
    <svg
      width="12"
      height="23"
      viewBox="0 0 12 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <g filter="url(#shadow)">
        <path
          d="m2.069 11.143 9.68-9.68A.857.857 0 1 0 10.537.251L.251 10.537a.857.857 0 0 0 0 1.212l10.286 10.286a.857.857 0 0 0 1.212-1.212l-9.68-9.68Z"
          fill="#EEBF00"
        />
      </g>
      <defs>
        <ShadowFilter />
      </defs>
    </svg>
  )
}
export default function Pagination({
  setPage,
  page,
  nextPage,
  isPrevDt,
  pathname,
}) {
  return (
    <nav className="flex justify-center p-8 gap-6">
      <Link to={`/${pathname}/?page=${page - 1}`}>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="
          h-12
          px-8
          flex 
          justify-center 
          gap-4
          items-center
          shadow-drop-400
          rounded-xl
          hover:shadow-drop-300
          disabled:opacity-50"
        >
          <SVGBack /> Prev Page
        </button>
      </Link>
      <Link to={`/${pathname}/?page=${page + 1}`}>
        <button
          type="button"
          onClick={() => setPage((old) => old + 1)}
          disabled={!isPrevDt && !nextPage}
          className="
          h-12
          px-8
          flex 
          justify-center 
          gap-4
          items-center
          shadow-drop-400
          rounded-xl
          hover:shadow-drop-300
          disabled:opacity-50"
        >
          Next Page <SVGBack rotate={180} />
        </button>
      </Link>
    </nav>
  )
}
