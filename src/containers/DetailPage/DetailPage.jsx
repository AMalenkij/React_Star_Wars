import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import React, { Suspense } from 'react'

import { BASE_URL } from '../../constants/Resources'
import styles from './DetailPage.module.css'
import { getImgUrl } from '../../services/getData'
import { getApi } from '../../utils/api'
import DetailInfo from '../../components/DetailPage/DetailInfo/DetailInfo'
import LinkBack from '../../components/DetailPage/LinkBack/LinkBack'
import DetailPhoto from '../../components/DetailPage/DetailPhoto/DetailPhoto'
import UiLoading from '../../components/UI/UiLoading/UiLoading'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import useRoute from '../../hooks/useRoute'
import attributes from '../../constants/Attributes'

const DetailRalated = React.lazy(() =>
  import('../../components/DetailPage/DetailRalated/DetailRalated')
)

export function DetailPage() {
  const { id } = useParams()
  const route = useRoute()
  const detailPhotoUrl = getImgUrl(id, route)

  const { isLoading, error, data } = useQuery({
    queryKey: [route, id],
    queryFn: () => getApi(`${BASE_URL}${route}/${id}/`),
    keepPreviousData: true,
  })

  if (isLoading) return <UiLoading />
  if (error) return <ErrorMessage error={error.message} />

  const [name, array] = attributes[route][`${route}Array`]

  const addItionalInfo = array.array.map((routeInfo) => {
    if (
      Object.prototype.hasOwnProperty.call(data, routeInfo) &&
      data[routeInfo].length !== 0
    ) {
      return (
        <DetailRalated
          key={routeInfo}
          categoryUrl={routeInfo}
          urlArray={data[routeInfo]}
          attributes={attributes}
        />
      )
    }
    return null
  })

  return (
    <>
      <LinkBack />
      <div className={styles.wrapper}>
        <span className={styles.person__name}>{data.name}</span>
        <div className={styles.container}>
          <DetailPhoto
            detailPhotoUrl={detailPhotoUrl}
            personName={data.name}
            id={id}
          />
          <DetailInfo apiData={{ data, route }} attributes={attributes} />
          <Suspense fallback={<UiLoading />}>{addItionalInfo}</Suspense>
        </div>
      </div>
    </>
  )
}

export default DetailPage
