import styles from './PersonInfo.module.css'
import attributes from '../../../constants/Attributes'

export function PersonInfo({ apiData }) {
  const { data, route } = apiData
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list__container}>
        {attributes[route].map((item) => (
          <li className={styles.list__item} key={item.property}>
            <span className={styles.item__title}>{item.title}</span>
            {data[item.property]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PersonInfo
