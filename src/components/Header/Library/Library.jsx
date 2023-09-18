import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Modal from './Modal/Modal'
import Tabs from '../Tabs/Tabs'
import CardInTab from '../Tabs/CardInTab/CardInTab'
import { getRouteFromUrl } from '../../../services/getData'
import { CATEGORIES_SELECTED } from '../../../constants/settings'
import ShadowFilter from '../../../constants/ShadowFilter'


export default function Library() {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const location = useLocation()

  const isCategorySelected = () => {
    return CATEGORIES_SELECTED.some(
      (category) => category === getRouteFromUrl(location.pathname)
    )
  }

  return (
    <>
      {isCategorySelected() ? (
        <button
          type="button"
          onClick={openModal}
          className="
          flex
          gap-1
          bg-opacity-20
          hover:bg-opacity-3
          focus:outline-none 
          focus-visible:ring-2
          focus-visible:ring-white 
          focus-visible:ring-opacity-75
          shadow-inner
          rounded-3xl
          bg-gray-dark
          px-8 
          py-3"
        >
          Library
          <div className="pt-1">
            <SVGArrow />
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={openModal}
          className="
          flex
          gap-1
          bg-opacity-20
          hover:bg-opacity-3
          focus:outline-none 
          focus-visible:ring-2
          focus-visible:ring-white 
          focus-visible:ring-opacity-75"
        >
          Library
          <div className="pt-1">
            <SVGArrow />
          </div>
        </button>
      )}
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        tabs={<Tabs closeModal={closeModal} cardInTab={<CardInTab />} />}
      />
    </>
  )
}

function SVGArrow() {
  return (
    <svg
      width={24}
      height={16}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#shadow)">
        <path
          d="M20.634.316 12 8.95 3.367.316 0 3.684l12 12 12-12L20.634.316Z"
          fill="#EEBF00"
        />
      </g>
      <defs>
        <ShadowFilter />
      </defs>
    </svg>
  )
}
