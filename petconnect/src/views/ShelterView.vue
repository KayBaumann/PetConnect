<template>
  <div class="advertisement-view">
    <div v-if="shelters.length" class="advertisement-list">
      <div v-for="shelter in shelters" :key="shelter._id" class="advertisement-card">
        <div class="advertisement-image-section">
          <img :src="shelter.image" :alt="shelter.name" class="advertisement-image" />
          <div class="adoption-banner">
            🏠 Animal Shelter
          </div>
        </div>
        <div class="advertisement-details">
          <h1 class="advertisement-title">{{ shelter.name }}</h1>
          <p class="tagline">Managed by {{ shelter.owner }}</p>
          <div class="info-grid">
            <p><strong>📍 Address:</strong> {{ shelter.address }}</p>
            <p><strong>📧 Email:</strong> {{ shelter.email }}</p>
            <p><strong>🐾 Number of Animals:</strong> {{ shelter.animalCount }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <p>⏳ Loading shelters...</p>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'ShelterView',
  data() {
    return {
      shelters: [],
    };
  },
  async created() {
    try {
      const res = await api.get('/shelters');
      this.shelters = res.data;
    } catch (err) {
      console.error('Error fetching shelters:', err);
      alert('Failed to load shelters. Please try again later.');
    }
  }
};
</script>

<style scoped>
.advertisement-view {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-color, linear-gradient(135deg, #1a202c 0%, #2d3748 100%));
  padding: 50px 20px;
  min-height: 100vh;
  color: var(--text-color, #f7fafc);
  flex-direction: column;
}

.advertisement-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 1100px;
}

.advertisement-card {
  display: flex;
  flex-direction: row;
  background: var(--card-background, rgba(45, 55, 72, 0.95));
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 100%;
  color: var(--card-text-color, #edf2f7);
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
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: bold;
  color: #f7fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.advertisement-details {
  flex: 1.8;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.advertisement-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--title-color, #63b3ed);
  margin-bottom: 10px;
}

.tagline {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 30px;
  color: var(--tagline-color, #a0aec0);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 30px;
  font-size: 1.1rem;
  color: var(--info-text-color, #e2e8f0);
}

.loading {
  font-size: 1.8rem;
  color: #a0aec0;
  text-align: center;
}
</style>
