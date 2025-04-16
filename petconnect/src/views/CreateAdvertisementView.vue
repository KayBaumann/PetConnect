<template>
  <div class="create-advertisement-container">
    <div class="create-advertisement">
      <h2>Create a New Advertisement</h2>
      <form @submit.prevent="createAdvertisement">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="newAd.name" required />
        </div>
        <div class="form-group">
          <label for="type">Type</label>
          <input type="text" id="type" v-model="newAd.type" required />
        </div>
        <div class="form-group">
          <label for="breed">Breed</label>
          <input type="text" id="breed" v-model="newAd.breed" required />
        </div>
        <div class="form-group">
          <label for="age">Age</label>
          <input type="number" id="age" v-model="newAd.age" required />
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="newAd.gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" id="location" v-model="newAd.location" required />
        </div>
        <div class="form-group">
          <label for="vaccinated">Vaccinated</label>
          <input type="checkbox" id="vaccinated" v-model="newAd.vaccinated" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="newAd.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Image URL</label>
          <input type="text" id="image" v-model="newAd.image" placeholder="Enter image URL" />
        </div>
        <button type="submit" class="cta-button">Create Advertisement</button>
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
        image: '', // Store the image URL
      },
    };
  },
  methods: {
    async createAdvertisement() {
      if (!this.newAd.name || !this.newAd.type || !this.newAd.breed) {
        alert('Please fill in all required fields.');
        return;
      }

      try {
        const res = await api.post('/pets', this.newAd);
        console.log('New advertisement created:', res.data);
        alert('Advertisement created successfully!');
        this.$router.push('/'); // Redirect to home after creation
      } catch (err) {
        console.error('Error creating advertisement:', err.response?.data || err);
        alert(err.response?.data?.message || 'Failed to create advertisement. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
.create-advertisement-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e5e7eb; /* Slightly darker gray for better contrast */
  padding: 20px;
}

.create-advertisement {
  width: 100%;
  max-width: 450px; /* Adjusted width for better fit */
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.create-advertisement h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #111827; /* Darker text color for better readability */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1f2937; /* Darker gray for labels */
}

input,
textarea,
select {
  width: 100%;
  padding: 7.5px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #f9fafb; /* Light background */
  color: #111827; /* Darker text color for inputs */
}

input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #2563eb; /* Blue focus outline for accessibility */
  border-color: #2563eb;
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #2563eb; /* Vibrant blue for buttons */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #1d4ed8; /* Slightly darker blue on hover */
  transform: scale(1.02);
}

button:focus {
  outline: 2px solid #1d4ed8; /* Focus outline for buttons */
}

/* Responsive Design */
@media (max-width: 600px) {
  .create-advertisement {
    max-width: 90%; /* Adjust width for smaller screens */
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
