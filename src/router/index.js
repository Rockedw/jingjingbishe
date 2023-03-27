import { createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/home/Index.vue"),
  },
  {
    path: "/repo_detail",
    name:'repo_detail',
    component: () => import("@/pages/detail/RepoDetail.vue"),
  },
  {
    path:"/test",
    name:'test',
    component: () => import("@/pages/home/test.vue"),
  }
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes: routes
});

export default router;
