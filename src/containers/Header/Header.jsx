import Favorite from '../../components/Favorites/Favorites'
import Logo from '../../components/Header/Logo/Logo'
import PopUpBox from '../../components/Header/PopUpBox/PopUpBox'
import Library from '../../components/Header/Library/Library'
import Search from '../../components/Header/Search/Search'

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
      <Logo />
      <nav className="hidden md:block">
        <ul className="flex gap-6 font-bold">
          <li>Home</li>
          <li>
            <Library />
          </li>
        </ul>
      </nav>
      <div className="">
        <Search />
      </div>
      <div className="md:hidden">
        <PopUpBox />
      </div>
      <div className="hidden md:block">
        <Favorite />
      </div>
    </header>
  )
}
