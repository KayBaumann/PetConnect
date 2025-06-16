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
        fk_userId: '' // ✅ consistent with backend expectation
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
  background-color: #e5e7eb;
  padding: 20px;
}

.create-advertisement {
  width: 100%;
  max-width: 450px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.create-advertisement h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #111827;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1f2937;
}

input,
textarea,
select {
  width: 100%;
  padding: 7.5px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #f9fafb;
  color: #111827;
}

input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #1d4ed8;
  transform: scale(1.02);
}

button:focus {
  outline: 2px solid #1d4ed8;
}

@media (max-width: 600px) {
  .create-advertisement {
    max-width: 90%;
    padding: 15px;
  }

  .create-advertisement h2 {
    font-size: 1.5rem;
  }

  button {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>
