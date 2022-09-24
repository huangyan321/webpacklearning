import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  { path: '/home', component: () => import(/* webpackChunkName: "home" */ './Home.vue') },
  { path: '/about', component: () => import(/* webpackChunkName: "about" */ './About.vue') },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
