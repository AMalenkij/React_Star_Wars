import {NavLink} from "react-router-dom";
import styles from './Header.module.css';
import Favorite from "../Favorite/Favorite";
import UiToggle from '../../components/UI/UiToggle/UiToggle.jsx';

const Header = () => {
    return (
        <>
         <div className={styles.container}>
                <svg className="logo"alt="Star Wars"/>
            <ul className={styles.list__container}>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/people/?page=1">People</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
                <li><NavLink to="/not-found">Not Found</NavLink></li>
                <li><NavLink to="/fail">Fail</NavLink></li>
            </ul>
            <UiToggle/> 
            <Favorite />
        </div>
        </>
    )
}

export default Header