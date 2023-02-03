import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import icon from './img/bookmark.svg';
import styles from './Favorite.module.css';
import {FavoriteContext} from '../../utils/Context.jsx';

const Favorite = () => {
     const {favorite} = useContext(FavoriteContext)
     const [count, setCount] = useState(0);
     

    useEffect(() => {
        const length = favorite.length;
        length.toString().length > 2 ? setCount('...') : setCount(length);
    });

    return (
        <div className={styles.container}>
            <Link to="/favorites">
                <span className={styles.counter}>{count}</span>
                <img className={styles.icon} src={icon} alt="Favorites"/>
            </Link>
        </div>
    )
}

export default Favorite;