import Catalog from '../../components/Сatalog/Сatalog'

const url = new URL('planets', 'https://swapi.dev/api/')

function Planents() {
  return <Catalog url={url} />
}
export default Planents
