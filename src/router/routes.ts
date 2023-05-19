import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "01",
    children: routeChildrenMain,
  },
];

export default routes;
