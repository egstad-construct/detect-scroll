# Detect Scroll 📜️ 🔍️ 👀️

> A performant and lightweight (~1.6kb) ES6 module for detecting scroll activity (direction + location) for X and/or Y axis

[![Coverage:statements](./coverage/badge-statements.svg)](#)
[![Coverage:functions](./coverage/badge-functions.svg)](#)
[![Coverage:lines](./coverage/badge-lines.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

The default scroll event listener is amazing and all, but isn't exactly the most usable tool out of the box. It's all, _"Hey look, a user scrolled!"_. And I'm like _"Great! But like, in what direction and where did they stop?"_. And then it's all like, _"IDFK, how about you do some math and figure it out"_.

In short, this little library adds a handful of helpful [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)'s which make scroll detection a little more insightful.

> ### [View Example](https://egstad-construct.github.io/detect-scroll/)
> Note: Open your console to preview debug mode

---

## Installation

```js
npm install @egstad/detect-scroll
```

## Usage

### Example One

1. Install and import `detectScroll`.
2. Select an individual `element` you'd like to monitor the scroll activity of. Can be a string selector (ie: `'.scroll-container'`), or any valid `HTMLElement`. In our case, we'll use the `window`.
3. Register the [Event](#Events) listeners that you'd like to use. Any events that are not explicitly defined will not fire.
4. If/when you want to destroy the instance, running `destroy()` will remove all event listeners.

```js
import detectScroll from '@egstad/detect-scroll'

// setup instance & events
const instance = new detectScroll(window, {
  events: {
    scrollUp: foo(),
    scrollDown: bar(),
  },
})

// if/when you want to destroy the instance and events
instance.destroy()
```

### Example Two

Another way to get up and running with this library is to handle the events yourself. This option registers and dispatches all [Events](#Events), but you'll have to add/remove the event listeners yourself.

```js
import detectScroll from '@egstad/detect-scroll'

// setup instance
const instance = new detectScroll(window)

// setup events
window.addEventListener('scrollUp', foo)
window.addEventListener('scrollDown', bar)

// if/when you want to destroy all events
window.removeEventListener('scrollUp', foo)
window.removeEventListener('scrollDown', bar)
```

## Default Configuration

```js
const instance = new detectScroll(window, {
  vertical: true,
  horizontal: true,
  passiveMode: true,
  debugMode: false,
  events: undefined,
})
```

## Properties & Events worth knowing about

### Optional Properties

| Optional Properties | Default Value | Description                                   |
| ------------------- | ------------- | --------------------------------------------- |
| `vertical`          | `true`        | Registers & Dispatches y-axis activity        |
| `horizontal`        | `true`        | Registers & Dispatches x-axis activity        |
| `passiveMode`       | `true`        | Determines if scroll event is passive or not  |
| `debugMode`         | `false`       | Logs events in console as they dispatch       |
| `events`            | `undefined`   | Event overrides (see Events section for more) |

### Events

Scroll events are dispatched using [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)'s. Here's a gorgeous list of all 10.

If you would like to a specific selection of them, check out [this example](#Example-One).

| Custom Event Name | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `scrollStart`     | Fired when scrolling begins                            |
| `scrollStop`      | Fired when scrolling ends                              |
| `scrollX`         | Fired every time x position updates                    |
| `scrollY`         | Fired every time y position updates                    |
| `scrollUp`        | Fired when scrolling up                                |
| `scrollDown`      | Fired when scrolling down                              |
| `scrollLeft`      | Fired when scrolling left                              |
| `scrollRight`     | Fired when scrolling right                             |
| `scrollMinX`      | Fired when the left-most part of el/window is reached  |
| `scrollMaxX`      | Fired when the right-most part of el/window is reached |
| `scrollMinY`      | Fired when top of element/window is reached            |
| `scrollMaxY`      | Fired when bottom of element/window is reached         |

#### Event Template 

```js
const foo = (ev) => {
  console.log(ev.type)
}

const instance = new detectScroll(window, {
  events: {
    // exclude any of these and the event's won't be registered or fired
    scrollStart: foo,
    scrollStop: foo,
    scrollX: foo,
    scrollY: foo,
    scrollUp: foo,
    scrollDown: foo,
    scrollLeft: foo,
    scrollRight: foo,
    scrollMinX: foo,
    scrollMaxX: foo,
    scrollMinY: foo,
    scrollMaxY: foo,
  },
})
```
