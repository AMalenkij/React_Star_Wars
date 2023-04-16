import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Header from '../../components/Header/Header'
import styles from './App.module.css'
import HomePage from '../HomePage/HomePage'
import PeoplePage from '../PeoplePage/PeoplePage'
import PlanetsPage from '../PlanetsPage/PlanetsPage'
import FilmsPage from '../FilmsPage/FilmsPage'
import StarshipsPage from '../StarshipsPage/StarshipsPage'
import VehiclesPage from '../VehiclesPage/VehiclesPage'
import SpeciesPage from '../SpeciesPage/SpeciesPage'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import PersonPage from '../PersonPage/PersonPage'
import FavoritesPage from '../FavoritesPage/FavoritesPage'
import SearchPage from '../SearchPage/SearchPage'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { FavoriteProvider } from '../../utils/Context'
import { useTheme } from '../../utils/theme'

const queryClient = new QueryClient()

function App() {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        <BrowserRouter>
          <div className={styles.wrapper}>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/planets" element={<PlanetsPage />} />
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/species" element={<SpeciesPage />} />
              <Route path="/starships" element={<StarshipsPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/planets/:id" element={<PersonPage />} />
              <Route path="/people/:id" element={<PersonPage />} />
              <Route path="/films/:id" element={<PersonPage />} />
              <Route path="/vehicles/:id" element={<PersonPage />} />
              <Route path="/starships/:id" element={<PersonPage />} />
              <Route path="/species/:id" element={<PersonPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/fail" element={<ErrorMessage />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools />
      </FavoriteProvider>
    </QueryClientProvider>
  )
}

export default App
