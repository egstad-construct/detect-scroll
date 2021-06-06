/**
 * @jest-environment jsdom
 */

import detectScroll from '../index'
import { eventsSetup, eventsInit } from './events'

// is it an array with at least one event
test('Properly defines EventsSetup defaults', () => {
  // defaults
  let eventOverrides = null
  let isVertical = true
  let isHorizontal = false

  // try with event overrides
  const overrides = new detectScroll(window, {
    events: {
      onScroll: () => {
        isWorking = 1
      },
    },
  })
  expect(Object.keys(overrides.events)[0]).toBe('onScroll')

  // try with an empty object
  const overridesFail = new detectScroll(window, {
    events: {},
  })
  expect(overridesFail.events).toBe(undefined)

  // const scrollDetect = new detectScroll(window)
  expect(
    eventsSetup(eventOverrides, isVertical, isHorizontal).length
  ).toBeGreaterThan(0)
})

test('Properly runs eventsInit', () => {
  const instance = new detectScroll(global.window, {
    events: {
      onScrollStart: () => {
        console.log('hi')
      },
    },
  })

  expect(Object.keys(instance.events).length).toBeGreaterThan(0)
  instance.destroy()
  expect(instance.events).toBe(undefined)
})
