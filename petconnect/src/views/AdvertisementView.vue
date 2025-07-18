// AdvertisementView.vue
<template>
  <div class="advertisement-view">
    <div v-if="advertisement" class="advertisement-detail-card">
      <div class="advertisement-image-section">
        <img
          :src="advertisement.image || fallbackImage"
          :alt="advertisement.name"
          class="advertisement-image"
          @error="handleImageError"
        />
        <div class="adoption-banner">
          🐾 {{ $t('advertisement.banner') }}
        </div>
      </div>
      <div class="advertisement-details">
        <h1 class="advertisement-title">{{ advertisement.name }}</h1>
        <p class="tagline">
          {{ $t('advertisement.tagline', {
            age: advertisement.age,
            breed: advertisement.breed
          }) }}
        </p>

        <div class="info-grid">
          <p><strong>📋 {{ $t('advertisement.type') }}:</strong> {{ advertisement.type }}</p>
          <p><strong>🐕 {{ $t('advertisement.breed') }}:</strong> {{ advertisement.breed }}</p>
          <p><strong>🎂 {{ $t('advertisement.age') }}:</strong> {{ advertisement.age }} {{ $t('advertisement.years') }}</p>
          <p><strong>⚧️ {{ $t('advertisement.gender') }}:</strong> {{ advertisement.gender }}</p>
          <p><strong>📍 {{ $t('advertisement.location') }}:</strong> {{ advertisement.location }}</p>
          <p><strong>💉 {{ $t('advertisement.vaccinated') }}:</strong>
            {{ advertisement.vaccinated ? $t('yes') : $t('no') }}
          </p>
          <p><strong>🏠 {{ $t('advertisement.adopted') }}:</strong>
            {{ advertisement.adopted ? $t('yes') : $t('no') }}
          </p>
        </div>

        <p class="description">📝 {{ advertisement.description }}</p>

        <div class="button-row">
          <button class="save-button" @click="saveToFavorites">
            {{ $t('saveToFavorites') }}
          </button>
          <router-link
            :key="advertisement._id"
            :to="{ name: 'adopt', params: { id: advertisement._id } }"
            class="advertisement-card-link"
          >
            <button class="adopt-button" :disabled="advertisement.adopted">
              {{ advertisement.adopted ? $t('alreadyAdopted') : $t('adoptMeNow') }}
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <p>⏳ {{ $t('advertisement.loading') }}</p>
    </div>
  </div>
</template>

<script>
import api from '../api';
import fallbackImage from '../assets/pets_placeholder.png';

export default {
  name: 'AdvertisementView',
  data() {
    return {
      advertisement: null,
      fallbackImage,
    };
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.fetchAdvertisement();
      }
    }
  },
  methods: {
    async fetchAdvertisement() {
      const id = this.$route.params.id;
      try {
        const res = await api.get(`/pets/${id}`);
        this.advertisement = {
          ...res.data,
          image: res.data.image?.trim() || null
        };
      } catch (err) {
        alert(err.response?.data?.message || this.$t('advertisement.load_error'));
      }
    },
    handleImageError(event) {
      event.target.src = this.fallbackImage;
    },
    saveToFavorites() {
      const savedPets = JSON.parse(localStorage.getItem('savedPets')) || [];

      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }

      if (!savedPets.some(pet => pet._id === this.advertisement._id)) {
        savedPets.push(this.advertisement);
        localStorage.setItem('savedPets', JSON.stringify(savedPets));
        alert(this.$t('petSaved'));
      } else {
        alert(this.$t('petAlreadySaved'));
      }
    }
  }
};
</script>

