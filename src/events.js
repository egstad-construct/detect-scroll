const eventsDefault = ['scrollStart', 'scrollStop']
const eventsVertical = [
  'scrollX',
  'scrollUp',
  'scrollDown',
  'scrollMinY',
  'scrollMaxY',
]
const eventsHorizontal = [
  'scrollY',
  'scrollLeft',
  'scrollRight',
  'scrollMinX',
  'scrollMaxX',
]

export function eventsSetup(eventOverrides, isVertical, isHorizontal) {
  // if overrides exist
  if (eventOverrides && typeOf(eventOverrides)) {
    return eventOverrides
  }
  // if overrides are an invalid format
  else if (eventOverrides && !typeOf(eventOverrides)) {
    console.error(`Whoops! 'events' must be an object with at least one prop.`)
  }
  // defaults
  else {
    return [
      ...eventsDefault,
      ...(isVertical ? eventsVertical : []),
      ...(isHorizontal ? eventsHorizontal : []),
    ]
  }
}

export function eventsInit(element, events) {
  if (typeOf(events)) {
    Object.entries(events).forEach((event) => {
      const [key, value] = event
      element.addEventListener(key, value, false)
    })
  }
}

export function eventsDestroy(element, events) {
  if (typeOf(events)) {
    Object.entries(events).forEach((event) => {
      const [key, value] = event
      element.removeEventListener(key, value, false)
    })
  }
}

function typeOf(events) {
  return (
    typeof events === 'object' &&
    Object.keys(events).length > 0 &&
    !Array.isArray(events)
  )
}
