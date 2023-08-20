import React, { useEffect } from 'react'

import { getPathname } from '../../services/getData'
import UiToggle from '../UI/UiToggle/UiToggle'
import useToggleBtn from '../../hooks/useToggleBtn'
import useTypeNavigation from '../../utils/writingToLocalstorageToggle'
import LoadMore from './LoadMore/LoadMore'
import DefaultLoadPage from './DefaultLoadPage/DefaultLoadPage'

export default function Catalog({ url }) {
  const { href, pathname } = url

  const urlSwapi = href
  const pathnameShort = getPathname(pathname)
  const { typeNavigation, setTypeNavigation } = useTypeNavigation()
  const [isChecked, handleToggle] = useToggleBtn(typeNavigation)

  useEffect(() => {
    setTypeNavigation(isChecked)
  }, [isChecked, setTypeNavigation])

  if (pathname === '/api/films')
    return <LoadMore urls={{ urlSwapi, pathnameShort }} />

  return (
    <>
      <UiToggle isChecked={isChecked} handleToggle={handleToggle} />
      {isChecked ? (
        <DefaultLoadPage urls={{ urlSwapi, pathnameShort }} />
      ) : (
        <LoadMore urls={{ urlSwapi, pathnameShort }} />
      )}
    </>
  )
}