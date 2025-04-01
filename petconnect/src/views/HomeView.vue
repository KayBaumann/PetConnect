<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <!-- Cover Picture -->
    <div class="cover-picture">
      <div class="cover-text">
        <h1>{{ $t('home') }}</h1>
        <p>Connecting you with your furry friends.</p>
        <button class="cta-button">Get Started</button>
      </div>
    </div>

    <!-- Advertisement Section -->
    <div class="advertisement-section">
      <h2>Advertisements</h2>
      <p>Advertisements will be displayed here.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
/* General Layout */
.home-view {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Cover Picture */
.cover-picture {
  background-image: url('../assets/flynn_background.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.cover-text {
  text-align: center;
  color: white;
  z-index: 5;
  background: rgba(0, 0, 0, 0.6); /* Darker background for better contrast */
  padding: 30px 50px;
  border-radius: 10px;
  max-width: 80%; /* Ensure text block fits within the viewport */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
}

.cover-text h1 {
  font-size: 3.5rem; /* Larger font for emphasis */
  margin-bottom: 15px;
}

.cover-text p {
  font-size: 1.5rem; /* Slightly larger font for better readability */
  margin-bottom: 25px;
}

.cta-button {
  background-color: #f0a500;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.cta-button:hover {
  background-color: #d18e00;
  transform: scale(1.05); /* Slight zoom effect on hover */
}

/* Advertisement Section */
.advertisement-section {
  padding: 50px 20px;
  text-align: center;
  background: #f9f9f9;
}

.advertisement-section h2 {
  font-size: 2.5rem; /* Larger heading for emphasis */
  margin-bottom: 15px;
}

.advertisement-section p {
  font-size: 1.2rem;
  color: #555;
}
</style>
