import { Mat } from "@techstark/opencv-js";

const [useCvMatProvidingState, useCvMatInjectedState] = createInjectionState(() => {
  const matModel = ref<Mat>();

  return {
    matModel,
  };
});

export { useCvMatProvidingState };

export function useCvMatInjectedStateOrDefault() {
  return (
    useCvMatInjectedState() ?? {
      matModel: ref<Mat>(),
    }
  );
}
