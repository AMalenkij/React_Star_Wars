import { useState, useEffect } from 'react'

import useTypeNavigation from '../../utils/writingToLocalstorageToggle'
import { getPathname } from '../../services/getData'
import LoadMore from './LoadMore/LoadMore'
import DefaultLoadPage from './DefaultLoadPage/DefaultLoadPage'
import NavMenu from './NavMenu/NavMenu'

export default function Catalog({ url }) {
  const { href, pathname } = url
  const urlSwapi = href
  const pathnameShort = getPathname(pathname)
  const { typeNavigation, setTypeNavigation } = useTypeNavigation()
  const [radioChange, setRadioChange] = useState(typeNavigation)

  useEffect(() => {
    setTypeNavigation(radioChange)
  }, [radioChange, setTypeNavigation])

  // if (pathname === '/api/films')
  //   return <LoadMore urls={{ urlSwapi, pathnameShort }} />
  return (
    <div
      className="
        shadow-border
        container 
        rounded-2xl
        bg-white
        mt-6
        mx-auto
      "
    >
      <NavMenu
        setRadioChange={setRadioChange}
        radioChange={radioChange}
        pathnameShort={pathnameShort}
      />
      {radioChange === 'infinityScroll' && (
        <LoadMore urls={{ urlSwapi, pathnameShort }} />
      )}
      {radioChange === 'pagination' && (
        <DefaultLoadPage urls={{ urlSwapi, pathnameShort }} />
      )}
    </div>
  )
}
