<template>
  <div id="app">

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

header {
  background-color: #333;
  padding: 10px;
  color: white;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a:hover {
  text-decoration: underline;
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
