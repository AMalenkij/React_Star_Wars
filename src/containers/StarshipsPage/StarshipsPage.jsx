import Catalog from '../../components/Сatalog/Сatalog'

const url = new URL('starships', 'https://swapi.dev/api/')

function Starships() {
  return <Catalog url={url} />
}
export default Starships
