import { Link } from 'react-router-dom'

export default function UiBtnNeumorphism({ toLink, onClick, nameBTN }) {
  return (
    <div className="pb-4 pt-3 px-5 mb-4 rounded-2xl shadow-border mx-auto">
      <Link
        to={toLink}
        className="
             flex
             shadow-drop-400
             rounded-xl
             border 
             border-transparent 
             px-8 py-3
             text-xl
             font-medium 
             text-gold
             transition-shadow: ease-in-out
             hover:shadow-drop-300
             focus:outline-none 
             focus-visible:ring-2 
             focus-visible:ring-blue-500 
             focus-visible:ring-offset-2"
        onClick={onClick}
      >
        {nameBTN}
      </Link>
    </div>
  )
}
