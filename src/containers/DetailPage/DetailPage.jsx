import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import React, { Suspense, useEffect, useContext } from 'react'

import { BASE_URL } from '../../constants/Resources'
import { getImgUrl } from '../../services/getData'
import { getApi } from '../../utils/api'
import DetailInfo from '../../components/DetailPage/DetailInfo/DetailInfo'
import LinkBack from '../../components/DetailPage/LinkBack/LinkBack'
import DetailPhoto from '../../components/DetailPage/DetailPhoto/DetailPhoto'
import UiLoading from '../../components/UI/UiLoading/UiLoading'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import swApiProps from '../../constants/swApiProps'
import DetailRalated from '../../components/DetailPage/DetailRalated/DetailRalated'
import UiBgWithCircles from '../../components/UI/UiBgWithCircles/UiBgWithCircles'
import { CIRCLE_SETTINGS_FOR_DETAIL_PAGE } from '../../constants/settings'
import { LoadingContext } from '../../utils/ContextLoading'

export default function DetailPage() {
  const { loading, handleLoading } = useContext(LoadingContext)
  const { catalog, id } = useParams()
  const detailPhotoUrl = getImgUrl(id, catalog)

  const { isLoading, error, data } = useQuery([catalog, id], () =>
    getApi(`${BASE_URL}${catalog}/${id}/`)
  )
  useEffect(() => {
    if (isLoading && !loading) {
      handleLoading()
    }
    if (data && loading) {
      handleLoading()
    }
  }, [isLoading, loading, handleLoading, data])

  if (isLoading) {
    return null
  }
  if (error) {
    return <ErrorMessage error={error.message} />
  }

  const related = swApiProps[catalog]

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
            pathname={catalog}
          />
          <div className="sm:w-1/2 mt-6 sm:mt-0 px-12 sm:px-0">
            <DetailInfo apiData={{ data, catalog }} />
            <Suspense fallback={<UiLoading />}>
              {detailRelatedCategories}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
