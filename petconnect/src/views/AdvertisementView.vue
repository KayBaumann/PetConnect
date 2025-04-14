<template>
  <div class="advertisement-view">
    <div v-if="advertisement" class="advertisement-container">
      <div class="advertisement-details">
        <h1 class="advertisement-title">{{ advertisement.name }}</h1>
        <p class="advertisement-description">Species: {{ advertisement.species }}</p>
        <p class="advertisement-description">Age: {{ advertisement.age }} years</p>
        <p class="advertisement-description">Adopted: {{ advertisement.adopted ? 'Yes' : 'No' }}</p>
      </div>
      <div class="advertisement-image-container">
        <img :src="advertisement.image" :alt="advertisement.name" class="advertisement-image" />
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading advertisement...</p>
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

<style scoped>
.advertisement-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.advertisement-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1000px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.advertisement-details {
  flex: 2;
  padding: 20px;
  text-align: center;
}

.advertisement-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1f2937;
}

.advertisement-description {
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
}

.advertisement-image-container {
  flex: 1;
  max-width: 400px;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.advertisement-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #6b7280;
}
</style>
