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

  let componentToRender = null

  if (radioChange === 'pagination') {
    componentToRender = (
      <DefaultLoadPage urlSwapi={urlSwapi} pathnameShort={pathnameShort} />
    )
  } else if (radioChange === 'infinityScroll') {
    if (pathname === '/api/films') {
      componentToRender = (
        <DefaultLoadPage urlSwapi={urlSwapi} pathnameShort={pathnameShort} />
      )
    } else {
      componentToRender = (
        <LoadMore urlSwapi={urlSwapi} pathnameShort={pathnameShort} />
      )
    }
  }
  return (
    <div
      className="
        sm:shadow-border
        sm:rounded-2xl
      sm:bg-white
        sm:mt-6
        container 
        mx-auto
      "
    >
      <NavMenu
        setRadioChange={setRadioChange}
        radioChange={radioChange}
        pathnameShort={pathnameShort}
      />
      {componentToRender}
    </div>
  )
}
