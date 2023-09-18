import { useContext } from 'react'
import LinkBack from '../../components/DetailPage/LinkBack/LinkBack'

import { FavoriteContext } from '../../utils/Context'
import ShowDataList from '../../components/Сatalog/ShowDataList/ShowDataList'

export default function FavoritesPage() {
  const { favorite } = useContext(FavoriteContext)

  const result = favorite.map(({ namePeople, imgSrc, id, pathname }) => {
    return (
      <ShowDataList
        key={id}
        name={namePeople}
        url={imgSrc}
        id={id}
        pathname={pathname}
      />
    )
  })

  return (
    <div
      className="
      shadow-border
      container 
      rounded-2xl
      bg-white
      mt-6
      mx-auto
      p-3
      pt-1
    "
    >
      <div
        className="
      shadow-drop-300 
      bg-knob-base 
      rounded-2xl 
      border-2 
      border-white
      "
      >
        <h1 className="text-lg text-center pt-6 pb-2">Favorites</h1>
        <div className="px-6 py-2">
          <LinkBack />
        </div>
        <ul className="flex flex-wrap pb-6">{result}</ul>
      </div>
    </div>
  )
}
