import {Link} from "react-router-dom";

import styles from './PeopleList.module.css'



function PeopleList ({ name, url, id }) {
    return (
    <li className={styles.list__item}>
        <Link to={`/people/${id}`}>
            <img className={styles.person__photo} src={url} alt={name}/>
            <p>{name}</p>
        </Link>
    </li>
    )
}
export default PeopleList