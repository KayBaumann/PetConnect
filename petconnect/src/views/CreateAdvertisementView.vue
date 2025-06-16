<template>
  <div :class="['create-advertisement-container', { 'dark-mode': isDarkMode }]">
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
      isDarkMode: localStorage.getItem('isDarkMode') === 'true'
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
  background: linear-gradient(135deg, #f3f4f6 0%, #e0e7ef 100%);
  padding: 20px;
  transition: background-color 0.3s, color 0.3s;
}

.create-advertisement {
  width: 100%;
  max-width: 450px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  padding: 28px 20px;
  color: #1f2937;
  transition: background 0.3s, color 0.3s;
}

.create-advertisement h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #2563eb;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: 0.01em;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1.5px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #f9fafb;
  color: #111827;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
  background-color: #fff;
}

textarea {
  resize: vertical;
}

button,
.cta-button {
  width: 100%;
  padding: 13px;
  background: linear-gradient(90deg, #2563eb 0%, #34d399 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
}

button:hover,
.cta-button:hover {
  background: linear-gradient(90deg, #34d399 0%, #2563eb 100%);
  transform: scale(1.03);
}

button:focus,
.cta-button:focus {
  outline: 2px solid #2563eb;
}

/* Dark mode styles */
.create-advertisement-container.dark-mode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #f7fafc;
}

.create-advertisement-container.dark-mode .create-advertisement {
  background: rgba(45, 55, 72, 0.97);
  color: #f7fafc;
  box-shadow: 0 8px 32px rgba(99,179,237,0.13), 0 1.5px 4px rgba(0,0,0,0.10);
}

.create-advertisement-container.dark-mode .create-advertisement h2 {
  color: #63b3ed;
}

.create-advertisement-container.dark-mode label {
  color: #f7fafc;
}

.create-advertisement-container.dark-mode input,
.create-advertisement-container.dark-mode textarea,
.create-advertisement-container.dark-mode select {
  background-color: #232946;
  color: #f7fafc;
  border: 1.5px solid #4a5568;
}

.create-advertisement-container.dark-mode input:focus,
.create-advertisement-container.dark-mode textarea:focus,
.create-advertisement-container.dark-mode select:focus {
  outline: 2px solid #63b3ed;
  border-color: #63b3ed;
  background-color: #1a202c;
}

.create-advertisement-container.dark-mode button,
.create-advertisement-container.dark-mode .cta-button {
  background: linear-gradient(90deg, #63b3ed 0%, #34d399 100%);
  color: #232946;
}

.create-advertisement-container.dark-mode button:hover,
.create-advertisement-container.dark-mode .cta-button:hover {
  background: linear-gradient(90deg, #34d399 0%, #63b3ed 100%);
}

@media (max-width: 600px) {
  .create-advertisement {
    max-width: 95%;
    padding: 15px;
  }

  .create-advertisement h2 {
    font-size: 1.4rem;
  }

  button,
  .cta-button {
    padding: 10px;
    font-size: 1rem;
  }
}
</style>
