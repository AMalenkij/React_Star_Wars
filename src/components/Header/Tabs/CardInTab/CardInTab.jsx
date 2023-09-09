import { Tab } from '@headlessui/react'
import { useState } from 'react'

import SVGFilms from './img/SVGFilms'
import SVGCharacters from './img/SVGCharacters'
import SVGSpecies from './img/SVGSpecies'
import SVGStarships from './img/SVGStarships'
import SVGPlanets from './img/SVGPlanets'
import SVGVehicles from './img/SVGVehicles'

const CATEGORY_SVG_COMPONENTS = {
  Films: SVGFilms,
  People: SVGCharacters,
  Species: SVGSpecies,
  Starships: SVGStarships,
  Planets: SVGPlanets,
  Vehicles: SVGVehicles,
}

export default function CardInTab() {
  const [hoveredStates, setHoveredStates] = useState(
    Object.keys(CATEGORY_SVG_COMPONENTS).map(() => false)
  )

  return (
    <Tab.List className="flex justify-center">
      {Object.keys(CATEGORY_SVG_COMPONENTS).map((category, index) => (
        <Tab key={category} className="w-full">
          {({ selected }) => {
            const SVGComponent = CATEGORY_SVG_COMPONENTS[category] // Получаем компонент напрямую из объекта
            const svgProps = {
              selected,
              hovered: hoveredStates[index],
              color: selected || hoveredStates[index] ? '#EEBF00' : '#000000',
            }

            return (
              <div>
                <div
                  className="flex mx-auto items-center h-20 w-20"
                  onMouseEnter={() => {
                    const newHoveredStates = [...hoveredStates]
                    newHoveredStates[index] = true
                    setHoveredStates(newHoveredStates)
                  }}
                  onMouseLeave={() => {
                    const newHoveredStates = [...hoveredStates]
                    newHoveredStates[index] = false
                    setHoveredStates(newHoveredStates)
                  }}
                >
                  <SVGComponent
                    selected={svgProps.selected}
                    hovered={svgProps.hovered}
                    color={svgProps.color}
                  />
                </div>
                <div
                  className="
                     flex 
                     justify-center 
                     items-center 
                     ui-selected:bg-gold
                     ui-selected:shadow-inner
                     bg-black
                     h-1
                     mt-4 
                     mb-2
                   "
                >
                  <div
                    className="
                       ui-selected:border-gold
                       ui-selected:border-4
                       border-black 
                       border-2
                       bg-gray 
                       w-5 h-5  
                       rounded-full"
                  />
                </div>
                {category}
              </div>
            )
          }}
        </Tab>
      ))}
    </Tab.List>
  )
}
