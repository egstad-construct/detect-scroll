import DetectScroll from '../index.js'

function updateState(el, position) {
  if (el.innerText !== position) {
    // eslint-disable-next-line no-param-reassign
    el.innerText = position
  }
}

function updateDirection(el, direction) {
  el.innerText = direction
}

// ----------------------------------------------------------------------------
// Window Element
// ----------------------------------------------------------------------------
const hori = document.querySelector('.hori')
const tool1 = document.querySelector('.tip.window')
const poster = document.querySelector('.poster')
const state1 = tool1.querySelector('.stat')
const dir1 = tool1.querySelector('.dire')
const x1 = tool1.querySelector('.x')
const y1 = tool1.querySelector('.y')

window.detectScroll = new DetectScroll(window, {
  // horizontal: false,
  debugMode: true,
  events: {
    scrollStart: () => {
      updateState(state1, 'is scrolling')
    },
    scrollStop: () => {
      updateState(state1, 'is not scrolling')
      updateDirection(dir1, '')
    },
    scrollUp: (ev) => {
      updateDirection(dir1, 'up')
    },
    scrollDown: () => {
      updateDirection(dir1, 'down')
    },
    scrollLeft: () => {
      updateDirection(dir1, 'left')
    },
    scrollRight: () => {
      updateDirection(dir1, 'right')
    },
    scrollX: () => {
      updateDirection(x1, Math.round(window.detectScroll.x))
      // background:
    },
    scrollY: (ev) => {
      const y = window.detectScroll ? window.detectScroll.y : 0
      updateDirection(y1, Math.round(y))

      poster.style.backgroundImage = `conic-gradient(from ${
        y * 0.05
      }deg, #101115, #298DD9, #DEE4CA, #F7BF46, #EF1A03)`

      hori.scrollTo(y, 0)
      console.log(ev)
      // console.log(instanceWindow.y)
    },
    // scrollMaxY: () => {},
    // scrollMinX: () => {},
    // scrollMaxX: () => {},
  },
})

// // const tool2 = hori.querySelector('.tip')
// // const state2 = tool2.querySelector('.stat')
// // const dir2 = tool2.querySelector('.dire')
// // const x2 = tool2.querySelector('.x')
// // const y2 = tool2.querySelector('.y')
// const instanceHori = new DetectScroll(hori, {
//   debugMode: true,
//   // events: {
//   // scrollStart: () => {
//   //   updateState(state2, 'is scrolling')
//   // },
//   // scrollStop: () => {
//   //   updateState(state2, 'is not scrolling')
//   //   updateDirection(dir2, '')
//   // },
//   // scrollLeft: () => {
//   //   updateDirection(dir2, 'left')
//   // },
//   // scrollRight: () => {
//   //   updateDirection(dir2, 'right')
//   // },
//   // scrollX: () => {
//   //   updateDirection(x2, Math.round(instanceHori.x))
//   // },
//   // },
// })

//

// const scrollV = window
// const scrollV = document.querySelector('.h')
// const teardownV = document.querySelector('.teardown')
// // eslint-disable-next-line no-unused-vars
// const tipV = document.querySelector('.tip.v')
// const vDir = tipV.querySelector('.direction')
// const vPos = tipV.querySelector('.state')
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
// const el = window
// const detectScroll = new DetectScroll(el, {
//   // debugMode: true,
//   events: {
//     scrollUp: () => {
//       console.log('u')
//     },
//     scrollDown: () => {
//       console.log('d')
//     },
//   },
// })
// const foo = (ev) => {
//   console.log(ev.type)
// }

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
// teardownV.addEventListener('click', () => {
//   detectScroll.destroy()
//   console.log('teardown')
// })
