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
    component: () => import("pages/_0_/HelloPage.vue"),
    meta: {
      title: "Using OpenCV.js",
      caption: "Hello OpenCV.js",
      icon: "front_hand",
      link: "https://docs.opencv.org/4.7.0/d0/d84/tutorial_js_usage.html",
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
