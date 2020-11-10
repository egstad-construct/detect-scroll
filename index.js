const options = {
  horizontal: 0
}

export default class detectScroll {
  constructor(el, options) {
    this.x = null;
    this.y = null;
    this.el = (el || window);
    this.isWindow = (this.el === window);
    // this.isHorizontal = (options.horizontal || false)

    this.watch()
  }
  getY() {
    return (this.isWindow ? window.scrollY : this.el.scrollTop);
  }
  getX() {
    return (this.isWindow ? window.scrollX : this.el.scrollLeft);
  }
  startY() {
    const currentY = this.getY();
    const isStill = (currentY === this.y);
    const isScroll = (currentY !== this.y);
    const isScrollUp = (currentY < this.y);
    const isScrollDown = (currentY > this.y);

    // Fire blanket scroll event
    if (isStill) {
      console.log('idle', currentY)
    } else if (isScroll) {
      // console.log('idle', currentY)
    }

    // vertical
    // if (isScrollDown) {
    //   console.log('down', currentY)

    // } else if (isScrollUp) {
    //   console.log('up', currentY)
    // }

    this.y = currentY;
  }
  watch(timestamp) {
    this.startY()
    window.requestAnimationFrame(this.watch.bind(this));
  }
  pause() {

  }
}




// const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// const watch = () => {
//   mediaQuery.addEventListener("change", get, false);
//   get()
// }

// const teardown = () => {
//   mediaQuery.removeEventListener("change", get, false);
// }

// export const get = () => {
//   const theme = ["dark", "light", "no-preference"].find(
//     (scheme) => window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches
//   );

//   const event = new CustomEvent("colorSchemeUpdated", {
//     detail: {
//       theme,
//     },
//   });
//   window.dispatchEvent(event);
// }

// export default {
//   watch,
//   teardown,
//   get
// };
















// const html = document.documentElement

// const scroll = {
//   docX: 0,
//   docY: 0,
//   current: null,
//   timeout: null,
//   scrollHasStarted: null,

//   init() {
//     this.bindEvents()
//     this.setScrollClasses()
//   },
//   bindEvents() {
//     window.addEventListener(
//       'scroll',
//       () => {
//         window.requestAnimationFrame(() => {
//           this.setScrollClasses()
//         })
//         window.clearTimeout(this.timeout)
//         this.beginTimeout()
//       },
//       false
//     )
//   },
//   getScrollY() {
//     return window.scrollY
//   },
//   beginTimeout() {
//     this.timeout = setTimeout(() => {
//       this.onScrollStop()
//     }, 150)
//   },
//   getScrollBottom() {
//     const max = Math.max(
//       document.body.scrollHeight,
//       document.documentElement.scrollHeight,
//       document.body.offsetHeight,
//       document.documentElement.offsetHeight,
//       document.documentElement.clientHeight
//     )

//     return max - window.innerHeight
//   },
//   isScrollBottom() {
//     return this.getScrollY() >= this.getScrollBottom()
//   },
//   isScrollTop() {
//     return this.getScrollY() <= 0
//   },
//   setScrollClasses() {
//     const current = this.getScrollY()
//     const scrolling = current !== this.current
//     const up = current < this.current
//     const down = current > this.current
//     const top = current !== this.current && this.isScrollBottom()
//     const bottom = current !== this.current && this.isScrollTop()

//     if (scrolling && !this.scrollHasStarted) {
//       this.onScrollStart()
//     }

//     if (down) {
//       this.onScrollDown()
//     } else if (up) {
//       this.onScrollUp()
//     }

//     if (top) {
//       this.onScrollMax()
//     } else if (bottom) {
//       this.onScrollMin()
//     }

//     this.current = current
//   },
//   onScrollStart() {
//     this.scrollHasStarted = true
//     html.classList.add('is-scrolling')
//     html.classList.remove(
//       'is-scroll-top',
//       'is-scroll-bottom',
//       'is-scroll-near-top'
//     )
//   },
//   onScrollStop() {
//     this.scrollHasStarted = false
//     html.classList.remove('is-scrolling')
//     window.$nuxt.$store.dispatch('device/updateScrollCoords')
//     window.$nuxt.$store.dispatch('device/updateDocDimensions')
//   },
//   onScrollDown() {
//     html.classList.add('scrolling-down')
//     html.classList.remove('scrolling-up')
//   },
//   onScrollUp() {
//     html.classList.add('scrolling-up')
//     html.classList.remove('scrolling-down')
//   },
//   onScrollMax() {
//     html.classList.add('is-scroll-bottom')
//     // html.classList.remove("is-scroll-top")
//   },
//   onScrollMin() {
//     html.classList.add('is-scroll-top')
//     html.classList.remove('is-scroll-near-top')
//   }
// }

// window.onNuxtReady(() => {
//   scroll.init()
// })

// export default scroll