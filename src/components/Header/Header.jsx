import { NavLink, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import React, { useState, Fragment } from 'react'

import styles from './Header.module.css'
import Favorite from '../Favorite/Favorite'
import Popover from '../UI/UiPopover/Popover'

import svgFilms from './img/menuIcons/films.svg'
import svgCharacters from './img/menuIcons/characters.svg'
import svgSpecies from './img/menuIcons/species.svg'
import svgStarships from './img/menuIcons/starships.svg'
import svgVehicles from './img/menuIcons/vehicles.svg'
import svgPlanets from './img/menuIcons/planets.svg'

const options = [
  { value: 'people', label: 'People', icon: svgCharacters },
  { value: 'planets', label: 'Planets', icon: svgPlanets },
  { value: 'films', label: 'Films', icon: svgFilms },
  { value: 'species', label: 'Species', icon: svgSpecies },
  { value: 'starships', label: 'Starships', icon: svgStarships },
  { value: 'vehicles', label: 'Vehicles', icon: svgVehicles },
]

export default function Header() {
  const [selectedOption, setSelectedOption] = useState('Select a category')
  const navigate = useNavigate()

  const handleOptionChange = (selected) => {
    setSelectedOption(selected.value)
    navigate(`/${selected.value}/?page=1`)
  }

  return (
    <div className={styles.container}>
      <svg className="logo" alt="Star Wars" />
      <ul className={styles.list__container}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={styles.selectContainer}>
          <Select
            defaultValue={options.find(
              (option) => option.value === selectedOption
            )}
            onChange={handleOptionChange}
            options={options.map((option) => ({
              ...option,
              label: (
                <div className={styles.iconLabel}>
                  <img
                    src={option.icon}
                    alt={option.label}
                    style={{ width: 36 }}
                  />
                  <span className={styles.iconText}>{option.label}</span>
                </div>
              ),
            }))}
            isOptionSelected={(option) => option.value === selectedOption}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            isSearchable={false}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
      </ul>
      <div className="ml-auto flex gap-6">
        <Popover />
        <Favorite />
      </div>
    </div>
  )
}
