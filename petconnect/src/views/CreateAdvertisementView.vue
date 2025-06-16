<template>
  <div class="form-container">
    <h1>{{ $t('createAdTitle') }}</h1>
    <form @submit.prevent="createAdvertisement">
      <input
        type="text"
        v-model="newAd.name"
        :placeholder="$t('form.name')"
        required
      />
      <input
        type="text"
        v-model="newAd.type"
        :placeholder="$t('form.type')"
        required
      />
      <input
        type="text"
        v-model="newAd.breed"
        :placeholder="$t('form.breed')"
        required
      />
      <input
        type="number"
        v-model="newAd.age"
        :placeholder="$t('form.age')"
        required
      />
      <select v-model="newAd.gender" required>
        <option value="Male">{{ $t('form.male') }}</option>
        <option value="Female">{{ $t('form.female') }}</option>
      </select>
      <input
        type="text"
        v-model="newAd.location"
        :placeholder="$t('form.location')"
        required
      />
      <div style="display: flex; align-items: center; margin-bottom: 18px;">
        <input
          type="checkbox"
          id="vaccinated"
          v-model="newAd.vaccinated"
          style="width:auto;margin-right:8px;"
        />
        <label for="vaccinated" style="margin-bottom:0;">{{ $t('form.vaccinated') }}</label>
      </div>
      <textarea
        v-model="newAd.description"
        :placeholder="$t('form.description')"
        rows="5"
        required
      ></textarea>
      <input
        type="text"
        v-model="newAd.image"
        :placeholder="$t('form.imageUrlPlaceholder')"
      />
      <button type="submit">{{ $t('createAdButton') }}</button>
    </form>
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
