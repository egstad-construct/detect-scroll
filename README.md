# Detect Scroll 📜️ 🔍️ 👀️

> A performant and lightweight ES6 module for detecting scroll position and direction for on the X and/or Y axis

[![Coverage:statements](./coverage/badge-statements.svg)](#)
[![Coverage:functions](./coverage/badge-functions.svg)](#)
[![Coverage:lines](./coverage/badge-lines.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```js
npm install @egstad/detect-scroll
```

## Usage

This example fires `foo()` and `bar()` functions when a user scrolls down or up within the `window` .

```js
import detectScroll from '@egstad/detect-scroll'

// create instance & register events
const detectScrollWindow = new detectScroll(window, {
  events: {
    scrollDown: foo(),
    scrollUp: bar(),
  }
});

// destroy instance & events
detectScrollWindow.destroy()
```

## Options 

Configuration is easy as easy as falling down, babes.
1. Select the `element` you'd like to monitor the scroll activity of.
   - Could be any valid `HTMLElement`. For example, `window`, a `querySelector()`, etc. 
   - Don't pass a string or array, this isn't jQuery 🙃️
2. Define what scroll axis activity you'd like to monitor. By default, `vertical: true` is the default. You can monitor horizontal, vertical, or both axis.
3. Define the events you'd like to use.
   - For best performance, we don't assume anything here. Out of the box, no events fire unless you tell them to.

```js
new detectScroll(element, {
  vertical = true,
  horizontal = false,
  events = {            
    /************ VERTICAL & HORIZONTAL ************/
    scrollStart: null,  // scroll has begun
    scrollStop: null,   // scroll has ended

    /***************** VERTICAL ********************/
    scrollUp: null,     // scrolling up
    scrollDown: null,   // scrolling down
    scrollMinY: null,   // at scroll top
    scrollMaxY: null,   // at scroll end

    /**************** HORIZONTAL *******************/
    scrollLeft: null,   // scrolling left
    scrollRight: null,  // scrolling right
    scrollMinX: null,   // at scroll beginning
    scrollMaxX: null,   // at scroll end
  },
});

```

## Managing Your Own Events



```js
import detectScroll from '@egstad/detect-scroll'

// create instance using a reference to an element
const detectScrollWindow = new detectScroll(window);

// add the scroll listener(s) you'd like to listen to
scrollH.addEventListener('scrollUp', !yourFunction!>);

// destroy the instance & event listeners
detectScrollWindow.destroy()
scrollH.removeEventListener('scrollUp', !yourFunction);
```

## Events

Scroll events are dispatched using [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)'s, which makes them a goddamn breeze to setup and teardown. 

### Event setup
Set up the ones you need by using `addEventListener`'s 

### Event teardown
When you no longer need to listen to events, remember to `removeEventListener` to avoid any memory leaks.

```js
// Vertical & Horizontal Scroll Events
scrollStart // scroll started
scrollStop  // scroll completed

// Vertical Scroll Events
scrollUp    // scrolling up
scrollDown  // scrolling down
scrollMinY  // at top
scrollMaxY  // at bottom

// Horizontal Scroll Events
scrollLeft  // scrolling left
scrollRight // scrolling right
scrollMinX  // at beginning (left)
scrollMaxX  // at end (right)
```

## Example
