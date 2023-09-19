import { Link } from 'react-router-dom'

import NoPhoto from './img/NoPhoto.svg'

export default function ShowDataList({ name, url, id, pathname }) {
  return (
    <li>
      <div className="shadow-card rounded-md p-1 mb-2 m-3">
        <Link to={`/${pathname}/${id}`}>
          <img
            className="w-full h-72 rounded-sm"
            src={url}
            alt={name}
            onError={(e) => {
              e.target.src = NoPhoto
            }}
          />
        </Link>
      </div>
      <p className="text-center capitalize">{pathname}:</p>
      <p className="text-center">{name}</p>
    </li>
  )
}
