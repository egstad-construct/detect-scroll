import DetectScroll from '../index'

function updateDirection(el, direction) {
  // if (el.innerText !== direction) {
  // eslint-disable-next-line no-param-reassign
  el.innerText = direction
  // }
}

function updateState(el, position) {
  if (el.innerText !== position) {
    // eslint-disable-next-line no-param-reassign
    el.innerText = position
  }
}

const scrollV = window
// const scrollV = document.querySelector('.h')
const teardownV = document.querySelector('.teardown')
// eslint-disable-next-line no-unused-vars
const tipV = document.querySelector('.tip.v')
const vDir = tipV.querySelector('.direction')
const vPos = tipV.querySelector('.state')
// const scrollVInstance = new DetectScroll(scrollV, {
// horizontal: true,
// vertical: true,
// events: [],
// events: {
//   scrollStart: () => {
//     console.log('start')
//     updateState(vPos, 'scrolling')
//   },
// },
// events: {
//   scrollStart: () => {
//     console.log('start')
//     updateState(vPos, 'scrolling')
//   },
// },
// events: {

// },
// })
// console.log(scrollVInstance)

//
//
//
//
//
//
//
//
//
//
//
//

// Detect Vertical Scroll
// Events fired: "scrollStart", "scrollStop", "scrollUp", "scrollDown", "scrollMinY", "scrollMaxY"
// const detectScroll = new DetectScroll(window)

// Detect Horizontal Scroll
// Events fired: "scrollStart", "scrollStop", "scrollLeft", "scrollRight", "scrollMinX", "scrollMaxX"
// const detectScroll = new DetectScroll(window, {
//   horizontal: true,
//   vertical: false,
// })

// Detect Vertical & Horizontal Scroll
// Fires "scrollStart", "scrollStop", "scrollUp", "scrollDown", "scrollMinY", "scrollMaxY", "scrollLeft", "scrollRight", "scrollMinX", "scrollMaxX"
// const detectScroll = new DetectScroll(window, {
//   horizontal: true,
// })

// Detect scroll start and stop only
// Fires "scrollStart", "scrollStop",
// const detectScroll = new DetectScroll(window, {
//   vertical: false,
//   horizontal: false,
// })

// Check Events from anywhere
// Events fired: "scrollStart", "scrollStop", "scrollUp", "scrollDown", "scrollMinY", "scrollMaxY"
const el = window
const detectScroll = new DetectScroll(el, {
  debugMode: true,
  // events: {},
})
const foo = (ev) => {
  console.log(ev.type)
}

// el.addEventListener('scrollUp', foo)
// el.addEventListener('scrollDown', foo)
// el.addEventListener('scrollStop', foo)

// Check Events from anywhere
// const el = window
// const detectScroll = new DetectScroll(el, {
//   events: {
//     scrollStart: () => {
//       console.log('start')
//     },
//     scrollStop: () => {
//       console.log('stop')
//     },
//     scrollUp: () => {
//       console.log('up')
//     },
//     scrollDown: () => {
//       console.log('down')
//     },
//     scrollMinY: () => {
//       console.log('top')
//     },
//     scrollMaxY: () => {
//       console.log('bottom')
//     },
//     scrollLeft: () => {
//       console.log('left')
//     },
//     scrollRight: () => {
//       console.log('right')
//     },
//     scrollMinX: () => {
//       console.log('beginning')
//     },
//     scrollMaxX: () => {
//       console.log('endX')
//     },
//   },
// })

//
//
//
//
//
//
//
//
//
//
//
//
// // add your own events! if you do tho, you'll have to pick up your own trash tho
teardownV.addEventListener('click', () => {
  detectScroll.destroy()
  console.log('teardown')
})
