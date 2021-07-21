// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/getElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEl = getEl;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getEl(el) {
  var element = null;

  if (isElement(el) || el === window) {
    element = el;
  } else if (typeof el === 'string') {
    element = document.querySelector(el);
  }

  return element;
} // Returns true if it is a DOM element


function isElement(o) {
  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? o instanceof HTMLElement : o && _typeof(o) === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
}
},{}],"../src/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventsSetup = eventsSetup;
exports.eventsInit = eventsInit;
exports.eventsDestroy = eventsDestroy;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var eventsDefault = ['scrollStart', 'scrollStop'];
var eventsVertical = ['scrollX', 'scrollUp', 'scrollDown', 'scrollMinY', 'scrollMaxY'];
var eventsHorizontal = ['scrollY', 'scrollLeft', 'scrollRight', 'scrollMinX', 'scrollMaxX'];

function eventsSetup(eventOverrides, isVertical, isHorizontal) {
  // if overrides exist
  if (eventOverrides && typeOf(eventOverrides)) {
    return eventOverrides;
  } // if overrides are an invalid format
  else if (eventOverrides && !typeOf(eventOverrides)) {
    console.error("Whoops! 'events' must be an object with at least one prop.");
  } // defaults
  else {
    return [].concat(eventsDefault, _toConsumableArray(isVertical ? eventsVertical : []), _toConsumableArray(isHorizontal ? eventsHorizontal : []));
  }
}

function eventsInit(element, events) {
  if (typeOf(events)) {
    Object.entries(events).forEach(function (event) {
      var _event = _slicedToArray(event, 2),
          key = _event[0],
          value = _event[1];

      element.addEventListener(key, value, false);
    });
  }
}

function eventsDestroy(element, events) {
  if (typeOf(events)) {
    Object.entries(events).forEach(function (event) {
      var _event2 = _slicedToArray(event, 2),
          key = _event2[0],
          value = _event2[1];

      element.removeEventListener(key, value, false);
    });
  }
}

function typeOf(events) {
  return _typeof(events) === 'object' && Object.keys(events).length > 0 && !Array.isArray(events);
}
},{}],"../index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getElement = require("./src/getElement");

var _events = require("./src/events");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DetectScroll = /*#__PURE__*/function () {
  function DetectScroll(el) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$horizontal = _ref.horizontal,
        horizontal = _ref$horizontal === void 0 ? true : _ref$horizontal,
        _ref$vertical = _ref.vertical,
        vertical = _ref$vertical === void 0 ? true : _ref$vertical,
        _ref$debugMode = _ref.debugMode,
        debugMode = _ref$debugMode === void 0 ? false : _ref$debugMode,
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? undefined : _ref$events;

    _classCallCheck(this, DetectScroll);

    this.el = (0, _getElement.getEl)(el);
    this.x = this.getX();
    this.y = this.getY();
    this.lastDispatch = null;
    this.hasScrolled = false;
    this.isWindow = window === el;
    this.isScrolling = undefined;
    this.isVertical = vertical;
    this.isHorizontal = horizontal;
    this.rafId = null;
    this.rafTick = 0;
    this.rafKilled = false;
    this.timeout = null;
    this.destroy = this.destroy.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.events = (0, _events.eventsSetup)(events, this.isVertical, this.isHorizontal);
    this.debugMode = debugMode;
    this.hasInit = 0;
    this.destroyed = null;
    this.passiveMode = true;
    this.scrollingU = 0;
    this.scrollingD = 0;
    this.scrollingL = 0;
    this.scrollingR = 0;
    this.init();
  }

  _createClass(DetectScroll, [{
    key: "init",
    value: function init() {
      // fetch x&y
      if (this.isHorizontal) this.getX();
      if (this.isVertical) this.getY(); // defines custom events to dispatch

      (0, _events.eventsInit)(this.el, this.events); // main scroll event that informs everything

      this.el.addEventListener('scroll', this.onScroll, {
        passive: this.passiveMode
      }); // show dispatched events

      if (this.debugMode && "development" === 'development') {
        console.group('Detect Scroll Debugger');
        console.log('Element', this.el);
        console.log('Events', this.events);
        console.groupEnd();
      } // watch for changes


      this.watchScrollPosition(); // reset value if destroyed

      this.destroyed = 0;
      this.hasInit = 1;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // remove scroll event + timeout + custom events
      this.el.removeEventListener('scroll', this.onScroll, {
        passive: this.passiveMode
      }); // remove custom events

      (0, _events.eventsDestroy)(this.el, this.events); // remove timeout (in case teardown fires mid-scroll)

      window.clearTimeout(this.timeout); // remove raf

      window.cancelAnimationFrame(this.rafId);
      this.rafKilled = true;
      this.events = undefined;
      this.destroyed = 1;
      this.hasInit = 0;
    }
  }, {
    key: "scrollTimeout",
    value: function scrollTimeout() {
      var _this = this;

      this.timeout = setTimeout(function () {
        _this.onScrollEnd();
      }, 120);
    }
  }, {
    key: "watchScrollPosition",
    value: function watchScrollPosition() {
      if (this.isHorizontal) this.watchX();
      if (this.isVertical) this.watchY();
    }
  }, {
    key: "getY",
    value: function getY() {
      return this.isWindow ? window.pageYOffset : this.el.scrollTop;
    }
  }, {
    key: "getYMax",
    value: function getYMax() {
      var max = null;

      if (this.isWindow) {
        max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
      } else {
        max = Math.max(this.el.scrollHeight, this.el.offsetHeight, this.el.clientHeight);
      }

      return max - window.innerHeight;
    }
  }, {
    key: "isMaxY",
    value: function isMaxY() {
      return this.getY() >= this.getYMax();
    }
  }, {
    key: "isMinY",
    value: function isMinY() {
      return this.getY() <= 0;
    }
  }, {
    key: "getX",
    value: function getX() {
      return this.isWindow ? window.pageXOffset : this.el.scrollLeft;
    }
  }, {
    key: "getXMax",
    value: function getXMax() {
      var max = null;

      if (this.isWindow) {
        max = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
      } else {
        max = Math.max(this.el.scrollWidth, this.el.offsetWidth, this.el.clientWidth);
      }

      return max - window.innerWidth;
    }
  }, {
    key: "isMaxX",
    value: function isMaxX() {
      return this.getX() >= this.getXMax();
    }
  }, {
    key: "isMinX",
    value: function isMinX() {
      return this.getX() <= 0;
    }
  }, {
    key: "watchX",
    value: function watchX() {
      var x = this.getX();
      var scrolling = x !== this.x;
      var scrollingLeft = x < this.x;
      var scrollingRight = x > this.x;
      var atEnd = x !== this.x && this.isMaxX();
      var atStart = x !== this.x && this.isMinX();
      this.x = x;

      if (scrolling) {
        this.onScrollStart();

        if (scrollingLeft && !this.scrollingL) {
          this.dispatch('scrollLeft');
          this.scrollingL = 1;
          this.scrollingR = 0;
        } else if (scrollingRight && !this.scrollingR) {
          this.dispatch('scrollRight');
          this.scrollingL = 0;
          this.scrollingR = 1;
        }
      }

      if (atStart) this.dispatch('scrollMinX');
      if (atEnd) this.dispatch('scrollMaxX');
      if (this.x) this.dispatch('scrollX');
    }
  }, {
    key: "watchY",
    value: function watchY() {
      var y = this.getY();
      var scrolling = y !== this.y;
      var scrollingUp = y < this.y;
      var scrollingDown = y > this.y;
      var atEnd = y !== this.y && this.isMaxY();
      var atStart = y !== this.y && this.isMinY();
      this.y = y;

      if (scrolling) {
        this.onScrollStart();

        if (scrollingDown && !this.scrollingD) {
          this.dispatch('scrollDown');
          this.scrollingD = 1;
          this.scrollingU = 0;
        } else if (scrollingUp && !this.scrollingU) {
          this.dispatch('scrollUp');
          this.scrollingD = 0;
          this.scrollingU = 1;
        }
      }

      if (atStart) this.dispatch('scrollMinY');
      if (atEnd) this.dispatch('scrollMaxY');
      if (this.y) this.dispatch('scrollY');
    }
  }, {
    key: "dispatch",
    value: function dispatch(type) {
      var isValidOverride = _typeof(this.events) === 'object' && type in this.events;
      var isValidDefault = Array.isArray(this.events) && this.events.includes(type);
      var unthrottledEvents = ['scrollX', 'scrollY'];
      var eventNotDuplicated = this.lastDispatch !== type; // start/stop/direction events fire only once

      if (eventNotDuplicated && (isValidOverride || isValidDefault)) {
        this.el.dispatchEvent(new CustomEvent(type, {
          detail: {
            x: this.x,
            y: this.y
          }
        }));
        this.lastDispatch = type;
        if (this.debugMode) console.info(type);
      } // updates to x or y fire each time


      if (unthrottledEvents.includes(type)) {
        this.el.dispatchEvent(new CustomEvent(type, {
          detail: {
            x: this.x,
            y: this.y
          }
        }));
        if (this.debugMode) console.info(type);
      }
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      var _this2 = this;

      if (this.rafKilled) return;
      this.rafId = window.requestAnimationFrame(function () {
        _this2.watchScrollPosition(); // refresh timeout, watch for scroll stop


        window.clearTimeout(_this2.timeout);

        _this2.scrollTimeout();
      });
    }
  }, {
    key: "onScrollStart",
    value: function onScrollStart() {
      if (!this.isScrolling && this.hasInit) {
        this.dispatch('scrollStart');
        this.isScrolling = true;
      }

      this.hasScrolled = 1;
    }
  }, {
    key: "onScrollEnd",
    value: function onScrollEnd() {
      this.dispatch('scrollStop');
      this.isScrolling = false;
      this.scrollingU = false;
      this.scrollingD = false;
      this.scrollingL = false;
      this.scrollingR = false;
    }
  }]);

  return DetectScroll;
}();

exports.default = DetectScroll;
},{"./src/getElement":"../src/getElement.js","./src/events":"../src/events.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateState(el, position) {
  if (el.innerText !== position) {
    // eslint-disable-next-line no-param-reassign
    el.innerText = position;
  }
}

function updateDirection(el, direction) {
  el.innerText = direction;
} // ----------------------------------------------------------------------------
// Window Element
// ----------------------------------------------------------------------------


var hori = document.querySelector('.hori');
var tool1 = document.querySelector('.tip.window');
var poster = document.querySelector('.poster');
var state1 = tool1.querySelector('.stat');
var dir1 = tool1.querySelector('.dire');
var x1 = tool1.querySelector('.x');
var y1 = tool1.querySelector('.y');
window.detectScroll = new _index.default(window, {
  // horizontal: false,
  debugMode: true,
  events: {
    scrollStart: function scrollStart() {
      updateState(state1, 'is scrolling');
    },
    scrollStop: function scrollStop() {
      updateState(state1, 'is not scrolling');
      updateDirection(dir1, '');
    },
    scrollUp: function scrollUp(ev) {
      updateDirection(dir1, 'up');
    },
    scrollDown: function scrollDown() {
      updateDirection(dir1, 'down');
    },
    scrollLeft: function scrollLeft() {
      updateDirection(dir1, 'left');
    },
    scrollRight: function scrollRight() {
      updateDirection(dir1, 'right');
    },
    scrollX: function scrollX() {
      updateDirection(x1, Math.round(window.detectScroll.x)); // background:
    },
    scrollY: function scrollY(ev) {
      var y = window.detectScroll ? window.detectScroll.y : 0;
      updateDirection(y1, Math.round(y));
      poster.style.backgroundImage = "conic-gradient(from ".concat(y * 0.05, "deg, #101115, #298DD9, #DEE4CA, #F7BF46, #EF1A03)");
      hori.scrollTo(y, 0);
      console.log(ev); // console.log(instanceWindow.y)
    } // scrollMaxY: () => {},
    // scrollMinX: () => {},
    // scrollMaxX: () => {},

  }
}); // // const tool2 = hori.querySelector('.tip')
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
},{"../index.js":"../index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62694" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map