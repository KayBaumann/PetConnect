<template>
  <div id="app">
    <header :class="[{ hidden: isNavbarHidden }, 'navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark', 'sticky-top']">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">PetConnect</router-link>

        <!-- Burger Toggle -->
        <button class="navbar-toggler" type="button" @click="isMenuOpen = !isMenuOpen">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><router-link class="nav-link" to="/">{{ $t('home') }}</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/search">{{ $t('search') }}</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/shelters">{{ $t('shelters') }}</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/about">{{ $t('about') }}</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/donate">{{ $t('donate') }}</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/contact">{{ $t('contact') }}</router-link></li>

            <!-- Profile Dropdown -->
            <li v-if="isAuthenticated" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <img src="/src/assets/profile-icon-white.png" alt="Profile" class="icon-size" />
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/profile">{{ $t('profile') }}</router-link></li>
                <li><router-link class="dropdown-item" to="/create-advertisement">{{ $t('createAdvertisement') }}</router-link></li>
                <li><button class="dropdown-item" @click="logout">{{ $t('Logout') }}</button></li>
              </ul>
            </li>

            <!-- Language Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <img :src="currentLanguageIcon" :alt="currentLanguageAlt" class="icon-size" />
              </a>
              <ul class="dropdown-menu">
                <li v-for="(icon, lang) in languageIcons" :key="lang">
                  <a class="dropdown-item" @click.prevent="changeLanguage(lang)">
                    <img :src="icon.src" :alt="icon.alt" class="me-2" style="width: 20px;"/>
                    {{ icon.alt }}
                  </a>
                </li>
              </ul>
            </li>

            <li v-if="!isAuthenticated" class="nav-item">
              <router-link class="nav-link" to="/login">{{ $t('Login') }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      languageIcons: {
        en: { src: '/src/assets/united-kingdom.png', alt: 'English' },
        de: { src: '/src/assets/german.png', alt: 'Deutsch' },
        fr: { src: '/src/assets/france.png', alt: 'Français' },
        it: { src: '/src/assets/italy.png', alt: 'Italiano' }
      },
      currentLocale: localStorage.getItem('lang') || 'de',
      isNavbarHidden: false,
      lastScrollPosition: 0,
      isMenuOpen: false
    };
  },
  computed: {
    currentLanguageIcon() {
      return this.languageIcons[this.currentLocale]?.src || '/src/assets/united-kingdom.png';
    },
    currentLanguageAlt() {
      return this.languageIcons[this.currentLocale]?.alt || 'English';
    },
    isAuthenticated() {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
  },
  methods: {
    changeLanguage(language) {
      this.currentLocale = language;
      this.$i18n.locale = language;
      localStorage.setItem('lang', language);
    },
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      this.isNavbarHidden = currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 100;
      this.lastScrollPosition = currentScrollPosition;
    },
    logout() {
      localStorage.setItem('isAuthenticated', 'false');
      this.$router.push('/');
      window.location.reload();
    }
  },
  mounted() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.currentLocale = savedLang;
      this.$i18n.locale.value = savedLang;
    }
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.icon-size {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
</style>
