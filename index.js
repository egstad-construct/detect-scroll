export default class detectScroll {
  constructor(el, {
    horizontal = false,
    vertical = true,
  } = {}) {
    this.el = (el || window);
    this.x = this.getX();
    this.y = this.getY();
    this.isWindow = (window === el);
    this.isScrolling = false;
    this.isVertical = vertical;
    this.isHorizontal = horizontal;
    this.rafId = null;
    this.rafTick = 0;
    this.rafKilled = false;

    this.setup();
    this.watchX();
    this.watchY();
  }

  setup() {
    this.el.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  teardown() {
    this.el.removeEventListener('scroll', this.onScroll.bind(this), false);
    window.clearTimeout(this.timeout);
    window.cancelAnimationFrame(this.rafId);
    this.rafKilled = true;
  }

  scrollTimeout() {
    this.timeout = setTimeout(() => {
      this.onScrollEnd();
    }, 120);
  }

  getY() {
    return (this.isWindow ? window.pageYOffset : this.el.scrollTop);
  }

  getYMax() {
    let max = null;

    if (this.isWindow) {
      max = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
      );
    } else {
      max = Math.max(
        this.el.scrollHeight,
        this.el.offsetHeight,
        this.el.clientHeight,
      );
    }

    return (max - window.innerHeight);
  }

  isMaxY() {
    return (this.getY() >= this.getYMax());
  }

  isMinY() {
    return (this.getY() <= 0);
  }

  getX() {
    return (this.isWindow ? window.pageXOffset : this.el.scrollLeft);
  }

  getXMax() {
    let max = null;

    if (this.isWindow) {
      max = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
      );
    } else {
      max = Math.max(
        this.el.scrollWidth,
        this.el.offsetWidth,
        this.el.clientWidth,
      );
    }

    return (max - window.innerWidth);
  }

  isMaxX() {
    return (this.getX() >= this.getXMax());
  }

  isMinX() {
    return (this.getX() <= 0);
  }

  watchX() {
    const x = this.getX();
    const scrolling = (x !== this.x);
    const scrollingLeft = (x < this.x);
    const scrollingRight = (x > this.x);
    const atEnd = (x !== this.x && this.isMaxX());
    const atStart = (x !== this.x && this.isMinX());

    if (scrolling) {
      this.onScrollStart();
    }

    if (scrollingLeft) {
      this.dispatch('scrollLeft');
    } else if (scrollingRight) {
      this.dispatch('scrollRight');
    }

    if (atEnd) {
      this.dispatch('scrollEnd');
    } else if (atStart) {
      this.dispatch('scrollBeginning');
    }

    this.x = x;
  }

  watchY() {
    const y = this.getY();
    const scrolling = (y !== this.y);
    const scrollingUp = (y < this.y);
    const scrollingDown = (y > this.y);
    const atEnd = (y !== this.y && this.isMaxY());
    const atStart = (y !== this.y && this.isMinY());

    if (scrolling) {
      this.onScrollStart();
    }
    if (scrollingDown) {
      this.dispatch('scrollDown');
    } else if (scrollingUp) {
      this.dispatch('scrollUp');
    }

    if (atEnd) {
      this.dispatch('scrollBottom');
    } else if (atStart) {
      this.dispatch('scrollTop');
    }

    this.y = y;
  }

  dispatch(type) {
    this.el.dispatchEvent(new CustomEvent(type));
  }

  onScroll() {
    if (this.rafKilled) return;

    this.rafId = window.requestAnimationFrame(() => {
      if (this.isHorizontal) this.watchX();
      if (this.isVertical) this.watchY();

      // refresh timeout, watch for scroll stop
      window.clearTimeout(this.timeout);
      this.scrollTimeout();
    });
  }

  onScrollStart() {
    if (!this.isScrolling) {
      this.dispatch('scrollStart');
      this.isScrolling = true;
    }
  }

  onScrollEnd() {
    this.dispatch('scrollStop');
    this.isScrolling = false;
  }
}
