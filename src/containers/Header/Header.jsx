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
       shadow-drop-300
       container 
       flex
       border-2
       border-white
       rounded-3xl
       bg-header
       px-8 py-4 mt-6
       justify-between
       items-center
       mx-auto
       "
    >
      <NavLink to="/">
        <SVGStarWars className="h-12" />
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
        <div className="md:hidden">
          <PopUpBox />
        </div>
        <div className="hidden md:block">
          <Favorite />
        </div>
      </div>
    </header>
  )
}
