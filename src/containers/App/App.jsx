import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";


import styles from './App.module.css';
import HomePage from "../HomePage/HomePage.jsx";
import PeoplePage from "../PeoplePage/PeoplePage.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import PersonPage from "../PersonPage/PersonPage.jsx"
import FavoritesPage from "../FavoritesPage/FavoritesPage.jsx";
import {FavoriteProvider} from '../../utils/Context.jsx';

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <FavoriteProvider>
            <BrowserRouter>
                <div className={styles.wrapper}>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/people" element={<PeoplePage/>}/>       
                        <Route path="/people/:id" element={<PersonPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                        <Route path="/not-found" element={<NotFoundPage/>}/>
                        <Route path="/favorites" element={<FavoritesPage/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
            <ReactQueryDevtools/>
            </FavoriteProvider>
        </QueryClientProvider>
    )
}

export default App