import React, { useEffect } from 'react'

export default function FlexHoverSlider({ setTheme, PROPS_FLEX_HOVER_SLIDER }) {
  useEffect(() => {
    const handleHover = (event) => {
      const flexTitle = event.currentTarget.querySelector('.flex-title')

      flexTitle.style.transform = 'rotate(0deg)'
      flexTitle.style.top = '10%'
    }

    const handleHoverEnd = (event) => {
      const flexTitle = event.currentTarget.querySelector('.flex-title')

      flexTitle.style.transform = 'rotate(90deg)'
      flexTitle.style.top = '25%'
    }

    const slides = document.querySelectorAll('.flex-slide')
    slides.forEach((slide) => {
      slide.addEventListener('mouseenter', handleHover)
      slide.addEventListener('mouseleave', handleHoverEnd)
    })

    // Cleanup function
    return () => {
      slides.forEach((slide) => {
        slide.removeEventListener('mouseenter', handleHover)
        slide.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [])

  return (
    <div className="flex-container">
      {PROPS_FLEX_HOVER_SLIDER.map((value) => (
        <div
          className={`flex-slide ${value.title}`}
          key={value.title}
          onClick={() => setTheme(value.title)}
          onKeyDown={(e) => e.key === 'Enter' && setTheme(value.title)}
          role="button"
          tabIndex={0}
        >
          <div className={`flex-title flex-title-${value.title}`}>
            {value.name}
          </div>
        </div>
      ))}
    </div>
  )
}
