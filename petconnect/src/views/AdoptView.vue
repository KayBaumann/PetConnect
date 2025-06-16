<template>
  <h1 class="advertisement-title">{{ advertisement?.name }}</h1>
</template>

<script>
import api from '../api';

export default {
  name: 'AdvertisementView',
  data() {
    return {
      advertisement: null
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/pets/${id}`);
      if (!res.data) {
        console.error('No data returned from backend');
        alert(this.$t('advertisement.not_found'));
        return;
      }
      this.advertisement = res.data;
    } catch (err) {
      console.error('Error fetching advertisement:', err.response || err);
      alert(err.response?.data?.message || this.$t('advertisement.load_error'));
    }
  }
};
</script>