export function getEl(el) {
  let element = null

  if (isElement(el) || el === window) {
    element = el
  } else if (typeof el === 'string') {
    element = document.querySelector(el)
  }

  return element
}

// Returns true if it is a DOM element
function isElement(o) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string'
}
