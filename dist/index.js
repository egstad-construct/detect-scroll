;(() => {
  'use strict'
  var t = {
      253: (t, i, s) => {
        const e = ['scrollStart', 'scrollStop'],
          o = ['scrollUp', 'scrollDown', 'scrollMinY', 'scrollMaxY'],
          l = ['scrollLeft', 'scrollRight', 'scrollMinX', 'scrollMaxX']
        function h(t) {
          return (
            'object' == typeof t &&
            Object.keys(t).length > 0 &&
            !Array.isArray(t)
          )
        }
        ;(t = s.hmd(t)).exports = class {
          constructor(
            t,
            {
              horizontal: i = !1,
              vertical: s = !0,
              debugMode: r = !1,
              events: n,
            } = {}
          ) {
            var c, a, d
            ;(this.el = ((t) => {
              let i = null
              if ('object' == typeof t || t === window) i = t
              else {
                if ('string' != typeof t)
                  throw new TypeError(
                    'Marquee accepts either a HTML Element (object) or a class/id to query (string).'
                  )
                i = document.querySelector(t)
              }
              return i
            })(t)),
              (this.x = this.getX()),
              (this.y = this.getY()),
              (this.lastDispatch = null),
              (this.hasScrolled = !1),
              (this.isWindow = window === t),
              (this.isScrolling = !1),
              (this.isVertical = s),
              (this.isHorizontal = i),
              (this.rafId = null),
              (this.rafTick = 0),
              (this.rafKilled = !1),
              (this.teardown = this.teardown.bind(this)),
              (this.onScroll = this.onScroll.bind(this)),
              (this.events =
                ((c = n),
                (a = this.isVertical),
                (d = this.isHorizontal),
                c && h(c)
                  ? c
                  : !c || h(c)
                  ? [...e, ...(a ? o : []), ...(d ? l : [])]
                  : void console.error(
                      "Whoops! 'events' must be an object with at least one prop."
                    ))),
              (this.debugMode = r),
              this.init()
          }
          init() {
            var t, i
            this.el.addEventListener('scroll', this.onScroll, !1),
              (t = this.el),
              h((i = this.events)) &&
                Object.entries(i).forEach((i) => {
                  const [s, e] = i
                  t.addEventListener(s, e, !1)
                }),
              this.watchScrollPosition(),
              this.debugMode && console.warn('Dispated Events:', this.events)
          }
          teardown() {
            var t, i
            this.el.removeEventListener('scroll', this.onScroll, !1),
              (t = this.el),
              h((i = this.events)) &&
                Object.entries(i).forEach((i) => {
                  const [s, e] = i
                  t.removeEventListener(s, e, !1)
                }),
              window.clearTimeout(this.timeout),
              window.cancelAnimationFrame(this.rafId),
              (this.rafKilled = !0)
          }
          scrollTimeout() {
            this.timeout = setTimeout(() => {
              this.onScrollEnd()
            }, 120)
          }
          watchScrollPosition() {
            this.isHorizontal && this.watchX(), this.isVertical && this.watchY()
          }
          getY() {
            return this.isWindow ? window.pageYOffset : this.el.scrollTop
          }
          getYMax() {
            let t = null
            return (
              (t = this.isWindow
                ? Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.documentElement.clientHeight
                  )
                : Math.max(
                    this.el.scrollHeight,
                    this.el.offsetHeight,
                    this.el.clientHeight
                  )),
              t - window.innerHeight
            )
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
            let t = null
            return (
              (t = this.isWindow
                ? Math.max(
                    document.body.scrollWidth,
                    document.documentElement.scrollWidth,
                    document.body.offsetWidth,
                    document.documentElement.offsetWidth,
                    document.documentElement.clientWidth
                  )
                : Math.max(
                    this.el.scrollWidth,
                    this.el.offsetWidth,
                    this.el.clientWidth
                  )),
              t - window.innerWidth
            )
          }
          isMaxX() {
            return this.getX() >= this.getXMax()
          }
          isMinX() {
            return this.getX() <= 0
          }
          watchX() {
            const t = this.getX(),
              i = t !== this.x,
              s = t < this.x,
              e = t > this.x,
              o = t !== this.x && this.isMaxX(),
              l = t !== this.x && this.isMinX()
            i && this.onScrollStart(),
              s
                ? this.dispatch('scrollLeft')
                : e && this.dispatch('scrollRight'),
              o
                ? this.dispatch('scrollMaxX')
                : l && this.dispatch('scrollMinX'),
              (this.x = t)
          }
          watchY() {
            const t = this.getY(),
              i = t !== this.y,
              s = t < this.y,
              e = t > this.y,
              o = t !== this.y && this.isMaxY(),
              l = t !== this.y && this.isMinY()
            i && this.onScrollStart(),
              e ? this.dispatch('scrollDown') : s && this.dispatch('scrollUp'),
              o && this.dispatch('scrollMaxY'),
              l && this.dispatch('scrollMinY'),
              (this.y = t)
          }
          dispatch(t) {
            this.lastDispatch !== t &&
              (this.el.dispatchEvent(new CustomEvent(t)),
              (this.lastDispatch = t),
              this.debugMode && console.info(t))
          }
          onScroll() {
            this.rafKilled ||
              (this.rafId = window.requestAnimationFrame(() => {
                this.watchScrollPosition(),
                  window.clearTimeout(this.timeout),
                  this.scrollTimeout()
              }))
          }
          onScrollStart() {
            this.isScrolling ||
              (this.hasScrolled && this.dispatch('scrollStart'),
              (this.isScrolling = !0),
              (this.hasScrolled = !0))
          }
          onScrollEnd() {
            this.hasScrolled && this.dispatch('scrollStop'),
              (this.isScrolling = !1)
          }
        }
      },
    },
    i = {}
  function s(e) {
    if (i[e]) return i[e].exports
    var o = (i[e] = { id: e, loaded: !1, exports: {} })
    return t[e](o, o.exports, s), (o.loaded = !0), o.exports
  }
  ;(s.hmd = (t) => (
    (t = Object.create(t)).children || (t.children = []),
    Object.defineProperty(t, 'exports', {
      enumerable: !0,
      set: () => {
        throw new Error(
          'ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' +
            t.id
        )
      },
    }),
    t
  )),
    s(253)
})()
