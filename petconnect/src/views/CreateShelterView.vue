<template>
  <div :class="['form-container', { 'dark-mode': isDarkMode }]">
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
      },
      isDarkMode: localStorage.getItem('isDarkMode') === 'true'
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

<style scoped>
.form-container {
  max-width: 500px;
  margin: 50px auto;
  background: #f3f4f6;
  padding: 36px 32px 32px 32px;
  border-radius: 14px;
  color: #1a202c;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(37,99,235,0.10), 0 1.5px 4px rgba(0,0,0,0.06);
  transition: background 0.3s, color 0.3s;
}

h1 {
  text-align: center;
  margin-bottom: 28px;
  color: #2563eb;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}

input {
  margin-bottom: 18px;
  padding: 11px;
  border-radius: 7px;
  border: 1.5px solid #cbd5e1;
  width: 100%;
  background: #f9fafb;
  color: #1a202c;
  font-size: 1rem;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

input:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
  background: #fff;
}

button {
  padding: 13px;
  background: linear-gradient(90deg, #2563eb 0%, #34d399 100%);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 10px;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
}

button:hover {
  background: linear-gradient(90deg, #34d399 0%, #2563eb 100%);
  transform: scale(1.03);
}

/* Dark mode styles */
.form-container.dark-mode {
  background: rgba(45, 55, 72, 0.97);
  color: #f7fafc;
  box-shadow: 0 8px 32px rgba(99,179,237,0.13), 0 1.5px 4px rgba(0,0,0,0.10);
}

.form-container.dark-mode h1 {
  color: #63b3ed;
}

.form-container.dark-mode input {
  background: #232946;
  color: #f7fafc;
  border: 1.5px solid #4a5568;
}

.form-container.dark-mode input:focus {
  outline: 2px solid #63b3ed;
  border-color: #63b3ed;
  background: #1a202c;
}

.form-container.dark-mode button {
  background: linear-gradient(90deg, #63b3ed 0%, #34d399 100%);
  color: #232946;
}

.form-container.dark-mode button:hover {
  background: linear-gradient(90deg, #34d399 0%, #63b3ed 100%);
}

/* Responsive Design */
@media (max-width: 600px) {
  .form-container {
    padding: 18px 6px 18px 6px;
    max-width: 98vw;
  }
  h1 {
    font-size: 1.3rem;
  }
  button {
    font-size: 1rem;
    padding: 10px;
  }
}
</style>