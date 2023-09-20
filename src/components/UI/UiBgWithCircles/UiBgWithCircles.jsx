export default function UiBgWithCircles({ circleSettings }) {
  return (
    <div className="absolute w-full h-full">
      {circleSettings.map((settings) => (
        <div
          key={settings.id}
          className={`absolute ${settings.position}`}
          style={{
            left: settings.left,
            right: settings.right,
            top: settings.top,
            bottom: settings.bottom,
          }}
        >
          <SVGGradientCircles circleSize={settings.circleSize} />
        </div>
      ))}
      <div className="absolute w-full h-full bg-header/10" />
    </div>
  )
}

function SVGGradientCircles({ circleSize }) {
  return (
    <svg
      width={circleSize}
      height={circleSize}
      viewBox={`0 0 ${circleSize * 2} ${circleSize * 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="100%" stopColor="rgba(239, 239, 239, 1)" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(239, 239, 239, 1)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
        </linearGradient>
        <radialGradient id="gradient3" cx="0.555" cy="0.555" r="0.3">
          <stop stopColor="#fb66ff" stopOpacity=".62" />
          <stop offset=".229" stopColor="#616161" stopOpacity=".75" />
          <stop offset=".566" stopColor="#b5b5b5" stopOpacity=".385" />
          <stop offset=".804" stopColor="#eaeaea" stopOpacity=".126" />
          <stop offset=".92" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx={circleSize}
        cy={circleSize}
        r={circleSize * 4}
        opacity=".7"
        fill="url(#gradient3)"
      />
      <circle
        cx={circleSize}
        cy={circleSize}
        r={circleSize}
        fill="url(#gradient1)"
      />
      <circle
        cx={circleSize}
        cy={circleSize}
        r={circleSize - 4}
        fill="url(#gradient2)"
      />
    </svg>
  )
}
