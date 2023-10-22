import Catalog from '../../components/Catalog/Сatalog'

const url = new URL('species', 'https://swapi.dev/api/')

function Species() {
  return <Catalog url={url} />
}
export default Species
