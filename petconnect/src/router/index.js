import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import SearchView from '../views/SearchView.vue';
import DonateView from '../views/DonateView.vue';
import AdvertisementView from '../views/AdvertisementView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/donate',
    name: 'donate',
    component: DonateView,
  },
  {
    path: '/advertisement/:id',
    name: 'advertisement',
    component: AdvertisementView,
    props: true, // Pass route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
