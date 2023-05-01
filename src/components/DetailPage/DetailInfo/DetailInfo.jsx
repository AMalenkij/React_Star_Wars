import styles from './DetailInfo.module.css'

export function DetailInfo({ apiData, attributes }) {
  const { data, route } = apiData
  const routeString = `${route}String`

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list__container}>
        {attributes[route][routeString].map((item) => (
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
