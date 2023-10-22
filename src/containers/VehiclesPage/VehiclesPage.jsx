import Catalog from '../../components/Catalog/Сatalog'

const url = new URL('vehicles', 'https://swapi.dev/api/')

function Vehicles() {
  return <Catalog url={url} />
}
export default Vehicles
