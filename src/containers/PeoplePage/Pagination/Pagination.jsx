import styles from './Pagination.module.css'

const Pagination = ({prevPg, nextPg, prevPage, nextPage}) => {
    return (
        <nav className={styles.nav}>
            <button className={styles.buttons} onClick={prevPg} disabled={!prevPage}>Prev Page</button>
            <button className={styles.buttons} onClick={nextPg} disabled={!nextPage}>Next Page</button>
        </nav>
    )
}
export default Pagination