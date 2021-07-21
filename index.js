import { getEl } from './src/getElement'
import { eventsSetup, eventsInit, eventsDestroy } from './src/events'

export default class DetectScroll {
  constructor(
    el,
    {
      horizontal = true,
      vertical = true,
      debugMode = false,
      events = undefined,
    } = {}
  ) {
    this.el = getEl(el)
    this.x = this.getX()
    this.y = this.getY()
    this.lastDispatch = null
    this.hasScrolled = false
    this.isWindow = window === el
    this.isScrolling = undefined
    this.isVertical = vertical
    this.isHorizontal = horizontal
    this.rafId = null
    this.rafTick = 0
    this.rafKilled = false
    this.timeout = null
    this.destroy = this.destroy.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.events = eventsSetup(events, this.isVertical, this.isHorizontal)
    this.debugMode = debugMode
    this.hasInit = 0
    this.destroyed = null
    this.passiveMode = true
    this.scrollingU = 0
    this.scrollingD = 0
    this.scrollingL = 0
    this.scrollingR = 0

    this.init()
  }

  init() {
    // fetch x&y
    if (this.isHorizontal) this.getX()
    if (this.isVertical) this.getY()

    // defines custom events to dispatch
    eventsInit(this.el, this.events)

    // main scroll event that informs everything
    this.el.addEventListener('scroll', this.onScroll, {
      passive: this.passiveMode,
    })

    // show dispatched events
    if (this.debugMode && process.env.NODE_ENV === 'development') {
      console.group('Detect Scroll Debugger')
      console.log('Element', this.el)
      console.log('Events', this.events)
      console.groupEnd()
    }

    // watch for changes
    this.watchScrollPosition()

    // reset value if destroyed
    this.destroyed = 0
    this.hasInit = 1
  }

  destroy() {
    // remove scroll event + timeout + custom events
    this.el.removeEventListener('scroll', this.onScroll, {
      passive: this.passiveMode,
    })
    // remove custom events
    eventsDestroy(this.el, this.events)
    // remove timeout (in case teardown fires mid-scroll)
    window.clearTimeout(this.timeout)
    // remove raf
    window.cancelAnimationFrame(this.rafId)
    this.rafKilled = true
    this.events = undefined
    this.destroyed = 1
    this.hasInit = 0
  }

  scrollTimeout() {
    this.timeout = setTimeout(() => {
      this.onScrollEnd()
    }, 120)
  }

  watchScrollPosition() {
    if (this.isHorizontal) this.watchX()
    if (this.isVertical) this.watchY()
  }

  getY() {
    return this.isWindow ? window.pageYOffset : this.el.scrollTop
  }

  getYMax() {
    let max = null

    if (this.isWindow) {
      max = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      )
    } else {
      max = Math.max(
        this.el.scrollHeight,
        this.el.offsetHeight,
        this.el.clientHeight
      )
    }

    return max - window.innerHeight
  }

  isMaxY() {
    return this.getY() >= this.getYMax()
  }

  isMinY() {
    return this.getY() <= 0
  }

  getX() {
    return this.isWindow ? window.pageXOffset : this.el.scrollLeft
  }

  getXMax() {
    let max = null

    if (this.isWindow) {
      max = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      )
    } else {
      max = Math.max(
        this.el.scrollWidth,
        this.el.offsetWidth,
        this.el.clientWidth
      )
    }

    return max - window.innerWidth
  }

  isMaxX() {
    return this.getX() >= this.getXMax()
  }

  isMinX() {
    return this.getX() <= 0
  }

  watchX() {
    const x = this.getX()
    const scrolling = x !== this.x
    const scrollingLeft = x < this.x
    const scrollingRight = x > this.x
    const atEnd = x !== this.x && this.isMaxX()
    const atStart = x !== this.x && this.isMinX()

    this.x = x

    if (scrolling) {
      this.onScrollStart()

      if (scrollingLeft && !this.scrollingL) {
        this.dispatch('scrollLeft')
        this.scrollingL = 1
        this.scrollingR = 0
      } else if (scrollingRight && !this.scrollingR) {
        this.dispatch('scrollRight')
        this.scrollingL = 0
        this.scrollingR = 1
      }
    }

    if (atStart) this.dispatch('scrollMinX')
    if (atEnd) this.dispatch('scrollMaxX')
    if (this.x) this.dispatch('scrollX')
  }

  watchY() {
    const y = this.getY()
    const scrolling = y !== this.y
    const scrollingUp = y < this.y
    const scrollingDown = y > this.y
    const atEnd = y !== this.y && this.isMaxY()
    const atStart = y !== this.y && this.isMinY()

    this.y = y

    if (scrolling) {
      this.onScrollStart()

      if (scrollingDown && !this.scrollingD) {
        this.dispatch('scrollDown')
        this.scrollingD = 1
        this.scrollingU = 0
      } else if (scrollingUp && !this.scrollingU) {
        this.dispatch('scrollUp')
        this.scrollingD = 0
        this.scrollingU = 1
      }
    }

    if (atStart) this.dispatch('scrollMinY')
    if (atEnd) this.dispatch('scrollMaxY')
    if (this.y) this.dispatch('scrollY')
  }

  dispatch(type) {
    const isValidOverride =
      typeof this.events === 'object' && type in this.events
    const isValidDefault =
      Array.isArray(this.events) && this.events.includes(type)
    const unthrottledEvents = ['scrollX', 'scrollY']
    const eventNotDuplicated = this.lastDispatch !== type

    // start/stop/direction events fire only once
    if (eventNotDuplicated && (isValidOverride || isValidDefault)) {
      this.el.dispatchEvent(
        new CustomEvent(type, {
          detail: {
            x: this.x,
            y: this.y,
          },
        })
      )
      this.lastDispatch = type

      if (this.debugMode) console.info(type)
    }

    // updates to x or y fire each time
    if (unthrottledEvents.includes(type)) {
      this.el.dispatchEvent(
        new CustomEvent(type, {
          detail: {
            x: this.x,
            y: this.y,
          },
        })
      )

      if (this.debugMode) console.info(type)
    }
  }

  onScroll() {
    if (this.rafKilled) return

    this.rafId = window.requestAnimationFrame(() => {
      this.watchScrollPosition()

      // refresh timeout, watch for scroll stop
      window.clearTimeout(this.timeout)
      this.scrollTimeout()
    })
  }

  onScrollStart() {
    if (!this.isScrolling && this.hasInit) {
      this.dispatch('scrollStart')
      this.isScrolling = true
    }
    this.hasScrolled = 1
  }

  onScrollEnd() {
    this.dispatch('scrollStop')
    this.isScrolling = false
    this.scrollingU = false
    this.scrollingD = false
    this.scrollingL = false
    this.scrollingR = false
  }
}
