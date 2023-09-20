import { Tab } from '@headlessui/react'

import CATEGORY_DESCRIPTION from '../../../constants/categoryDescription'
import UiBgWithCircles from '../../UI/UiBgWithCircles/UiBgWithCircles'
import { CIRCLE_SETTINGS_FOR_POPUP } from '../../../constants/settings'
import UiBtnNeumorphism from '../../UI/UiBtnNeumorphism/UiBtnNeumorphism'

export default function Tabs({ closeModal, cardInTab }) {
  return (
    <Tab.Group>
      {cardInTab}
      <div
        className="
         mt-4
         rounded-2xl
         shadow-drop-300
         bg-header
         h-[28vh]
         w-full
         relative
         overflow-hidden
         "
      >
        <Tab.Panels />
        <UiBgWithCircles circleSettings={CIRCLE_SETTINGS_FOR_POPUP} />
        <div
          className="
           shadow-drop-300
           absolute 
           w-full 
           h-full 
           border-2 
           border-white"
        >
          {Object.entries(CATEGORY_DESCRIPTION).map(([categoryName, posts]) => (
            <Tab.Panel key={posts[0].id}>
              {posts.map((post) => (
                <div key={post.id} className="relative pt-10 px-8">
                  <h3>{post.title}</h3>
                  <div>
                    <p>{post.content}</p>
                  </div>
                  <div className="mt-2 flex">
                    <UiBtnNeumorphism
                      toLink={`/${categoryName.toLowerCase()}`}
                      onClick={closeModal}
                      nameBTN="See more!"
                    />
                  </div>
                </div>
              ))}
            </Tab.Panel>
          ))}
        </div>
      </div>
    </Tab.Group>
  )
}
