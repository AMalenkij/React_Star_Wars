import imgLightSide from './img/light-side.jpg'
import imgDarkSide from './img/dark-side.jpg'
import imgFalcon from './img/falcon.jpg'
import styles from './ChooseSide.module.css'
import { useTheme } from '../../../utils/theme'

export function ChooseSide() {
  const { setTheme } = useTheme()

  return (
    <nav className={styles.container}>
      <div
        className="item__light item"
        onClick={() => setTheme('light')}
        onKeyDown={(e) => e.key === 'Enter' && setTheme('light')}
        role="button"
        tabIndex={0}
      >
        <div className={styles.item__header}>Light Side</div>
        <img className={styles.item__img} src={imgLightSide} alt="Light Side" />
      </div>

      <div
        className="item__dark item"
        onClick={() => setTheme('dark')}
        onKeyDown={(e) => e.key === 'Enter' && setTheme('dark')}
        role="button"
        tabIndex={0}
      >
        <div className={styles.item__header}>Dark Side</div>
        <img className={styles.item__img} src={imgDarkSide} alt="Dark Side" />
      </div>

      <div
        className="item__neitral item"
        onClick={() => setTheme('default')}
        onKeyDown={(e) => e.key === 'Enter' && setTheme('default')}
        role="button"
        tabIndex={0}
      >
        <div className={styles.item__header}>I&apos;m Han Solo</div>
        <img className={styles.item__img} src={imgFalcon} alt="Han Solo" />
      </div>
    </nav>
  )
}

export default ChooseSide
