<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-text">
        <h1>{{ $t('home') }}</h1>
        <p>{{ $t('homeDescription') }}</p>
        <div class="cta-buttons">
          <template v-if="!isAuthenticated">
            <button class="cta-button">{{ $t('ctaLookingForPet') }}</button>
            <button class="cta-button">{{ $t('ctaOfferingPet') }}</button>
            <button class="cta-button">{{ $t('ctaWantToHelp') }}</button>
          </template>
          <template v-else>
            <router-link to="/create-advertisement" class="cta-button">
              {{ $t('createAdvertisement') }}
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <!-- Advertisement Section -->
    <div class="advertisement-section">
      <h2>{{ $t('advertisements') }}</h2>
      <div class="advertisements">
        <p v-if="ads.length === 0">{{ $t('noPets') }}</p>
        <router-link
          v-for="ad in ads"
          :key="ad._id"
          :to="{ name: 'advertisement', params: { id: ad._id } }"
          class="advertisement-card-link"
        >
          <div class="advertisement-card">
            <img
              v-if="ad.image"
              :src="ad.image"
              :alt="ad.name"
              class="ad-image"
            />
            <div class="ad-content">
              <h3 class="ad-title">{{ ad.name }}</h3>
              <p class="ad-description">{{ $t('species') }}: {{ ad.type }}</p>
              <p class="ad-description">{{ $t('age') }}: {{ ad.age }} {{ $t('years') }}</p>
              <p class="ad-description">{{ $t('adopted') }}: {{ ad.adopted ? $t('yes') : $t('no') }}</p>
            </div>
          </div>                        
        </router-link>
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
      ads: [],
    };
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem('isAuthenticated') === 'true';
    },
  },
  async created() {
    try {
      const res = await api.get('/pets');
      this.ads = res.data;
    } catch (err) {
      console.error('Error fetching pets in frontend:', err);
      alert(this.$t('errorLoadingPets'));
    }
  },
};
</script>


