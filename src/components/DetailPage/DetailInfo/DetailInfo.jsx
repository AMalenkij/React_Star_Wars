import styles from './DetailInfo.module.css'
import attributesSWApi from '../../../constants/attributesSWApi'

export function DetailInfo({ apiData: { data, route } }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list__container}>
        {attributesSWApi[route].map(({ property, title }) => (
          <li className={styles.list__item} key={property}>
            <span className={styles.item__title}>{title}</span>
            {data[property]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DetailInfo
