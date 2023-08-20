export default function SVGComponentVehicles({ selected, color }) {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={selected ? 'url(#filter0_i_156_81)' : undefined} fill={color}>
        <path d="M241.308 18.652C229.784 24.4133 219.922 35.5467 215.918 47.46C214.942 50.6827 211.62 65.5267 208.594 80.5653L203.124 107.909L195.8 217.675C191.796 278.027 188.476 327.537 188.476 327.733C188.476 327.929 180.565 328.124 170.897 328.124C151.855 328.124 148.925 328.709 144.628 333.397L142.284 335.936H61.2295L57.5188 332.616C55.4682 330.76 52.2455 328.905 50.3895 328.515L46.8735 327.929V312.5H62.4988V296.875H46.8748V179.688H31.2495V296.876H15.6255V312.501H31.2508V327.931L27.8335 328.516C23.6348 329.297 18.6535 333.399 16.9935 337.599C15.9188 340.04 15.6268 348.927 15.6268 378.907V417.091L18.0682 419.435C20.0215 421.485 21.3882 421.876 25.8802 421.876H31.2495V437.501H46.8748V421.876H52.2455C56.7375 421.876 58.1055 421.485 60.0575 419.435C61.4242 418.165 62.4988 416.017 62.4988 414.649C62.4988 412.305 64.9401 413.673 96.5815 432.619C115.233 443.947 131.444 453.127 132.519 453.127C133.593 453.127 137.597 452.052 141.405 450.783L148.436 448.341V456.153C148.436 463.184 148.729 464.161 150.877 466.309C152.831 468.36 154.197 468.751 158.689 468.751H164.06V484.376H179.686V468.751H185.056C189.548 468.751 190.916 468.36 192.868 466.309C195.31 463.965 195.309 463.868 195.309 444.629V425.391L209.275 439.257L223.338 453.124H276.657L290.72 439.257L304.686 425.391V444.629C304.686 463.868 304.686 463.965 307.127 466.309C309.08 468.36 310.447 468.751 314.939 468.751H320.309V484.376H335.935V468.751H341.306C345.798 468.751 347.166 468.36 349.118 466.309C351.266 464.161 351.559 463.184 351.559 456.153V448.341L358.589 450.783C362.397 452.052 366.5 453.127 367.573 453.127C368.647 453.127 384.762 443.947 403.511 432.716C434.859 413.771 437.495 412.404 437.495 414.649C437.495 416.016 438.57 418.165 439.936 419.435C441.89 421.485 443.256 421.876 447.748 421.876H453.119V437.501H468.744V421.876H474.115C478.607 421.876 479.975 421.485 481.927 419.435L484.368 417.091V378.907C484.368 348.927 484.075 340.04 483.002 337.599C481.342 333.4 476.362 329.297 472.162 328.516L468.744 327.931V312.5H484.37V296.875H468.744V179.688H453.119V296.876H437.494V312.501H453.119V327.931L449.603 328.516C447.747 328.907 444.524 330.763 442.474 332.617L438.763 335.937H357.708L355.364 333.399C351.067 328.711 348.138 328.125 329.095 328.125C319.427 328.125 311.516 327.931 311.516 327.735C311.516 327.539 308.196 278.028 304.192 217.676L296.875 107.911L291.406 80.5667C285.351 50.196 283.594 44.0427 278.906 36.7187C272.656 26.9533 257.128 15.6253 249.999 15.6253C248.533 15.6253 244.628 16.992 241.307 18.6533L241.308 18.652ZM256.055 35.3507C266.504 42.8707 268.555 47.46 274.512 76.952C277.15 90.136 279.298 101.171 279.298 101.367C279.298 101.563 277.442 101.561 275.196 101.367L271.192 101.073L267.872 91.308C266.016 85.5467 263.771 80.8587 262.599 79.784C260.939 78.4173 258.595 78.124 250.002 78.124C241.408 78.124 239.064 78.4173 237.404 79.784C236.232 80.8587 233.987 85.5453 232.131 91.308L228.811 101.073L224.807 101.367C222.56 101.561 220.706 101.561 220.706 101.367C220.706 101.172 222.853 90.136 225.491 76.952C230.373 52.928 232.131 47.46 237.112 41.5027C240.14 37.792 247.952 32.2253 250.003 32.2253C250.882 32.2253 253.616 33.6907 256.058 35.3507H256.055ZM255.567 104.003C257.324 109.276 259.473 114.355 260.255 115.233C261.329 116.308 264.65 116.796 271.779 117.187L281.74 117.675L289.26 229.491C296.291 334.276 296.78 343.456 296.78 375.975L296.878 410.643L287.697 419.823C280.177 427.343 278.42 428.612 278.03 427.147C277.736 426.072 276.467 420.213 275.295 414.061C272.072 397.753 273.147 398.436 250.002 398.436C226.856 398.436 227.931 397.752 224.708 414.061C223.536 420.213 222.267 426.073 221.973 427.147C221.583 428.612 219.826 427.341 212.306 419.823L203.125 410.643L203.223 375.975C203.223 343.455 203.711 334.276 210.743 229.491L218.263 117.675L228.125 117.187C234.18 116.893 238.575 116.211 239.551 115.429C240.429 114.648 242.48 109.863 244.239 104.687C248.047 93.1627 247.755 93.5533 250.294 93.944C251.856 94.1387 252.931 96.1907 255.567 104.003ZM46.8748 351.563V359.375H31.2495V343.749H46.8748V351.561V351.563ZM187.5 351.563V359.375H156.251V343.749H187.5V351.561V351.563ZM343.75 351.563V359.375H312.5V343.749H343.75V351.561V351.563ZM468.75 351.563V359.375H453.124V343.749H468.75V351.561V351.563ZM101.563 361.621V371.68L95.2148 377.929C91.6988 381.347 88.8668 384.668 88.8668 385.156C88.8668 386.523 97.8508 395.508 99.1202 395.508C99.7055 395.508 104.003 391.601 108.691 386.816L117.187 378.223V351.563H140.624V417.089L143.065 419.433C144.335 420.8 146.093 421.875 146.972 421.875C148.241 421.875 148.437 422.851 148.241 426.953L147.948 431.933L140.819 434.375L133.689 436.719L98.1428 415.332L62.5002 394.043V351.563H101.563V361.621ZM382.812 364.844V378.223L391.308 386.816C395.996 391.601 400.195 395.508 400.78 395.508C402.147 395.508 411.132 386.621 411.132 385.255C411.132 384.669 408.3 381.348 404.784 377.931L398.436 371.681V351.563H437.499V394.043L401.855 415.332L366.308 436.719L359.179 434.375L352.049 431.933L351.756 426.953C351.561 422.852 351.756 421.875 353.026 421.875C353.904 421.875 355.663 420.8 356.932 419.433L359.374 417.089V351.563H382.811V364.844H382.812ZM46.8748 390.625V406.251H31.2495V375.001H46.8748V390.627V390.625ZM187.5 390.625V406.251H156.251V375.001H187.5V390.627V390.625ZM343.75 390.625V406.251H312.5V375.001H343.75V390.627V390.625ZM468.75 390.625V406.251H453.124V375.001H468.75V390.627V390.625ZM261.426 425.293C262.598 431.153 263.574 436.328 263.672 436.719C263.672 437.207 257.52 437.5 250 437.5C242.48 437.5 236.328 437.305 236.328 437.109C236.328 436.425 240.332 416.407 240.723 415.235C241.114 414.356 243.457 414.063 250.195 414.259L259.179 414.552L261.426 425.295V425.293ZM179.688 437.5V453.125H164.063V421.876H179.688V437.501V437.5ZM335.938 437.5V453.125H320.312V421.876H335.938V437.501V437.5Z" />
        <path d="M242.188 54.688V62.5H257.814V46.8747H242.188V54.688ZM242.188 164.063V195.312H257.814V132.812H242.188V164.063ZM241.7 212.5C239.552 213.281 235.939 215.723 233.692 217.969C226.563 224.903 226.563 225.196 226.563 273.145V315.528L229.004 317.872C231.348 320.313 231.543 320.313 250 320.313C268.458 320.313 268.652 320.313 270.996 317.872L273.438 315.528V273.145C273.438 225.196 273.438 224.903 266.308 217.969C259.57 211.329 250.392 209.376 241.7 212.5ZM254.982 228.417C257.326 230.273 257.326 230.565 257.619 251.855L257.912 273.437H242.188V252.441C242.188 231.348 242.188 231.348 244.63 229.004C247.462 226.075 251.856 225.877 254.982 228.417ZM257.812 296.875V304.687H242.187V289.061H257.812V296.873V296.875ZM241.796 337.401C233.594 340.331 226.562 350.389 226.562 359.373C226.562 371.679 237.695 382.811 249.999 382.811C262.303 382.811 273.436 371.677 273.436 359.373C273.436 343.553 256.835 332.029 241.796 337.401ZM254.003 352.636C256.542 354.003 258.007 358.007 257.323 361.523C256.054 367.089 246.971 368.749 243.651 363.964C238.963 357.225 246.679 348.632 254.003 352.636Z" />
      </g>
      <defs>
        {selected ? (
          <filter
            id="filter0_i_156_81"
            x="0"
            y="0"
            width="500"
            height="504"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_156_81"
            />
          </filter>
        ) : null}
      </defs>
    </svg>
  )
}
