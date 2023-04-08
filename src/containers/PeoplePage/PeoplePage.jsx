import React, { useEffect } from 'react'

import UiToggle from '../../components/UI/UiToggle/UiToggle'
import useToggleBtn from '../../hooks/useToggleBtn'
import useTypeNavigation from '../../utils/writingToLocalstorageToggle'
import LoadMore from '../../components/PeopleList/LoadMore/LoadMore'
import PageByPage from '../../components/PeopleList/PageByPage/PageByPage'

function PeoplePage() {
  const { typeNavigation, setTypeNavigation } = useTypeNavigation()
  const [isChecked, handleToggle] = useToggleBtn(typeNavigation)

  useEffect(() => {
    setTypeNavigation(isChecked)
  }, [isChecked, setTypeNavigation])

  return (
    <>
      <UiToggle isChecked={isChecked} handleToggle={handleToggle} />
      {isChecked ? <PageByPage /> : <LoadMore />}
    </>
  )
}
export default PeoplePage
