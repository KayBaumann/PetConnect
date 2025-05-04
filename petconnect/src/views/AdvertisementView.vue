<template>
  <div class="advertisement-view">
    <div v-if="advertisement" class="advertisement-card">
      <div class="advertisement-image-section">
        <img :src="advertisement.image" :alt="advertisement.name" class="advertisement-image" />
        <div class="adoption-banner">
          🐾 Looking for a Loving Home!
        </div>
      </div>
      <div class="advertisement-details">
        <h1 class="advertisement-title">{{ advertisement.name }}</h1>
        <p class="tagline">A sweet {{ advertisement.age }}-year-old {{ advertisement.breed }} ready to steal your heart 💖</p>
        <div class="info-grid">
          <p><strong>📋 Type:</strong> {{ advertisement.type }}</p>
          <p><strong>🐕 Breed:</strong> {{ advertisement.breed }}</p>
          <p><strong>🎂 Age:</strong> {{ advertisement.age }} years</p>
          <p><strong>⚧️ Gender:</strong> {{ advertisement.gender }}</p>
          <p><strong>📍 Location:</strong> {{ advertisement.location }}</p>
          <p><strong>💉 Vaccinated:</strong> {{ advertisement.vaccinated ? 'Yes ✅' : 'No ❌' }}</p>
          <p><strong>🏠 Adopted:</strong> {{ advertisement.adopted ? 'Yes 🏡' : 'No 🙏' }}</p>
        </div>
        <p class="description">📝 {{ advertisement.description }}</p>
        <router-link
          :key="advertisement._id"
          :to="{ name: 'adopt', params: { id: advertisement._id } }"
          class="advertisement-card-link"
        >
        <button class="adopt-button" :disabled="advertisement.adopted">
          {{ advertisement.adopted ? "Already Adopted ❤️" : "Adopt Me Now 🐶" }}
        </button>
        </router-link>
      </div>
    </div>
    <div v-else class="loading">
      <p>⏳ Loading advertisement...</p>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'AdvertisementView',
  data() {
    return {
      advertisement: null, // Store the advertisement details
    };
  },
  async created() {
    const id = this.$route.params.id; // Get the ID from the route parameters
    try {
      console.log(`Fetching advertisement with ID: ${id}`);
      const res = await api.get(`/pets/${id}`); // Fetch advertisement by ID
      if (!res.data) {
        console.error('No data returned from backend');
        alert('Advertisement not found.');
        return;
      }
      this.advertisement = res.data; // Assign the fetched data
      console.log('Advertisement loaded:', this.advertisement);
    } catch (err) {
      console.error('Error fetching advertisement:', err.response || err);
      alert(err.response?.data?.message || 'Failed to load advertisement. Please try again later.');
    }
  },
};
</script>

<style scoped>
.advertisement-view {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-color, linear-gradient(135deg, #1a202c 0%, #2d3748 100%)); /* Dark mode background */
  padding: 50px 20px;
  min-height: 100vh;
  color: var(--text-color, #f7fafc); /* Default text color for dark mode */
}

.advertisement-card {
  display: flex;
  flex-direction: row;
  background: var(--card-background, rgba(45, 55, 72, 0.95)); /* Darker card background */
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-width: 1100px;
  width: 100%;
  animation: fadeIn 1s ease-in-out;
  color: var(--card-text-color, #edf2f7); /* Text color for card */
}

.advertisement-image-section {
  position: relative;
  flex: 1.2;
  background: #f0f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.advertisement-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.adoption-banner {
  position: absolute;
  bottom: 20px;
  background: var(--banner-background, rgba(255, 255, 255, 0.2)); /* Adjusted for dark mode */
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: bold;
  color: var(--banner-text-color, #f7fafc); /* Text color for banner */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.advertisement-details {
  flex: 1.8;
  padding: 40px 30px;
  color: #1a202c;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.advertisement-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--title-color, #63b3ed); /* Adjusted title color for dark mode */
  margin-bottom: 10px;
}

.tagline {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 30px;
  color: var(--tagline-color, #a0aec0); /* Adjusted tagline color */
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 30px;
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: var(--info-text-color, #e2e8f0); /* Adjusted info text color */
}

.description {
  font-size: 1.1rem;
  color: var(--description-color, #e2e8f0); /* Adjusted description text color */
  margin-bottom: 30px;
  line-height: 1.6;
}

.adopt-button {
  background: var(--button-background, linear-gradient(to right, #2c7a7b, #2b6cb0)); /* Darker button gradient */
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 15px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.adopt-button:hover {
  background: var(--button-hover-background, linear-gradient(to right, #285e61, #2c5282)); /* Adjusted hover gradient */
}

.adopt-button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.loading {
  font-size: 1.8rem;
  color: var(--loading-text-color, #a0aec0); /* Adjusted loading text color */
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
