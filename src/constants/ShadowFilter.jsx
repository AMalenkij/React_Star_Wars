export default function ShadowFilter() {
  return (
    <defs>
      <filter
        id="shadow"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        {/* Combine SourceGraphic and BackgroundImageFix */}
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />

        {/* Create a hard alpha mask  */}
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        {/* Offset the shape to create a shadow */}
        <feOffset dy={4} />

        {/* Apply a Gaussian blur for softness */}
        <feGaussianBlur stdDeviation={2} />

        {/* Blend the hard alpha mask with the blurred shape */}
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />

        {/* Apply a color matrix to adjust the shadow's opacity */}
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />

        {/* Blend the shadow shape with the original shape */}
        <feBlend in2="shape" />
      </filter>
    </defs>
  )
}
