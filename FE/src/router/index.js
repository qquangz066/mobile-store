import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/home/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import( '../views/admin/Admin.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
