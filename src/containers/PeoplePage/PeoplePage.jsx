import Catalog from '../../components/Catalog/Сatalog'

const url = new URL('people', 'https://swapi.dev/api/')

function People() {
  return <Catalog url={url} />
}
export default People
