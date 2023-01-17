import styles from './Pagination.module.css'

function Pagination ({setPage, page, nextPage, isPrevDt}) {
    return (
        <nav className={styles.nav}>
            <button className={styles.buttons}
            disabled={page === 1}
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            >Prev Page
            </button>
            <button className={styles.buttons}
            onClick={() => setPage((old) => old + 1)}
            disabled={!isPrevDt && !nextPage}>Next Page
            </button>
        </nav>
    )
}
export default Pagination