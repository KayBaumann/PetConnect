<template>
  <div class="home-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-text">
        <h1>{{ $t('home') }}</h1>
        <p>{{ $t('homeDescription') }}</p>
        <div class="cta-buttons">
          <template v-if="!isAuthenticated">
            <router-link to="/search">
              <button class="cta-button">{{ $t('ctaLookingForPet') }}</button>
            </router-link>
            <router-link to="/login">
              <button class="cta-button">{{ $t('ctaOfferingPet') }}</button>
            </router-link>
            <router-link to="/donate">
              <button class="cta-button">{{ $t('ctaWantToHelp') }}</button>
            </router-link>
            
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
              :src="ad.image || fallbackImage"
              :alt="ad.name"
              class="pet-image"
              @error="handleImageError"
            />
            <div class="ad-content">
              <h3 class="ad-title">{{ ad.name }}</h3>
              <p class="ad-description">{{ $t('advertisement.type') }}: {{ ad.type }}</p>
              <p class="ad-description">{{ $t('advertisement.age') }}: {{ ad.age }} {{ $t('advertisement.years') }}</p>
              <p class="ad-description">{{ $t('advertisement.adopted') }}: {{ ad.adopted ? $t('yes') : $t('no') }}</p>
            </div>
          </div>                        
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';
import fallbackImage from '../assets/pets_placeholder.png';

export default {
  name: 'HomeView',
  data() {
    return {
      ads: [],
      fallbackImage
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
      this.ads = res.data.map(ad => ({
        ...ad,
        image: ad.image?.trim() || null
      }));
    } catch (err) {
      console.error('Error fetching pets in frontend:', err);
      alert(this.$t('errorLoadingPets'));
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = this.fallbackImage;
    }
  }
};
</script>