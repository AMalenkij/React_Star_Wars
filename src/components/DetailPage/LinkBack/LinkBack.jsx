import { useNavigate } from 'react-router'

import UiSmallBtnNeumorphism from '../../UI/UiSmallBtnNeumorphism/UiSmallBtnNeumorphism'
import ShadowFilter from '../../../constants/ShadowFilter'

export default function LinkBack() {
  const navigation = useNavigate()

  const hanleGoBack = (e) => {
    e.preventDefault()
    navigation(-1)
  }
  return (
    <div className="flex items-center gap-2 z-10 relative">
      <UiSmallBtnNeumorphism onClick={hanleGoBack} svg={<SVGBack />} />
      <span>Go back</span>
    </div>
  )
}
function SVGBack() {
  return (
    <svg
      width="12"
      height="23"
      viewBox="0 0 12 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#shadow)">
        <path
          d="m2.069 11.143 9.68-9.68A.857.857 0 1 0 10.537.251L.251 10.537a.857.857 0 0 0 0 1.212l10.286 10.286a.857.857 0 0 0 1.212-1.212l-9.68-9.68Z"
          fill="#EEBF00"
        />
      </g>
      <defs>
        <ShadowFilter />
      </defs>
    </svg>
  )
}
