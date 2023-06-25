import { useQuery } from 'react-query'

import styles from './DetailInfo.module.css'
import attributesSWApi from '../../../constants/attributesSWApi'
import { getApi } from '../../../utils/api'
import {
  getNumberFromUrl,
  extractCategoryFromUrl,
} from '../../../services/getData'

export default function DetailInfo({ apiData }) {
  /**
  DetailInfo that takes apiData as a prop. 
  It extracts homeworld and species URLs from the character data, 
  and fetches data for the homeworld and species using the useQuery hook from the react-query library. 
  The component generates a list of attributes for the character using the attributesSWApi object and the character data.
   */
  const { data, route } = apiData

  let homeworldUrl = null
  let speciesUrl = null

  let idFromUrlHomeworld = null
  let CategoryFromUrlHomeworld = null

  let idFromUrlSpecies = null
  let CategoryFromUrSpecies = null

  // If the route is 'people', extract the homeworld and species data from the API response
  if (route === 'people') {
    if (data?.homeworld) {
      homeworldUrl = data?.homeworld
      idFromUrlHomeworld = getNumberFromUrl(homeworldUrl)
      CategoryFromUrlHomeworld = extractCategoryFromUrl(homeworldUrl)
    }

    if (data?.species[0]) {
      speciesUrl = data?.species[0]
      idFromUrlSpecies = getNumberFromUrl(speciesUrl)
      CategoryFromUrSpecies = extractCategoryFromUrl(speciesUrl)
    }
  }
  // Fetch the homeworld and species data using react-query
  const {
    isLoading: isDataLoading,
    data: [homeworld, species] = [],
    error: dataError,
  } = useQuery(
    ['homeworld-species', homeworldUrl, speciesUrl],
    async () => {
      const [homeworldData, speciesData] = await Promise.all([
        homeworldUrl ? getApi(homeworldUrl) : null,
        speciesUrl ? getApi(speciesUrl) : null,
      ])

      return [homeworldData, speciesData]
    },
    {
      enabled: route === 'people' && !!data,
    }
  )
  // Generate a list of attributes and their values based on the data from the API and the fetched homeworld/species data
  const results = attributesSWApi[route].map(({ property, title }) => {
    let content = null

    if (property === 'homeworld') {
      if (isDataLoading) {
        content = 'Loading...'
      } else {
        content = homeworld?.name ? (
          // If the homeworld data is available, generate a link to the homeworld category page
          <a href={`/${CategoryFromUrlHomeworld}/${idFromUrlHomeworld}`}>
            {homeworld.name}
          </a>
        ) : (
          <span>Unknown</span>
        )

        if (dataError?.message) {
          content = <span>{dataError.message}</span>
        }
      }
    } else if (property === 'species') {
      if (isDataLoading) {
        content = 'Loading...'
      } else {
        content = species?.name ? (
          <a href={`/${CategoryFromUrSpecies}/${idFromUrlSpecies}`}>
            {species.name}
          </a>
        ) : (
          <span>Unknown</span>
        )

        if (dataError?.message) {
          content = <span>{dataError.message}</span>
        }
      }
    } else {
      content = data?.[property] || 'Unknown'
    }

    return (
      <li className={styles.list__item} key={property}>
        <span className={styles.item__title}>{title}</span>
        <span>{content}</span>
      </li>
    )
  })

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list__container}>{results}</ul>
    </div>
  )
}