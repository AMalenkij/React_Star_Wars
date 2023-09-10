export default function UiSmallBtnNeumorphism({ onClick, svg }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="
          h-12 w-12 
          flex 
          justify-center 
          items-center
          shadow-drop-400
          rounded-xl
          hover:shadow-drop-300"
    >
      {svg}
    </button>
  )
}
