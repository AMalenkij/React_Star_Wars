import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
            <>
            <ul className={styles.list__container}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/people">People</NavLink></li>
                </ul>
            </>
            )
}

export default Header