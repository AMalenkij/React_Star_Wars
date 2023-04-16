import Catalog from '../../components/Сatalog/Сatalog'

const url = new URL('vehicles', 'https://swapi.dev/api/')

function Vehicles() {
  return <Catalog url={url} />
}
export default Vehicles
