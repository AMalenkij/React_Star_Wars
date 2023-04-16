import styles from './PersonInfo.module.css'

export function PersonInfo({ data }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list__container}>
        <li className={styles.list__item}>
          <span className={styles.item__title}>Height: </span>
          {data.height}
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__title}>Mass: </span>
          {data.mass}
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__title}>Hair Color: </span>
          {data.hair_color}
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__title}>Skin Color: </span>
          {data.skin_color}
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__title}>Eye Color: </span>
          {data.eye_color}
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__title}>Birth Year: </span>
          {data.birth_year}
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__title}>Gender: </span>
          {data.gender}
        </li>
      </ul>
    </div>
  )
}
export default PersonInfo
