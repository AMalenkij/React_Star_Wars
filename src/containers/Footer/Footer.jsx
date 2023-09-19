import UiSmallBtnNeumorphism from '../../components/UI/UiSmallBtnNeumorphism/UiSmallBtnNeumorphism'
import SVGStarWars from '../../static/SVGIcon/SVGStarWars'
import SVGLogoGitHub from '../../static/SVGIcon/SVGLogoGitHub'
import SVGLogoLinkedin from '../../static/SVGIcon/SVGLogoLinkedin'

export default function Footer() {
  return (
    <footer
      className="
      container 
     px-8 py-4 mt-6 mb-3
     mx-auto"
    >
      <div
        className="
          flex
          justify-between
          items-center"
      >
        <div className="flex gap-2 items-center sm:text-lg">
          <SVGStarWars className="w-24 hidden sm:block" />
          <p className="text-sm sm:text-base">
            Designed and developed by Anton Malenkyi ©2023
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="https://github.com/AMalenkij"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UiSmallBtnNeumorphism svg={<SVGLogoGitHub />} />
          </a>
          <a
            href="https://www.linkedin.com/in/amalenkyi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UiSmallBtnNeumorphism svg={<SVGLogoLinkedin />} />
          </a>
        </div>
      </div>
      <p className="text-center pt-2 text-sm sm:text-base">
        Star Wars and all associated names and/or images are copyright Lucasfilm
        Ltd. Images were freely collected from Wookiepedia.
      </p>
    </footer>
  )
}
