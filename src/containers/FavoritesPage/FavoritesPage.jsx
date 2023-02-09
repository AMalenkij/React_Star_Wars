import styles from './FavoritesPage.module.css';
import {FavoriteContext} from '../../utils/Context.jsx';
import {useContext} from 'react';

import PeopleList from "../../components/PeopleList/PeopleList.jsx";


function FavoritesPage() {
    const {favorite} = useContext(FavoriteContext)

    const result = favorite.map(({namePeople, imgSrc, id}) => {
        return <PeopleList key={id} name={namePeople} url={imgSrc} id={id}/>
    })


    return (
        <>
            <h1 className="header__text">Favorites</h1>
            <ul className={styles.list__container}>{result}</ul>
        </>
    )
}


export default FavoritesPage;