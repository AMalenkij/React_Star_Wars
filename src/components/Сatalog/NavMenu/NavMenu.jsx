import UiRadio from '../../UI/UiRadio/UiRadio'
import CATEGORY_DESCRIPTION from '../../../constants/categoryDescription'
import LinkBack from '../../DetailPage/LinkBack/LinkBack'

export default function NavMenu({
  setRadioChange,
  radioChange,
  pathnameShort,
}) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const radioChangeHandler = (e) => {
    setRadioChange(e.target.value)
  }
  const description = CATEGORY_DESCRIPTION[capitalizeFirstLetter(pathnameShort)]

  return (
    <>
      {description && (
        <h3 className="sm:hidden block px-16 sm:pt-8 pt-4 ">
          {description[0].title}
        </h3>
      )}
      <nav className="flex justify-between items-center px-4 sm:px-16 py-4 sm:pt-8">
        <LinkBack />
        {description && (
          <h3 className="sm:block hidden">{description[0].title}</h3>
        )}
        <div className="flex items-center sm:gap-8">
          <UiRadio
            name="Infinity scroll"
            value="infinityScroll"
            onChange={radioChangeHandler}
            checked={radioChange}
          />
          <UiRadio
            name="Pagination"
            value="pagination"
            onChange={radioChangeHandler}
            checked={radioChange}
          />
        </div>
      </nav>
    </>
  )
}
