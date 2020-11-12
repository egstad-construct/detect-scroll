import DetectScroll from '../index';

function updateDirection(el, direction) {
  // if (el.innerText !== direction) {
  // eslint-disable-next-line no-param-reassign
  el.innerText = direction;
  // }
}

function updateState(el, position) {
  if (el.innerText !== position) {
    // eslint-disable-next-line no-param-reassign
    el.innerText = position;
  }
}

const scrollV = window;
const teardownV = document.querySelector('.teardown');
// eslint-disable-next-line no-unused-vars
const tipV = document.querySelector('.tip.v');
const vDir = tipV.querySelector('.direction');
const vPos = tipV.querySelector('.state');

const onScrollDown = () => {
  updateDirection(vDir, 'down');
  updateState(vPos, 'scrolling');
};

const onScrollUp = () => {
  updateDirection(vDir, 'up');
  updateState(vPos, 'scrolling');
};

const onScrollStop = () => {
  updateDirection(vDir, 'scroll');
  updateState(vPos, 'paused');
};
/**
 * VERTICAL SCROLL
 */

const scrollVInstance = new DetectScroll(scrollV, {
  horizontal: false,
  events: {
    scrollDown: onScrollDown,
    scrollUp: onScrollUp,
    scrollStop: onScrollStop,
  },
});

console.log(typeof document.querySelector('.h'));

// add your own events! if you do tho, you'll have to pick up your own trash tho
teardownV.addEventListener('click', () => {
  scrollVInstance.teardown();
  // scrollV.removeEventListener('scrollDown', scrollDown);
  // scrollV.removeEventListener('scrollUp', scrollUp);
  // scrollV.removeEventListener('scrollStop', scrollStop);
});

// scrollV.addEventListener('scrollDown', scrollDown);
// scrollV.addEventListener('scrollUp', scrollUp);
// scrollV.addEventListener('scrollStop', scrollStop);

// scrollV.addEventListener('scrollUp', () => {
//   updateDirection(vDir, 'up');
//   updateState(vPos, 'scrolling');
// });

// scrollV.addEventListener('scrollStop', () => {
//   updateState(vPos, 'paused');
// });

// scrollV.addEventListener('scrollMinY', () => {
//   updateDirection(vDir, 'top');
// });

// scrollV.addEventListener('scrollMaxY', () => {
//   updateDirection(vDir, 'bottom');
// });

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
const teardownH = document.querySelector('.teardown-h');

// eslint-disable-next-line no-unused-vars
const scrollHInstance = new DetectScroll(scrollH, { horizontal: true, vertical: false });
const tipH = document.querySelector('.hori');
const hDir = tipH.querySelector('.direction');
const hPos = tipH.querySelector('.state');

teardownH.addEventListener('click', () => {
  scrollHInstance.teardown();
});

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

scrollH.addEventListener('scrollMinX', () => {
  updateDirection(hDir, 'beginning');
});

scrollH.addEventListener('scrollMaxX', () => {
  updateDirection(hDir, 'end');
});
