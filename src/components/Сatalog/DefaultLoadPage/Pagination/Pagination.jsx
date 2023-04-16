import { Link } from 'react-router-dom'

import styles from './Pagination.module.css'

function Pagination({ setPage, page, nextPage, isPrevDt, pathname }) {
  return (
    <nav className={styles.nav}>
      <Link to={`/${pathname}/?page=${page - 1}`}>
        <button
          type="button"
          className={styles.button}
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
        >
          Prev Page
        </button>
      </Link>
      <Link to={`/${pathname}/?page=${page + 1}`}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setPage((old) => old + 1)}
          disabled={!isPrevDt && !nextPage}
        >
          Next Page
        </button>
      </Link>
    </nav>
  )
}
export default Pagination
