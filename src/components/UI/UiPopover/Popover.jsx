import { Popover, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

import FlexHoverSlider from '../../Header/FlexHoverSlider/FlexHoverSlider'
import { useTheme } from '../../../utils/theme'
import PROPS_FLEX_HOVER_SLIDER from '../../../constants/propsFlexHoverSlider'

export default function CustomPopover() {
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState('')

  useEffect(() => {
    const foundName = PROPS_FLEX_HOVER_SLIDER.find(
      (item) => item.title === theme
    )
    if (foundName) {
      setName(foundName.name)
    }
  }, [theme])

  return (
    <div className="top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-400 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>{name}</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-3/2 z-10 mt-3  -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <FlexHoverSlider
                    setTheme={setTheme}
                    PROPS_FLEX_HOVER_SLIDER={PROPS_FLEX_HOVER_SLIDER}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
