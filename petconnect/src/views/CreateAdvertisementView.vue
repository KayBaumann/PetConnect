<template>
  <div class="create-advertisement-container">
    <div class="create-advertisement">
      <form @submit.prevent="createAdvertisement">
        <h2>{{ $t('createAdTitle') }}</h2>

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

        <div class="form-group" style="flex-direction: row; align-items: center;">
          <input type="checkbox" id="vaccinated" v-model="newAd.vaccinated" style="width:auto;margin-right:8px;" />
          <label for="vaccinated" style="margin-bottom:0;">{{ $t('form.vaccinated') }}</label>
        </div>

        <div class="form-group">
          <label for="description">{{ $t('form.description') }}</label>
          <textarea id="description" v-model="newAd.description" rows="5" required></textarea>
        </div>

        <div class="form-group">
          <label for="image">{{ $t('form.imageUrlPlaceholder') }}</label>
          <input type="text" id="image" v-model="newAd.image" />
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

<style scoped>
.create-advertisement-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.create-advertisement {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="number"],
select,
textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input[type="checkbox"] {
  width: auto;
  margin-right: 0.5rem;
}

.cta-button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #0056b3;
}
</style>
