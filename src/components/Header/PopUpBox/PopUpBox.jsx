import { useState } from 'react'
import { Link } from 'react-router-dom'

import UIBtnHamburger from '../../UI/UIBtnHamburger/UIBtnHamburger'
import SVGFilms from '../Tabs/CardInTab/img/SVGFilms'
import SVGCharacters from '../Tabs/CardInTab/img/SVGCharacters'
import SVGSpecies from '../Tabs/CardInTab/img/SVGSpecies'
import SVGStarships from '../Tabs/CardInTab/img/SVGStarships'
import SVGPlanets from '../Tabs/CardInTab/img/SVGPlanets'
import SVGVehicles from '../Tabs/CardInTab/img/SVGVehicles'
import SVGHome from './img/SVGHome'
import Favorites from '../../Favorites/Favorites'

const CATEGORY_SVG_COMPONENTS = {
  Home: SVGHome,
  Films: SVGFilms,
  People: SVGCharacters,
  Species: SVGSpecies,
  Starships: SVGStarships,
  Planets: SVGPlanets,
  Vehicles: SVGVehicles,
  Favorites,
}

export default function PopUpBox() {
  const [isShowing, setIsShowing] = useState(false)
  const handleNav = () => setIsShowing(!isShowing)

  return (
    <>
      <div
        className={`
        container  
        w-[100%] 
        fixed 
        h-full 
        top-0
        px-8 py-4
        ease-in-out 
        duration-500
        z-30
         ${isShowing ? 'left-0 bg-knob-base' : ' -left-[100%]'}`}
      >
        <h3 className="mt-12 mb-4 text-3xl">Menu</h3>
        <nav>
          <ul>
            {Object.keys(CATEGORY_SVG_COMPONENTS).map((category) => {
              const SVGComponent = CATEGORY_SVG_COMPONENTS[category]
              const svgProps = {
                color: '#EEBF00',
              }
              return (
                <li key={category}>
                  <button
                    type="button"
                    className="text-xl flex items-center px-3 py-2"
                    onClick={handleNav}
                  >
                    <div className="ml-4 mr-3 h-12 w-12">
                      <SVGComponent color={svgProps.color} />
                    </div>
                    <Link to={`/${category.toLowerCase()}`}>{category}</Link>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      <UIBtnHamburger onChange={handleNav} checked={isShowing} />
    </>
  )
}
