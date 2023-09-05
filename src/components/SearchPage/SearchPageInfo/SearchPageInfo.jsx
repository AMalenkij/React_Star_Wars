import { Link } from 'react-router-dom'
import NoPhoto from '../../Сatalog/ShowDataList/img/NoPhoto.svg'

export default function SearchPageInfo({
  attributes: { name, title },
  category,
  url,
  id,
}) {
  const attributTitle = category === 'films' ? title : name

  return (
    <Link
      to={`/${category}/${id}`}
      className="flex items-center text-decoration-none cursor-pointer"
    >
      <img
        className="w-16 h-16 object-cover object-top rounded-xl mb-2"
        src={url}
        alt={name}
        onError={(e) => {
          e.target.src = NoPhoto
        }}
      />
      <div className="ml-2">
        <p className="text-white text-shadow-blue">{category}</p>
        <p className="text-white text-shadow-blue">{attributTitle}</p>
      </div>
    </Link>
  )
}
