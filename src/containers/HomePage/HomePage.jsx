import r2d2AndC3po from '../../static/Img/r2d2AndC3po.webp'
import SVGStarWars from '../../static/SVGIcon/SVGStarWars'
import Search from '../../components/Header/Search/Search'

export default function HomePage() {
  const disableDropdownMenu = false
  return (
    <div className="h-min-screen container mx-auto sm:mt-20 mt-4 mr-14 sm:flex">
      <div>
        <SVGStarWars className="sm:p-0 p-2 max-h-[30vh]" />
        <div className=" mt-3 p-2 text-xl hidden sm:block">
          <p>
            Here, you&apos;ll discover characters, races, films, starships,
            planets, and vehicles that were first introduced in the canonical
            series of movies. Immerse yourself in the richness of this universe,
            exploring its many facets.
          </p>
          <br />
          <p>
            Welcome to a galaxy of boundless adventures and great stories —
            welcome to the world of Star Wars.
          </p>
        </div>
        <div className="pt-3 hidden sm:block">
          <Search disableDropdownMenu={disableDropdownMenu} />
        </div>
      </div>
      <img
        className="
      sm:-mt-16
      lg:h-[100vh]
      md:h-[75vh]
      sm:h-[65vh]
      "
        src={r2d2AndC3po}
        alt="R2D and C-3PO"
      />
      <div className="p-6 ml-2 sm:hidden block">
        <Search disableDropdownMenu={disableDropdownMenu} />
      </div>
    </div>
  )
}
