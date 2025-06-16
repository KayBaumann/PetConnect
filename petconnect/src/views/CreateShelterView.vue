<template>
  <div class="form-container">
    <h1>{{ $t('createShelterTitle') }}</h1>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" :placeholder="$t('form.name')" required />
      <input v-model="form.address" :placeholder="$t('form.address')" required />
      <input v-model="form.owner" :placeholder="$t('form.owner')" required />
      <input type="number" v-model="form.animalCount" :placeholder="$t('form.animalCount')" required />
      <input v-model="form.email" type="email" :placeholder="$t('form.email')" required />
      <input v-model="form.image" :placeholder="$t('form.imageUrlOptional')" />
      <button type="submit">{{ $t('form.submit') }}</button>
    </form>
  </div>
  

</template>

<script>
import api from '../api';

export default {
  name: 'CreateShelterView',
  data() {
    return {
      form: {
        name: '',
        address: '',
        owner: '',
        animalCount: null,
        email: '',
        image: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        await api.post('/shelters', this.form);
        alert(this.$t('form.shelterCreated'));
        this.$router.push('/shelters');
      } catch (err) {
        alert(this.$t('form.shelterFailed'));
        console.error(err);
      }
    }
  }
};
</script>
