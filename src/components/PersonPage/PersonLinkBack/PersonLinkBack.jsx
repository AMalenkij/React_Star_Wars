/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from 'react-router'
import iconBack from './img/back.svg'

import styles from './PersonLinkBack.module.css'

export function PersonLinkBack() {
  const navigation = useNavigate()

  const hanleGoBack = (e) => {
    e.preventDefault()
    navigation(-1)
  }
  return (
    <div>
      <a type="button" onClick={hanleGoBack} className={styles.link} href="#">
        <img className={styles.link__img} src={iconBack} alt="Go back" />
        <span>Go back</span>
      </a>
    </div>
  )
}

export default PersonLinkBack
