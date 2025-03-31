<template>
  <div id="app">
    <!-- Header oder Navigationsleiste -->
    <header>
      <nav>
        <ul>
          <li><router-link to="/">{{ $t('home') }}</router-link></li>
          <li><router-link to="/about">{{ $t('about') }}</router-link></li>
          <li><router-link to="/search">{{ $t('search') }}</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Router View für die dynamischen Komponenten -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Hier kannst du die grundlegenden Styles für deine App definieren */

/* Einfache Grundstruktur für Header */
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
</style>
