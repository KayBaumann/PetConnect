<template>
  <div id="app">
    <!-- Global Navbar -->
    <header>
      <nav>
        <ul>
          <li><router-link to="/">{{ $t('home') }}</router-link></li>
          <li><router-link to="/about">{{ $t('about') }}</router-link></li>
          <li><router-link to="/search">{{ $t('search') }}</router-link></li>
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
</style>
