import iconFavorite from './img/favorite.svg';
import iconFavoriteFill from './img/favorite-fill.svg';

import styles from './PersonPhoto.module.css';

export function PersonPhoto ({personPhoto, personName}) {

     return(
     <div className={styles.container}>
          <img className={styles.photo} src={personPhoto} alt={personName} />
      </div>
     )
}
export default PersonPhoto