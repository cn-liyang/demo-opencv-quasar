import { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  export interface RouteMeta {
    readonly title: string;
    readonly caption: string;
    readonly icon: string;
    readonly link: string;
  }
}

const mainChildren: RouteRecordRaw[] = [
  {
    path: "0",
    component: () => import("pages/_0_/UsagePage.vue"),
    meta: {
      title: "Using OpenCV.js",
      caption: "Hello OpenCV.js",
      icon: "mdi-numeric-1-box-outline",
      link: "https://docs.opencv.org/4.7.0/d0/d84/tutorial_js_usage.html",
    },
  },
  {
    path: "1",
    component: () => import("pages/_1_/ImageDisplayPage.vue"),
    meta: {
      title: "Getting Started with Images",
      caption: "Image Read and Show Example",
      icon: "mdi-numeric-2-box-outline",
      link: "https://docs.opencv.org/4.7.0/df/d24/tutorial_js_image_display.html",
    },
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "0",
    children: mainChildren,
  },
];

export { mainChildren };
export default routes;
