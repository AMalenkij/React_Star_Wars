import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import React, { Suspense } from 'react'

import { BASE_URL } from '../../constants/Resources'
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
import UiBgWithCircles from '../../components/UI/UiBgWithCircles/UiBgWithCircles'
import { CIRCLE_SETTINGS_FOR_DETAIL_PAGE } from '../../constants/settings'

export default function DetailPage() {
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
    <div
      className="
      shadow-border
      container 
      rounded-2xl
      bg-white
      mt-6
      mx-auto
      p-3
      pt-1
      "
    >
      <div
        className=" 
      shadow-drop-300 
      bg-knob-base 
      rounded-2xl 
      border-2 
      border-white
      relative
      overflow-clip
      sm:px-16 px-2 py-4 pt-8
      "
      >
        <UiBgWithCircles circleSettings={CIRCLE_SETTINGS_FOR_DETAIL_PAGE} />
        <LinkBack />
        <div className="relative sm:flex justify-center gap-6 mt-6 mb-4">
          <DetailPhoto
            detailPhotoUrl={detailPhotoUrl}
            name={data.name}
            title={data.title}
            id={id}
            pathname={route}
          />
          <div className="sm:w-1/2 mt-6 sm:mt-0 px-12 sm:px-0">
            <DetailInfo apiData={{ data, route }} />
            <Suspense fallback={<UiLoading />}>
              {detailRelatedCategories}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
