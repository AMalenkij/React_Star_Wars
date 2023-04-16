import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'
import Favorite from '../Favorite/Favorite'

function Header() {
  return (
    <div className={styles.container}>
      <svg className="logo" alt="Star Wars" />
      <ul className={styles.list__container}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/people/?page=1">People</NavLink>
        </li>
        <li>
          <NavLink to="/planets/?page=1">Planets</NavLink>
        </li>
        <li>
          <NavLink to="/films/?page=1">Films</NavLink>
        </li>
        <li>
          <NavLink to="/species/?page=1">Species</NavLink>
        </li>
        <li>
          <NavLink to="/starships/?page=1">Starships</NavLink>
        </li>
        <li>
          <NavLink to="/vehicles/?page=1">Vehicles</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/not-found">Not Found</NavLink>
        </li>
        <li>
          <NavLink to="/fail">Fail</NavLink>
        </li>
      </ul>
      <Favorite />
    </div>
  )
}

export default Header
