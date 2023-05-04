import styles from './DetailInfo.module.css'
import attributesSWApi from '../../../constants/attributesSWApi'

export function DetailInfo({ apiData }) {
  const { data, route } = apiData

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list__container}>
        {attributesSWApi[route].map((item) => (
          <li className={styles.list__item} key={item.property}>
            <span className={styles.item__title}>{item.title}</span>
            {data[item.property]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DetailInfo
