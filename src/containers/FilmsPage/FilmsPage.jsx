import Catalog from '../../components/Сatalog/Сatalog'

const url = new URL('films', 'https://swapi.dev/api/')

function Films() {
  return <Catalog url={url} />
}
export default Films
