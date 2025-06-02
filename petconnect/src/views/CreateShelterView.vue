<template>
  <div class="form-container">
    <h1>Create New Shelter</h1>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.address" placeholder="Address" required />
      <input v-model="form.owner" placeholder="Owner" required />
      <input type="number" v-model="form.animalCount" placeholder="Number of Animals" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.image" placeholder="Image URL (optional)" />
      <button type="submit">Submit</button>
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
        alert('Shelter created successfully!');
        this.$router.push('/shelters');
      } catch (err) {
        alert('Failed to create shelter.');
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
  background: #2d3748;
  padding: 30px;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 6px;
  border: none;
  width: 100%;
}

button {
  padding: 10px;
  background-color: #34d399;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #059669;
}
</style>