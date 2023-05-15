const swApiProps = {
  people: ['starships', 'vehicles', 'planets', 'films'],
  films: ['species', 'starships', 'vehicles', 'planets', 'characters'],
  starships: ['films', 'pilots'],
  vehicles: ['films', 'pilots'],
  species: ['films', 'people'],
  planets: ['films', 'residents'],
}

export default swApiProps

export const CATEGORY = [
  'people',
  'species',
  'films',
  'starships',
  'planets',
  'vehicles',
]
