import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/home',
    component: () =>
      import(
        /* webpackChunkName: "home" */
        /* webpackPrefetch: true */
        './Home.vue'
      ),
  },
  {
    path: '/about',
    component: () =>
      import(
        /* webpackChunkName: "about" */
        /* webpackPrefetch: true */
        './About.vue'
      ),
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
