import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import React, { Suspense, useEffect, useState } from 'react'

import { BASE_URL } from '../../constants/Resources'
import styles from './PersonPage.module.css'
import { getImgUrl, getRouteFromUrl } from '../../services/getData'
import { getApi } from '../../utils/api'
// eslint-disable-next-line no-unused-vars
import PersonInfo from '../../components/PersonPage/PersonInfo/PersonInfo'
import PersonLinkBack from '../../components/PersonPage/PersonLinkBack/PersonLinkBack'
import PersonPhoto from '../../components/PersonPage/PersonPhoto/PersonPhoto'
import UiLoading from '../../components/UI/UiLoading/UiLoading'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

// eslint-disable-next-line no-unused-vars
const PersonFilms = React.lazy(() =>
  import('../../components/PersonPage/PersonFilms/PersonFilms')
)

export function PersonPage() {
  const { id } = useParams()

  const [routeUrl, setRouteUrl] = useState(window.location.pathname)

  useEffect(() => {
    const handlePathnameChange = () => setRouteUrl(window.location.pathname)
    window.addEventListener('popstate', handlePathnameChange)
    return () => window.removeEventListener('popstate', handlePathnameChange)
  }, [])

  const route = getRouteFromUrl(routeUrl)

  const personPhoto = getImgUrl(id, route)
  const { isLoading, error, data } = useQuery({
    queryKey: [routeUrl, id],
    queryFn: () => getApi(`${BASE_URL}${route}/${id}/`),
    keepPreviousData: true,
  })
  if (isLoading) return <UiLoading />

  if (error) return <ErrorMessage error={error.message} />

  return (
    <>
      <PersonLinkBack />
      <div className={styles.wrapper}>
        <span className={styles.person__name}>{data.name}</span>
        <div className={styles.container}>
          <PersonPhoto
            personPhoto={personPhoto}
            personName={data.name}
            id={id}
          />
          {/* <PersonInfo data={data} /> */}
          {/* <Suspense fallback={<UiLoading />}>
            <PersonFilms urls={data.films} id={id} />
          </Suspense> */}
        </div>
      </div>
    </>
  )
}

export default PersonPage
