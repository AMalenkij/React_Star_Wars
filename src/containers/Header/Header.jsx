import { NavLink } from 'react-router-dom'

import Favorite from '../../components/Favorites/Favorites'
import PopUpBox from '../../components/Header/PopUpBox/PopUpBox'
import Library from '../../components/Header/Library/Library'
import Search from '../../components/Header/Search/Search'
import SVGStarWars from '../../static/SVGIcon/SVGStarWars'

export default function Header() {
  return (
    <header
      className="
       container 
       flex
       sm:border-2
       sm:border-white
       sm:rounded-3xl
       sm:bg-header
       sm:px-8 sm:py-4 sm:mt-6
       sm:shadow-drop-300
       px-4 py-2 mt-2
       justify-between
       items-center
       mx-auto
       "
    >
      <NavLink to="/">
        <SVGStarWars className="sm:h-12 h-10" />
      </NavLink>
      <nav className="hidden md:block">
        <ul className="flex gap-6 font-bold">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <Library />
          </li>
        </ul>
      </nav>
      <div className="block md:hidden">
        <Search classNameInput="w-24" />
      </div>
      <div className="flex gap-10">
        <div className="hidden md:block">
          <Search />
        </div>
        <div className="md:hidden relative">
          <PopUpBox />
        </div>
        <div className="hidden md:block">
          <Favorite />
        </div>
      </div>
    </header>
  )
}
