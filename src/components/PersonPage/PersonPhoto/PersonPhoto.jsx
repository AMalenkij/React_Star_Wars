import iconFavorite from './img/favorite.svg';
import iconFavoriteFill from './img/favorite-fill.svg';
import styles from './PersonPhoto.module.css';
import {FavoriteContext} from '../../../utils/Context.jsx';

import {useContext} from 'react'

export function PersonPhoto ({
     personPhoto, 
     personName, 
     inFavorites, 
     setInFavorites,
     id
}) {

     const {addToFavorites, delFromFavorites} = useContext(FavoriteContext)

     const handlFavorites = () => {
          if (!inFavorites){
               addToFavorites(id, personPhoto, personName);
               setInFavorites(true);
          } else {
               delFromFavorites(id);
               setInFavorites(false)
          }
     }

     return(
     <div className={styles.container}>
          <img className={styles.photo} src={personPhoto} alt={personName}/>
          <img 
          className={styles.favorite}
          src={!inFavorites ? iconFavorite : iconFavoriteFill } 
          onClick={handlFavorites}
          alt='favorites'
          />
      </div>
     )
}
export default PersonPhoto