import {NavLink} from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import imgSpaceStation from './img/space-station.svg';
import imgDroid from './img/droid.svg';
import imgLightsaber from './img/lightsaber.svg';
import Favorite from "../Favorite/Favorite";

const Header = () => {
    const [icon, setIcon] = useState(imgSpaceStation);

    return (
        <>
         <div className={styles.container}>
            <img className={styles.logo} src={icon} alt="Star Wars"/>

            <ul className={styles.list__container}>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/people/?page=1">People</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
                <li><NavLink to="/not-found">Not Found</NavLink></li>
                <li><NavLink to="/fail">Fail</NavLink></li>
            </ul>

            <Favorite />
        </div>
        </>
    )
}

export default Header