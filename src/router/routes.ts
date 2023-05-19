import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "0",
    children: routeChildrenMain,
  },
];

export default routes;
