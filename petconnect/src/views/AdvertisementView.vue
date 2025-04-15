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
        <button class="adopt-button" :disabled="advertisement.adopted">
          {{ advertisement.adopted ? "Already Adopted ❤️" : "Adopt Me Now 🐶" }}
        </button>
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
        console.error('No data returned from backend'); // Log if no data is returned
        alert('Advertisement not found.');
        return;
      }
      this.advertisement = res.data; // Assign the fetched data
      console.log('Advertisement loaded:', this.advertisement);
    } catch (err) {
      console.error('Error fetching advertisement:', err.response || err); // Log the error
      alert(err.response?.data?.message || 'Failed to load advertisement. Please try again later.');
    }
  },
};
</script>

<style scoped>.advertisement-view {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  padding: 50px 20px;
  min-height: 100vh;
}

.advertisement-card {
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-width: 1100px;
  width: 100%;
  animation: fadeIn 1s ease-in-out;
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
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: bold;
  color: #2d3748;
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
  color: #2b6cb0;
  margin-bottom: 10px;
}

.tagline {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 30px;
  color: #4a5568;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 30px;
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.description {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 30px;
  line-height: 1.6;
}

.adopt-button {
  background: linear-gradient(to right, #38b2ac, #4299e1);
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
  background: linear-gradient(to right, #319795, #3182ce);
}

.adopt-button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.loading {
  font-size: 1.8rem;
  color: #718096;
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
