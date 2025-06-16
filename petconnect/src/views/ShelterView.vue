<template>
  <div class="shelter-view">
    <router-link to="/create-shelter" class="create-button">
      ➕ {{ $t('shelter.addButton') }}
    </router-link>

    <div v-if="shelters.length" class="shelter-list">
      <div
        v-for="shelter in shelters"
        :key="shelter._id"
        class="shelter-card"
      >
        <div class="shelter-image-section">
          <div class="image-wrapper">
            <img
              :src="shelter.image || fallbackImage"
              :alt="shelter.name"
              class="shelter-image"
              @error="handleImageError"
            />
            <div v-if="!shelter.image" class="image-overlay">
              {{ $t('shelter.noImage') }}
            </div>
          </div>
          <div class="shelter-banner">
            🏠 {{ $t('shelter.banner') }}
          </div>
        </div>

        <div class="shelter-details">
          <h1 class="shelter-title">{{ shelter.name }}</h1>
          <p class="tagline">
            {{ $t('shelter.managedBy') }} {{ shelter.owner }}
          </p>
          <div class="info-grid">
            <p><strong>📍 {{ $t('shelter.address') }}:</strong> {{ shelter.address }}</p>
            <p><strong>📧 {{ $t('shelter.email') }}:</strong> {{ shelter.email }}</p>
            <p><strong>🐾 {{ $t('shelter.animalCount') }}:</strong> {{ shelter.animalCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <p>⏳ {{ $t('shelter.loading') }}</p>
    </div>
  </div>
</template>

<script>
import api from '../api';
import fallbackImage from '../assets/shelter_placeholder.png';

export default {
  name: 'ShelterView',
  data() {
    return {
      shelters: [],
      fallbackImage,
    };
  },
  async created() {
    try {
      const res = await api.get('/shelters');
      this.shelters = res.data.map(shelter => ({
        ...shelter,
        image: shelter.image?.trim() || null,
      }));
    } catch (err) {
      console.error('Error fetching shelters:', err);
      alert(this.$t('shelter.fetchError'));
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = this.fallbackImage;
    },
  },
};
</script>

<style scoped>
.shelter-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background-color, linear-gradient(135deg, #1a202c 0%, #2d3748 100%));
  padding: 50px 20px;
  min-height: 100vh;
  color: var(--text-color, #f7fafc);
}

.create-button {
  align-self: flex-end;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #34d399;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #059669;
}

.shelter-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 1100px;
}

.shelter-card {
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

.shelter-image-section {
  position: relative;
  flex: 1.2;
  background: #f0f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  font-style: italic;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  pointer-events: none;
}

.shelter-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shelter-banner {
  position: absolute;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: bold;
  color: #f7fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.shelter-details {
  flex: 1.8;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.shelter-title {
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
