import imgLightSide from './img/light-side.jpg';
import imgDarkSide from './img/dark-side.jpg';
import imgFalcon from './img/falcon.jpg';

import styles from './ChooseSide.module.css';
import {useTheme} from '../../../utils/theme.js';

export function ChooseSide() {

    const {setTheme} = useTheme()

    return (
        <nav className={styles.container}>
            <div className="item__light item" onClick={() => setTheme('light')}>
                <div className={styles.item__header}>Light Side</div>
                <img className={styles.item__img} src={imgLightSide} alt='Light Side'/>
            </div>

            <div className='item__dark item' onClick={() => setTheme('dark')}>
                <div className={styles.item__header}>Dark Side</div>
                <img className={styles.item__img} src={imgDarkSide} alt='Light Side'/>
            </div>

            <div className='item__neitral item' onClick={() => setTheme('default')}>
                <div className={styles.item__header}>I'm Han Solo"</div>
                <img className={styles.item__img} src={imgFalcon} alt='Light Side'/>
            </div>
        </nav>
    )
}

export default ChooseSide