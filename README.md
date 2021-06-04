# Detect Scroll 📜️ 🔍️ 👀️

> A performant and lightweight ES6 module for detecting scroll activity (direction + location) for X and/or Y axis

[![Coverage:statements](./coverage/badge-statements.svg)](#)
[![Coverage:functions](./coverage/badge-functions.svg)](#)
[![Coverage:lines](./coverage/badge-lines.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

The default scroll event listener is kinda dumb. Sorry internet, but it's true. Out of the box it's all, _"Hey look, a user scrolled!"_. And I'm like _"Great! But like, where?"_. And then it's all like, _"IDFK, how about you do some math and figure it out"_. Cool cool cool, thanks for that, Karen.

This little library adds a handful of helpful [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)'s that can be used to do all sorts of cool internet thingies.

Maybe you show Stacy something when she's scrolling up/down/left/right? Or maybe you wanna hide something from Chad when he starts/stops scrolling? Cool babes, this 'lil library will help. Best part is that I did all the math so you don't have to. Lucky!

---

## Installation

```js
npm install @egstad/detect-scroll
```

---

## Usage

### Example #1

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

// if/when you want to destroy the instance
instance.destroy()
```

### Example #2

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

---

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

---

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

If you would like to a specific selection of them, check out [this example](#Example-#1).

| Custom Event Name | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `scrollStart`     | Fired when scrolling begins                            |
| `scrollStop`      | Fired when scrolling ends                              |
| `scrollUp`        | Fired when scrolling up                                |
| `scrollDown`      | Fired when scrolling down                              |
| `scrollLeft`      | Fired when scrolling left                              |
| `scrollRight`     | Fired when scrolling right                             |
| `scrollMinY`      | Fired when top of element/window is reached            |
| `scrollMaxY`      | Fired when bottom of element/window is reached         |
| `scrollMinX`      | Fired when the left-most part of el/window is reached  |
| `scrollMaxX`      | Fired when the right-most part of el/window is reached |
