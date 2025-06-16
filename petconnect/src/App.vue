<template>
  <div id="app">
    <header :class="{ hidden: isNavbarHidden }">
      <nav>
        <ul>
          <li><router-link to="/">{{ $t('home') }}</router-link></li>
          <li><router-link to="/search">{{ $t('search') }}</router-link></li>
          <li><router-link to="/shelters">{{ $t('shelters') }}</router-link></li>
          <li><router-link to="/about">{{ $t('about') }}</router-link></li>
          <li><router-link to="/donate">{{ $t('donate') }}</router-link></li>
          <li><router-link to="/contact">{{ $t('contact') }}</router-link></li>

          <li
            v-if="isAuthenticated"
            class="dropdown"
            @mouseenter="showProfileDropdown"
            @mouseleave="hideProfileDropdown"
          >
            <div class="dropdown-trigger">
              <button>
                <img src="/src/assets/profile-icon-white.png" alt="Profile" class="icon-size" />
              </button>
              <ul class="dropdown-menu" v-if="isProfileDropdownVisible">
                <li><router-link to="/profile">{{ $t('profile') }}</router-link></li>
                <li><router-link to="/create-advertisement">{{ $t('createAdvertisement') }}</router-link></li>
                <li><button @click="logout">{{ $t('Logout') }}</button></li>
              </ul>
            </div>
          </li>

          <li
            class="dropdown"
            @mouseenter="showDropdown"
            @mouseleave="hideDropdown"
          >
            <div class="dropdown-trigger">
              <button>
                <img :src="currentLanguageIcon" :alt="currentLanguageAlt" class="icon-size" />
              </button>
              <ul class="dropdown-menu" v-if="isDropdownVisible">
                <li
                  v-for="(icon, lang) in languageIcons"
                  :key="lang"
                  @click="changeLanguage(lang)"
                >
                  <img :src="icon.src" :alt="icon.alt" />
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
      isDropdownVisible: false,
      isProfileDropdownVisible: false
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
      this.isDropdownVisible = false;
    },
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      this.isNavbarHidden = currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 100;
      this.lastScrollPosition = currentScrollPosition;
    },
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    showProfileDropdown() {
      this.isProfileDropdownVisible = true;
    },
    hideProfileDropdown() {
      this.isProfileDropdownVisible = false;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  color: #ffffff;
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
  padding-bottom: 10px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f2937;
  border-radius: 8px;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 100;
  color: white;
  display: flex;
  flex-direction: column;
  width: 200px;
  text-align: center;
}

.dropdown-menu li {
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  white-space: nowrap;
}

.dropdown-menu li img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.dropdown-menu li:hover {
  background-color: #374151;
  transform: scale(1.05);
}

.dropdown-menu li button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.profile-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.icon-size {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
</style>