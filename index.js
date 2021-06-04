import { getEl } from './src/getElement'
import { eventsSetup, eventsInit, eventsDestroy } from './src/events'

class detectScroll {
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
    this.isScrolling = false
    this.isVertical = vertical
    this.isHorizontal = horizontal
    this.rafId = null
    this.rafTick = 0
    this.rafKilled = false
    this.destroy = this.destroy.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.events = eventsSetup(events, this.isVertical, this.isHorizontal)
    this.debugMode = debugMode
    this.destroyed = null
    this.passiveMode = true

    this.init()
  }

  init() {
    // main scroll event that informs everything
    this.el.addEventListener('scroll', this.onScroll, {
      passive: this.passiveMode,
    })
    // defines custom events to dispatch
    eventsInit(this.el, this.events)
    // monitor scroll positions
    this.watchScrollPosition()
    // show dispatched events
    if (this.debugMode) console.log('Dispated Events:', this.events)
    // reset value if destroyed
    this.destroyed = 0
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

    if (scrolling) {
      this.onScrollStart()
    }

    if (scrollingLeft) {
      this.dispatch('scrollLeft')
    } else if (scrollingRight) {
      this.dispatch('scrollRight')
    }

    if (atEnd) {
      this.dispatch('scrollMaxX')
    } else if (atStart) {
      this.dispatch('scrollMinX')
    }

    this.x = x
  }

  watchY() {
    const y = this.getY()
    const scrolling = y !== this.y
    const scrollingUp = y < this.y
    const scrollingDown = y > this.y
    const atEnd = y !== this.y && this.isMaxY()
    const atStart = y !== this.y && this.isMinY()

    if (scrolling) {
      this.onScrollStart()
    }
    if (scrollingDown) {
      this.dispatch('scrollDown')
    } else if (scrollingUp) {
      this.dispatch('scrollUp')
    }

    if (atEnd) {
      this.dispatch('scrollMaxY')
    }
    if (atStart) {
      this.dispatch('scrollMinY')
    }

    this.y = y
  }

  dispatch(type) {
    const isValidOverride = typeof o === 'object' && type in this.events
    const isValidDefault =
      Array.isArray(this.events) && this.events.includes(type)

    if (this.lastDispatch !== type && (isValidOverride || isValidDefault)) {
      this.el.dispatchEvent(new CustomEvent(type))
      this.lastDispatch = type

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
    if (!this.isScrolling) {
      // this condition addresses an unwanted fire on load
      if (this.hasScrolled) this.dispatch('scrollStart')
      this.isScrolling = true
      this.hasScrolled = true
    }
  }

  onScrollEnd() {
    // this condition addresses an unwanted fire on load
    if (this.hasScrolled) this.dispatch('scrollStop')
    this.isScrolling = false
  }
}

module.exports = detectScroll
