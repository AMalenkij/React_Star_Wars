import UiSmallBtnNeumorphism from '../../../UI/UiSmallBtnNeumorphism/UiSmallBtnNeumorphism'

export default function ItemFromLocalStorage({
  filteredData,
  deleteItemFromLocalStorage,
  inputValue,
  setInputValue,
  resultsFromApi,
}) {
  const handleEntryClick = (entry) => {
    setInputValue(entry)
  }

  const handleDeleteFromLocalStorage = (event, entry) => {
    event.stopPropagation()
    deleteItemFromLocalStorage(entry)
  }
  return filteredData.length > 0 ? (
    <div
      className="
              bg-knob_elevation
              border-2
              border-white
              rounded-3xl
              shadow-drop-300
              px-4 py-3 mt-8
              absolute
              sm:w-80
              w-full
              z-10
              left-0
              sm:left-auto
              "
    >
      <div className="mb-2">
        {filteredData?.map(
          (entry) =>
            entry && (
              <div key={entry} className="flex justify-between mb-3">
                <UiSmallBtnNeumorphism
                  svg={<BookmarkIcon />}
                  onClick={() => handleEntryClick(entry)}
                />
                <p className="pt-4 text-lg text-start block">{entry}</p>
                <UiSmallBtnNeumorphism
                  svg={<RemoveIcon />}
                  onClick={(event) =>
                    handleDeleteFromLocalStorage(event, entry)
                  }
                />
              </div>
            )
        )}
      </div>

      {inputValue.length > 0 && (
        <div>
          <div className="h-0.5 shadow-border bg-knob_base mx-4 my-2" />
          {resultsFromApi}
        </div>
      )}
    </div>
  ) : (
    inputValue.length > 0 && (
      <div
        className="
                bg-knob_elevation
                border-2
                border-white
                rounded-3xl
                shadow-drop-300
                px-4 py-3 mt-8
                absolute
                sm:w-80
                w-full
                z-10
                left-0
                sm:left-auto
              "
      >
        {resultsFromApi}
      </div>
    )
  )
}

function BookmarkIcon() {
  return (
    <svg
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.18.5c.442 0 .82.17 1.133.508.338.338.507.729.507 1.172V15.5L6 13 .18 15.5V2.18c0-.443.156-.834.468-1.172C.987.669 1.378.5 1.82.5h8.36Z"
        fill="#EEBF00"
      />
    </svg>
  )
}
function RemoveIcon() {
  return (
    <svg
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.82 1.82H.18V.18h11.64v1.64Z" fill="#EEBF00" />
    </svg>
  )
}
