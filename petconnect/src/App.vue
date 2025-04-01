<template>
  <div id="app">
    <!-- Global Navbar -->
    <header>
      <nav>
        <ul>
          <li><router-link to="/">{{ $t('home') }}</router-link></li>
          <li><router-link to="/search">{{ $t('search') }}</router-link></li>
          <li><router-link to="/about">{{ $t('about') }}</router-link></li>
          <li>
            <button @click="toggleDropdown">{{ $t('language') }}</button>
            <ul v-if="showDropdown" class="dropdown-menu">
              <li id="dropdown" @click="changeLanguage('en')">English</li>
              <li id="dropdown" @click="changeLanguage('de')">Deutsch</li>
              <li id="dropdown" @click="changeLanguage('fr')">Français</li>
              <li id="dropdown" @click="changeLanguage('it')">Italiano</li>
            </ul>
          </li>
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
      showDropdown: false, 
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    changeLanguage(language) {
      this.$i18n.locale = language; 
      this.showDropdown = false;
    }
  }
};
</script>

<style scoped>
/* Global Navbar Styles */
header {
  background-color: #333;
  padding: 15px 20px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px; /* Increase spacing between links */
  justify-content: center; /* Center the navigation links */
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  padding: 5px 10px; /* Add padding for better clickability */
  border-radius: 5px; /* Rounded corners for hover effect */
  transition: background-color 0.3s, color 0.3s;
}

nav ul li a:hover {
  background-color: #f0a500; /* Highlight link on hover */
  color: #333;
}

.dropdown-menu {
  position: absolute;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  list-style: none;
  padding: 0;
  margin-top: 5px;
  z-index: 10;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #ddd;
}
#dropdown {
  color: black;
}
</style>
