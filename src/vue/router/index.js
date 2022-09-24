import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  { path: '/home', component: () => import('./Home.vue') },
  { path: '/about', component: () => import('./About.vue') },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
