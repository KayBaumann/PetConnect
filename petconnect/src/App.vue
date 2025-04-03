<template>
  <div id="app">
    <!-- Global Navbar -->
    <header :class="{ hidden: isNavbarHidden }">
      <nav>
        <ul>
          <li><router-link to="/">{{ $t('home') }}</router-link></li>
          <li><router-link to="/search">{{ $t('search') }}</router-link></li>
          <li><router-link to="/about">{{ $t('about') }}</router-link></li>
          <li><router-link to="/donate">{{ $t('donate') }}</router-link></li>
          <li class="dropdown" @mouseenter="showDropdown" @mouseleave="hideDropdown">
            <div class="dropdown-trigger">
              <button>
                <img :src="currentLanguageIcon" :alt="currentLanguageAlt" />
              </button>
              <ul class="dropdown-menu" v-show="isDropdownVisible">
                <li @click="changeLanguage('en')">
                  <img :src="languageIcons.en.src" alt="English" />
                </li>
                <li @click="changeLanguage('de')">
                  <img :src="languageIcons.de.src" alt="Deutsch" />
                </li>
                <li @click="changeLanguage('fr')">
                  <img :src="languageIcons.fr.src" alt="Français" />
                </li>
                <li @click="changeLanguage('it')">
                  <img :src="languageIcons.it.src" alt="Italiano" />
                </li>
              </ul>
            </div>
          </li>
          <li><router-link to="/login">{{ $t('Login') }}</router-link></li> 
        </ul>
      </nav>
    </header>

    <!-- Router View for Dynamic Components -->
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
      currentLocale: 'en', // Initialize with a default language
      isNavbarHidden: false,
      lastScrollPosition: 0,
      isDropdownVisible: false // Track dropdown visibility
    };
  },
  computed: {
    currentLanguageIcon() {
      return this.languageIcons[this.currentLocale]?.src || '/src/assets/united-kingdom.png';
    },
    currentLanguageAlt() {
      return this.languageIcons[this.currentLocale]?.alt || 'English';
    }
  },
  methods: {
    changeLanguage(language) {
      this.currentLocale = language; // Update the reactive property
      this.$i18n.locale = language; // Update the i18n locale
      this.isDropdownVisible = false; // Close dropdown after selection
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
    }
  },
  mounted() {
    this.currentLocale = this.$i18n.locale; // Sync currentLocale with the initial i18n locale
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
/* Modern Navbar Styles */
header {
  background-color: #1f2937; /* Dark gray background */
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
  color: #ffffff; /* White text */
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
}

nav ul li a:hover {
  background-color: #374151; /* Slightly lighter gray */
  transform: scale(1.05); /* Subtle zoom effect */
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #374151; /* Slightly lighter gray */
  transform: scale(1.1); /* Subtle zoom effect */
}

button img {
  width: 32px; /* Larger icon size */
  height: 32px;
  border-radius: 50%; /* Circular icons */
}

/* Dropdown Trigger Area */
.dropdown-trigger {
  position: relative;
  display: inline-block;
  padding-bottom: 10px; /* Increase hover area */
}

/* Modern Dropdown Menu */
.dropdown-menu {
  display: block;
  position: absolute;
  top: 100%; /* Adjusted to align with the trigger */
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f2937; /* Dark gray background */
  border-radius: 8px;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.dropdown:hover .dropdown-menu,
.dropdown-menu:hover {
  opacity: 1;
  visibility: visible;
}

.dropdown-menu li {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.dropdown-menu li img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.dropdown-menu li:hover {
  background-color: #374151; /* Slightly lighter gray */
  transform: scale(1.05); /* Subtle zoom effect */
}
</style>
