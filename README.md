# Detect Preferred Color Scheme 🐛️ 🔍️ 👀️

> A micro ES6 module (~0.5KB) for detecting a users `preferred-color-scheme` and watching for changes.

[![Coverage:statements](./coverage/badge-statements.svg)](#)
[![Coverage:functions](./coverage/badge-functions.svg)](#)
[![Coverage:lines](./coverage/badge-lines.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```js
npm install @egstad/detect-theme
```

## Usage

```js
import theme from '@egstad/detect-theme'

// watch for `colorSchemeUpdated` events
window.addEventListener('colorSchemeUpdated', (e) => {
  switch (e.detail.theme) {
    case 'dark':
      // dark theme code here...
      break;
    case 'light':
      // light theme code here...
      break;
    default:
      // user has no preference
      break;
  }
})


// 1. fetch preferred theme
// 2. dispatch result via 'colorSchemeUpdated'
// 3. watch for changes
theme.watch()
```

## Methods 

The `watch()` method is more than likely all you'll need. Here's a list of what each method in the module does.

```js
// 1. fetch preferred theme
// 2. dispatch result via 'colorSchemeUpdated'
theme.get()

// 1. runs `get()`
// 2. adds `colorSchemeUpdated` event listener to window
theme.watch()

// removes `colorSchemeUpdated` event listener from window
theme.destroy()
```

## Example

Here is a screencap demonstrating the realtime updates on Mac OS *(System Preferences > General > Appearance)*.

![Example of changing Preferred Color Scheme on Mac OS](./test/_test.gif)

### Example: Editing CSS Variables on `colorSchemeUpdated`

```js
window.addEventListener('colorSchemeUpdated', (e) => {
  switch (e.detail.theme) {
    case 'dark':
      // dark theme
      root.style.setProperty('--background', 'black');
      root.style.setProperty('--foreground', 'white');
      break;
    case 'light':
      // light theme
      root.style.setProperty('--background', 'white');
      root.style.setProperty('--foreground', 'black');
      break;
    default:
      // user has no preference
      root.style.setProperty('--background', '#D11D05');
      root.style.setProperty('--foreground', '#D1E5E1');
      break;
  }
})
```