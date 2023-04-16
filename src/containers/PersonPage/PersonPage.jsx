import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import React, { Suspense } from 'react'

import { API_PERSON } from '../../constants/Resources'
import styles from './PersonPage.module.css'
import { getImgUrl } from '../../services/getData'
import { getApi } from '../../utils/api'
import PersonInfo from '../../components/PersonPage/PersonInfo/PersonInfo'
import PersonLinkBack from '../../components/PersonPage/PersonLinkBack/PersonLinkBack'
import PersonPhoto from '../../components/PersonPage/PersonPhoto/PersonPhoto'
import UiLoading from '../../components/UI/UiLoading/UiLoading'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const PersonFilms = React.lazy(() =>
  import('../../components/PersonPage/PersonFilms/PersonFilms')
)

export function PersonPage() {
  const { id } = useParams()
  const personPhoto = getImgUrl(id)

  const { isLoading, error, data } = useQuery({
    queryKey: ['people', id],
    queryFn: () => getApi(`${API_PERSON}/${id}/`),
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
          <PersonInfo data={data} />
          <Suspense fallback={<UiLoading />}>
            <PersonFilms urls={data.films} id={id} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default PersonPage
