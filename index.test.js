import detectScroll from './index'

// default events
test('Properly creates detectScroll class with default events', () => {
  let isWorking = 0

  // create instance
  new detectScroll(global.window)
  // add manual listener
  global.window.addEventListener('onScroll', () => {
    isWorking = 1
  })
  // dispatch event
  global.window.dispatchEvent(new CustomEvent('onScroll'))
  expect(isWorking).toBe(1)
})

// event overrides
test('Properly creates detectScroll class with event overrides', () => {
  let isWorking = 0

  new detectScroll(global.window, {
    events: {
      onScroll: () => {
        isWorking = 1
      },
    },
  })

  global.window.dispatchEvent(new CustomEvent('onScroll'))
  expect(isWorking).toBe(1)
})

test('Properly destroyed detectScroll', () => {
  let isWorking = 0

  // create instance
  const scroll = new detectScroll(global.window)
  // add manual listener
  global.window.addEventListener('onScroll', () => {
    isWorking = 1
  })
  // dispatch event
  global.window.dispatchEvent(new CustomEvent('onScroll'))
  expect(isWorking).toBe(1)

  scroll.destroy()
  expect(scroll.destroyed).toBe(1)
})
