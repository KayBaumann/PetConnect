<template>
  <div id="app">
    <header :class="{ hidden: isNavbarHidden }">
      <nav>
        <ul>
          <li><router-link to="/">{{ $t('home') }}</router-link></li>
          <li><router-link to="/search">{{ $t('nav.search') }}</router-link></li>
          <li><router-link to="/shelters">{{ $t('nav.shelters') }}</router-link></li>
          <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
          <li><router-link to="/donate">{{ $t('donate') }}</router-link></li>
          <li><router-link to="/contact">{{ $t('contact') }}</router-link></li>

          <li v-if="isAuthenticated" class="dropdown">
            <div class="dropdown-trigger">
              <button>
                <img src="/assets/profile-icon-white.png" alt="Profile" class="icon-size" />
              </button>
              <ul class="dropdown-menu">
                <li><router-link to="/profile">{{ $t('profile') }}</router-link></li>
                <li><router-link to="/create-advertisement">{{ $t('createAdvertisement') }}</router-link></li>
                <li><button @click="logout">{{ $t('Logout') }}</button></li>
              </ul>
            </div>
          </li>

          <li class="dropdown">
            <div class="dropdown-trigger">
              <button>
                <img :src="currentLanguageIcon" :alt="currentLanguageAlt" class="icon-size" />
              </button>
              <ul class="dropdown-menu">
                <li
                  v-for="(icon, lang) in languageIcons"
                  :key="lang"
                  @click="changeLanguage(lang)"
                >
                  <img :src="icon.src" :alt="icon.alt" />
                  <span>{{ icon.alt }}</span>
                </li>
              </ul>
            </div>
          </li>

          <li v-if="!isAuthenticated">
            <router-link to="/login">{{ $t('Login') }}</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { locale } = useI18n();

const languageIcons = {
  en: { src: '/assets/united-kingdom.png', alt: 'English' },
  de: { src: '/assets/german.png', alt: 'Deutsch' },
  fr: { src: '/assets/france.png', alt: 'Français' },
  it: { src: '/assets/italy.png', alt: 'Italiano' }
};

const currentLocale = ref(localStorage.getItem('lang') || 'de');
locale.value = currentLocale.value;

function changeLanguage(language) {
  currentLocale.value = language;
  locale.value = language;
  localStorage.setItem('lang', language);
}

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

function logout() {
  localStorage.setItem('isAuthenticated', 'false');
  router.push('/');
  window.location.reload();
}

const currentLanguageIcon = computed(() => languageIcons[currentLocale.value]?.src || '/assets/united-kingdom.png');
const currentLanguageAlt = computed(() => languageIcons[currentLocale.value]?.alt || 'English');

// Navbar Scroll Hiding
const isNavbarHidden = ref(false);
let lastScrollPosition = 0;

function handleScroll() {
  const currentScrollPosition = window.scrollY;
  isNavbarHidden.value = currentScrollPosition > lastScrollPosition && currentScrollPosition > 100;
  lastScrollPosition = currentScrollPosition;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
header {
  background-color: #1f2937;
  padding: 15px 30px;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
}

header.hidden {
  transform: translateY(-100%);
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

nav ul li {
  position: relative;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
}

nav ul li a:hover {
  background-color: #374151;
  transform: scale(1.05);
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.2s;
  color: white;
}

button:hover {
  background-color: #374151;
  transform: scale(1.1);
}

button img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.dropdown-trigger {
  position: relative;
  display: inline-block;
}

.dropdown:hover .dropdown-menu {
  display: flex;
  opacity: 1;
  pointer-events: auto;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(145deg, #1f2937, #2a3649);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  box-shadow: 0 10px 20px rgb(0 0 0 / 25%);
  z-index: 100;
  color: white;
  display: none;
  flex-direction: column;
  width: 150px;
  text-align: center;
  transition: opacity 0.3s ease;
  opacity: 0;
  pointer-events: none;
}

.dropdown-menu li {
  padding: 12px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.dropdown-menu li img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.dropdown-menu li span {
  font-size: 0.95rem;
  font-weight: 500;
}

.dropdown-menu li:hover {
  background-color: rgb(255 255 255 / 8%);
  transform: scale(1.05);
  border-radius: 10px;
}

.dropdown-menu li:hover img {
  transform: rotate(10deg) scale(1.1);
}

.dropdown-menu li button {
  background: none;
  border: none;
  color: inherit;
  font: 600 0.95rem 'Segoe UI', sans-serif;
  cursor: pointer;
  padding: 0;
}

.icon-size {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
</style>
