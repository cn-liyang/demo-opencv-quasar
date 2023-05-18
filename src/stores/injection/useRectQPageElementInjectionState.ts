import { MaybeComputedElementRef } from "@vueuse/core";

const [useQPageElementProvidingState, useQPageElementInjectedState] = createInjectionState(
  (e: MaybeComputedElementRef) => {
    const { width, height } = useElementSize(e);

    return { width, height };
  }
);

export { useQPageElementProvidingState };

export function useQPageElementInjectedStateOrDefault() {
  return (
    useQPageElementInjectedState() ?? {
      width: ref(0),
      height: ref(0),
    }
  );
}
