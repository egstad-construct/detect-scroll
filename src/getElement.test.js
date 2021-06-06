/**
 * @jest-environment jsdom
 */

import { getEl } from './getElement'

test('Properly runs getEl', () => {
  // create a mock element
  const body = global.document.querySelector('body')
  const div = global.document.createElement('div')
  div.classList.add('container')
  body.appendChild(div)

  // try window element
  expect(getEl(window)).toBe(window)

  // try html element
  expect(getEl(div).tagName).toBe('DIV')
  expect(getEl(div).classList.contains('container'))

  // try string element
  expect(getEl('.container').tagName).toBe('DIV')
})
