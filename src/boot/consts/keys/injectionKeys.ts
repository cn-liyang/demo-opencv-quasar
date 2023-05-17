import { InjectionKey } from "vue";
import { Mat } from "@techstark/opencv-js";

export const KEY_INJECTION_MAT: InjectionKey<Mat> = Symbol();
