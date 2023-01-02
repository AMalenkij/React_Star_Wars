import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";


import styles from './App.module.css';
import HomePage from "../HomePage/HomePage.jsx";
import PeoplePage from "../PeoplePage/PeoplePage.jsx";

const App = () => {
    return (
            <BrowserRouter>
                <div className={styles.wrapper}>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/people" element={<PeoplePage />} />
                    </Routes>
                </div>
            </BrowserRouter>
            )
}

export default App