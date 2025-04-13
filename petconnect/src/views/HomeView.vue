<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-text">
        <h1>{{ $t('home') }}</h1>
        <p>{{ $t('homeDescription') }}</p>
        <div class="cta-buttons">
          <button class="cta-button">{{ $t('ctaLookingForPet') }}</button>
          <button class="cta-button">{{ $t('ctaOfferingPet') }}</button>
          <button class="cta-button">{{ $t('ctaWantToHelp') }}</button>
        </div>
      </div>
    </div>

    <!-- Advertisement Section -->
    <div class="advertisement-section">
      <h2>{{ $t('advertisements') }}</h2>
      <div class="advertisements">
        <!-- Add a fallback message if ads array is empty -->
        <p v-if="ads.length === 0">No pets available to display.</p>
        <div
          class="advertisement-card"
          v-for="ad in ads"
          :key="ad._id"
        >
          <img
            v-if="ad.image"
            :src="ad.image"
            :alt="ad.name"
            class="ad-image"
          />
          <h3 class="ad-title">{{ ad.name }}</h3>
          <p class="ad-description">Species: {{ ad.species }}</p>
          <p class="ad-description">Age: {{ ad.age }} years</p>
          <p class="ad-description">Adopted: {{ ad.adopted ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'HomeView',
  data() {
    return {
      ads: [], // Store fetched pets here
    };
  },
  async created() {
    console.log('Fetching pets from backend...'); // Log before making the API call
    try {
      const res = await api.get('/pets'); // Fetch pets from the backend
      this.ads = res.data.map((ad) => ({
        name: ad.name,
        species: ad.species,
        age: ad.age,
        adopted: ad.adopted,
        image: ad.image || '/src/assets/default-pet.jpg', // Use default image if none provided
      })); // Transform the data to exclude unnecessary fields like _id
      console.log('Pets loaded in frontend:', this.ads); // Log the loaded pets
    } catch (err) {
      console.error('Error fetching pets in frontend:', err); // Log any errors
      alert('Failed to load pets. Please try again later.'); // Show an error message
    }
  },
};
</script>

<style scoped>
/* General Layout */
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Hero Section */
.hero-section {
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url('../assets/flynn_background.jpg');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.hero-text {
  text-align: center;
  color: white;
  padding: 20px 40px;
  border-radius: 8px;
  max-width: 600px;
}

.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.hero-text p {
  font-size: 1.5rem;
  margin-bottom: 25px;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.cta-button {
  background-color: #2563eb; /* Modern blue */
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  text-align: center;
}

.cta-button:hover {
  background-color: #1d4ed8; /* Darker blue */
  transform: scale(1.05);
}

/* Advertisement Section */
.advertisement-section {
  padding: 40px 20px;
  text-align: center;
  background: #f3f4f6; /* Light gray */
  width: 100%;
}

.advertisement-section h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.advertisements {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.advertisement-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 300px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.advertisement-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.ad-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.ad-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.ad-description {
  font-size: 1rem;
  color: #6b7280; /* Gray text */
}
</style>
