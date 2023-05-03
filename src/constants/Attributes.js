const attributes = {
  people: {
    peopleArray: [
      { name: 'title' },
      { array: ['starships', 'vehicles', 'planets', 'films'] },
    ],
    peopleString: [
      { title: 'Name:', property: 'name' },
      { title: 'Height:', property: 'height' },
      { title: 'Mass:', property: 'mass' },
      { title: 'Hair Color:', property: 'hair_color' },
      { title: 'Skin Color:', property: 'skin_color' },
      { title: 'Eye Color:', property: 'eye_color' },
      { title: 'Birth Year:', property: 'birth_year' },
      { title: 'Gender:', property: 'gender' },
    ],
  },
  films: {
    filmsArray: [
      { name: 'title' },
      { array: ['species', 'starships', 'vehicles', 'planets', 'characters'] },
    ],
    filmsString: [
      { title: 'Title:', property: 'title' },
      { title: 'Data Created:', property: 'data_created' },
      { title: 'Director:', property: 'director' },
      { title: 'Opening Crawl:', property: 'opening_crawl' },
    ],
  },
  starships: {
    starshipsArray: [{ name: 'model' }, { array: ['films', 'pilots'] }],
    starshipsString: [
      { title: 'Model:', property: 'model' },
      { title: 'Starship Class:', property: 'starship_class' },
      { title: 'Manufacturer:', property: 'manufacturer' },
      { title: 'Cost:', property: 'cost_in_credits' },
      { title: 'Speed:', property: 'max_atmosphering_speed' },
      { title: 'Hyperdrive Rating:', property: 'hyperdrive_rating' },
      { title: 'MGLT:', property: 'MGLT' },
      { title: 'Length:', property: 'length' },
      { title: 'Cargo Capacity:', property: 'cargo_capacity' },
      { title: 'Minimum Crew:', property: 'crew' },
      { title: 'Passengers:', property: 'passengers' },
    ],
  },
  vehicles: {
    vehiclesArray: [{ name: 'name' }, { array: ['films', 'pilots'] }],
    vehiclesString: [
      { title: 'Model:', property: 'model' },
      { title: 'Manufacturer:', property: 'manufacturer' },
      { title: 'Class:', property: 'vehicle_class' },
      { title: 'Cost:', property: 'cost_in_credits' },
      { title: 'Speed:', property: 'max_atmosphering_speed' },
      { title: 'Length:', property: 'length' },
      { title: 'Cargo Capacity:', property: 'cargo_capacity' },
      { title: 'Minimum Crew:', property: 'crew' },
      { title: 'Passengers:', property: 'passengers' },
    ],
  },
  species: {
    speciesArray: [{ name: 'name' }, { array: ['films', 'people'] }],
    speciesString: [
      { title: 'Name:', property: 'name' },
      { title: 'Classification:', property: 'classification' },
      { title: 'Designation:', property: 'designation' },
      { title: 'Language:', property: 'language' },
      { title: 'Avg Lifespan:', property: 'average_lifespan' },
      { title: 'Avg Height:', property: 'average_height' },
      { title: 'Hair Colors:', property: 'hair_colors' },
      { title: 'Skin Colors:', property: 'skin_colors' },
      { title: 'Eye Colors:', property: 'eye_colors' },
    ],
  },
  planets: {
    planetsArray: [{ name: 'name' }, { array: ['films', 'residents'] }],
    planetsString: [
      { title: 'Name:', property: 'name' },
      { title: 'Diameter:', property: 'diameter' },
      { title: 'Rotation Period:', property: 'rotation_period' },
      { title: 'Orbital Period:', property: 'orbital_period' },
      { title: 'Gravity:', property: 'gravity' },
      { title: 'Population:', property: 'population' },
      { title: 'Climate:', property: 'climate' },
      { title: 'Terrain:', property: 'terrain' },
      { title: 'Surface Water:', property: 'surface_water' },
    ],
  },
}

export default attributes
