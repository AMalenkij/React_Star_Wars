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
import swApiProps from '../../constants/swApiProps'
import DetailRalated from '../../components/DetailPage/DetailRalated/DetailRalated'

function DetailPage() {
  const { id } = useParams()
  const route = useRoute()
  const detailPhotoUrl = getImgUrl(id, route)

  const { isLoading, error, data } = useQuery([route, id], () =>
    getApi(`${BASE_URL}${route}/${id}/`)
  )

  if (isLoading) return <UiLoading />
  if (error) return <ErrorMessage error={error.message} />

  const related = swApiProps[route]

  const detailRelatedCategories = related
    .filter((relatedCategory) => data[relatedCategory]?.length)
    .map((relatedCategory) => (
      <DetailRalated
        key={relatedCategory}
        categoryUrl={relatedCategory}
        urlArray={data[relatedCategory]}
      />
    ))

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
          <DetailInfo apiData={{ data, route }} />
          <Suspense fallback={<UiLoading />}>
            {detailRelatedCategories}
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default DetailPage
