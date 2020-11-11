import DetectScroll from '../index';

/**
 * VERTICAL SCROLL
 */
const scrollV = window;
// eslint-disable-next-line no-unused-vars
const scrollVInstance = new DetectScroll(scrollV);
const tipV = document.querySelector('.tip.v');
const vDir = tipV.querySelector('.direction');
const vPos = tipV.querySelector('.state');

function updateDirection(el, direction) {
  if (el.innerText !== direction) {
    // eslint-disable-next-line no-param-reassign
    el.innerText = direction;
  }
}

function updateState(el, position) {
  if (el.innerText !== position) {
    // eslint-disable-next-line no-param-reassign
    el.innerText = position;
  }
}

scrollV.addEventListener('scrollDown', () => {
  updateDirection(vDir, 'down');
  updateState(vPos, 'scrolling');
});

scrollV.addEventListener('scrollUp', () => {
  updateDirection(vDir, 'up');
  updateState(vPos, 'scrolling');
});

scrollV.addEventListener('scrollStop', () => {
  updateState(vPos, 'paused');
});

scrollV.addEventListener('scrollTop', () => {
  updateDirection(vDir, 'top');
});

scrollV.addEventListener('scrollBottom', () => {
  updateDirection(vDir, 'bottom');
});

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
const scrollH = document.querySelector('.h');
// eslint-disable-next-line no-unused-vars
const scrollHInstance = new DetectScroll(scrollH, { horizontal: true, vertical: false });
const tipH = document.querySelector('.hori');
const hDir = tipH.querySelector('.direction');
const hPos = tipH.querySelector('.state');

scrollH.addEventListener('scrollRight', () => {
  updateDirection(hDir, 'right');
  updateState(hPos, 'scrolling');
});

scrollH.addEventListener('scrollLeft', () => {
  updateDirection(hDir, 'left');
  updateState(hPos, 'scrolling');
});

scrollH.addEventListener('scrollStop', () => {
  updateState(hPos, 'paused');
});

scrollH.addEventListener('scrollBeginning', () => {
  updateDirection(hDir, 'beginning');
});

scrollH.addEventListener('scrollEnd', () => {
  updateDirection(hDir, 'end');
});
