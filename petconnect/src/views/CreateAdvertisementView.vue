<template>
  <div class="create-advertisement-container">
    <div class="create-advertisement">
      <h2>{{ $t('createAdTitle') }}</h2>
      <form @submit.prevent="createAdvertisement">
        <div class="form-group">
          <label for="name">{{ $t('form.name') }}</label>
          <input type="text" id="name" v-model="newAd.name" required />
        </div>
        <div class="form-group">
          <label for="type">{{ $t('form.type') }}</label>
          <input type="text" id="type" v-model="newAd.type" required />
        </div>
        <div class="form-group">
          <label for="breed">{{ $t('form.breed') }}</label>
          <input type="text" id="breed" v-model="newAd.breed" required />
        </div>
        <div class="form-group">
          <label for="age">{{ $t('form.age') }}</label>
          <input type="number" id="age" v-model="newAd.age" required />
        </div>
        <div class="form-group">
          <label for="gender">{{ $t('form.gender') }}</label>
          <select id="gender" v-model="newAd.gender" required>
            <option value="Male">{{ $t('form.male') }}</option>
            <option value="Female">{{ $t('form.female') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="location">{{ $t('form.location') }}</label>
          <input type="text" id="location" v-model="newAd.location" required />
        </div>
        <div class="form-group">
          <label for="vaccinated">{{ $t('form.vaccinated') }}</label>
          <input type="checkbox" id="vaccinated" v-model="newAd.vaccinated" />
        </div>
        <div class="form-group">
          <label for="description">{{ $t('form.description') }}</label>
          <textarea id="description" v-model="newAd.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">{{ $t('form.imageUrl') }}</label>
          <input type="text" id="image" v-model="newAd.image" :placeholder="$t('form.imagePlaceholder')" />
        </div>
        <button type="submit" class="cta-button">{{ $t('createAdButton') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'CreateAdvertisementView',
  data() {
    return {
      newAd: {
        name: '',
        type: '',
        breed: '',
        age: null,
        gender: 'Male',
        location: '',
        vaccinated: false,
        description: '',
        image: '',
        fk_userId: ''
      },
    };
  },
  methods: {
    async createAdvertisement() {
      if (!this.newAd.name || !this.newAd.type || !this.newAd.breed) {
        alert(this.$t('form.missingFields'));
        return;
      }

      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          alert(this.$t('form.notLoggedIn'));
          return;
        }

        this.newAd.fk_userId = userId;

        const res = await api.post('/pets', this.newAd);
        console.log('New advertisement created:', res.data);
        alert(this.$t('form.adSuccess'));
        this.$router.push('/');
      } catch (err) {
        console.error('Error creating advertisement:', err.response?.data || err);
        alert(err.response?.data?.message || this.$t('form.adFail'));
      }
    }
  },
};
</script>
