import iconFavorite from './img/favorite.svg';
import iconFavoriteFill from './img/favorite-fill.svg';
import styles from './PersonPhoto.module.css';
import {FavoriteContext} from '../../../utils/Context.jsx';

import {useContext, useEffect, useState} from 'react'

export function PersonPhoto({
                                personPhoto,
                                personName,
                                id
                            }) {

    const [boolFavorites, setboolFavorites] = useState()

    const {addToFavorites, delFromFavorites, favorite} = useContext(FavoriteContext)

    useEffect(() => {
        if (favorite.some((item) => item.id === id)) {
            setboolFavorites(true)
        } else {
            setboolFavorites(false)
        }
    }, [favorite])

    const handlFavorites = () => {
        if (!boolFavorites) {
            addToFavorites(id, personPhoto, personName);
            setboolFavorites(true);
        } else {
            delFromFavorites(id);
            setboolFavorites(false)
        }
    }

    return (
        <div className={styles.container}>
            <img className={styles.photo} src={personPhoto} alt={personName}/>
            <img
                className={styles.favorite}
                src={!boolFavorites ? iconFavorite : iconFavoriteFill}
                onClick={handlFavorites}
                alt='favorites'
            />
        </div>
    )
}

export default PersonPhoto