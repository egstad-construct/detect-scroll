export default function updateState(el, position) {
  if (el.innerText !== position) {
    // eslint-disable-next-line no-param-reassign
    el.innerText = position
  }
}
