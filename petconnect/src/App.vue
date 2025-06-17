<template>
  <div id="app">
    <header :class="{ hidden: isNavbarHidden }">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">PetConnect</router-link>

          <!-- Bootstrap Burger -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><router-link class="nav-link" to="/">{{ $t('home') }}</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/search">{{ $t('search') }}</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/shelters">{{ $t('shelters') }}</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/about">{{ $t('about') }}</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/donate">{{ $t('donate') }}</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/contact">{{ $t('contact') }}</router-link></li>

              <!-- Auth/Dropdowns -->
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

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  <img :src="currentLanguageIcon" :alt="currentLanguageAlt" class="icon-size" />
                </a>
                <ul class="dropdown-menu">
                  <li v-for="(icon, lang) in languageIcons" :key="lang">
                    <a class="dropdown-item" href="#" @click.prevent="changeLanguage(lang)">
                      <img :src="icon.src" :alt="icon.alt" width="20" class="me-2" />
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
      </nav>
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
      lastScrollPosition: 0
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
