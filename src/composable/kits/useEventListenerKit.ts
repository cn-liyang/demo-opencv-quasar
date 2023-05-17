export default function () {
  function onMountedPair<K extends keyof WindowEventMap>(
    target: Window,
    event: K,
    listener: EventListenerOrEventListenerObject
  ) {
    onMounted(() => target.addEventListener(event, listener));
    onUnmounted(() => target.removeEventListener(event, listener));
  }

  function onActivatedPair<K extends keyof WindowEventMap>(
    target: Window,
    event: K,
    listener: EventListenerOrEventListenerObject
  ) {
    onActivated(() => target.addEventListener(event, listener));
    onDeactivated(() => target.removeEventListener(event, listener));
  }

  return { onMountedPair, onActivatedPair };
}
