import {Link} from 'react-router-dom';

import styles from './SearchPageInfo.module.css';

function SearchPageInfo({name, url, id}) {
    return (
        <>
            <li className={styles.list__item}>
                <Link to={`/people/${id}`}>
                    <img className={styles.person__photo} src={url} alt={name}/>
                    <p className={styles.person__name}>{name}</p>
                </Link>
            </li>

        </>
    )

}

export default SearchPageInfo;