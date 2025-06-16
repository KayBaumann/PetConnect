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

