import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import Resume from "./pages/Resume.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/resume", component: Resume },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0 };
    }
  },
});

export default router;
