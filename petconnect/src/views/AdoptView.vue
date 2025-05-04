<template>
    <h1 class="advertisement-title">{{ advertisement.name }}</h1>
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