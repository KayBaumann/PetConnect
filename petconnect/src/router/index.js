import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import SearchView from '../views/SearchView.vue';
import DonateView from '../views/DonateView.vue';
import AdvertisementView from '../views/AdvertisementView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '../views/ProfileView.vue';
import CreateAdvertisementView from '../views/CreateAdvertisementView.vue';
import AdoptView from '../views/AdoptView.vue';
import SuccessView from '../views/SuccessView.vue';
import ContactView from '../views/ContactView.vue';
import ShelterView from '../views/ShelterView.vue';
import CreateShelterView from '../views/CreateShelterView.vue';
import EditPetView from '../views/EditPetView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/search', name: 'search', component: SearchView },
  { path: '/donate', name: 'donate', component: DonateView },
  { path: '/advertisement/:id', name: 'advertisement', component: AdvertisementView, props: true },
  { path: '/shelters', name: 'shelters', component: ShelterView },
  { path: '/adopt/:id', name: 'adopt', component: AdoptView, props: true },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/create-advertisement', name: 'createAdvertisement', component: CreateAdvertisementView, meta: { requiresAuth: true } },
  { path: '/create-shelter', name: 'createShelter', component: CreateShelterView, meta: { requiresAuth: true } },
  { path: '/success', name: 'Success', component: SuccessView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/pets/edit/:id', name: 'edit-pet', component: EditPetView},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;

