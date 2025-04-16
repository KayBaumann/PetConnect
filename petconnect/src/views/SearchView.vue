<!-- src/views/SearchView.vue -->
<template>
  <div class="search-view">
    <h1>{{ $t('search') }}</h1>
    <form @submit.prevent="applyFilters" class="filter-form">
      <div class="form-group">
        <label for="type">{{ $t('type') }}</label>
        <input
          type="text"
          id="type"
          v-model="filters.type"
          list="type-options"
          placeholder="e.g., Dog, Cat"
        />
        <datalist id="type-options">
          <option v-for="type in uniqueTypes" :key="type" :value="type" />
        </datalist>
      </div>
      <div class="form-group">
        <label for="breed">{{ $t('breed') }}</label>
        <input
          type="text"
          id="breed"
          v-model="filters.breed"
          list="breed-options"
          placeholder="e.g., Labrador"
        />
        <datalist id="breed-options">
          <option v-for="breed in uniqueBreeds" :key="breed" :value="breed" />
        </datalist>
      </div>
      <div class="form-group">
        <label for="location">{{ $t('location') }}</label>
        <input
          type="text"
          id="location"
          v-model="filters.location"
          list="location-options"
          placeholder="e.g., New York"
        />
        <datalist id="location-options">
          <option v-for="location in uniqueLocations" :key="location" :value="location" />
        </datalist>
      </div>
      <div class="form-group">
        <label for="age">{{ $t('age') }}</label>
        <input type="number" id="age" v-model="filters.age" placeholder="e.g., 2" />
      </div>
      <button type="submit" class="filter-button">{{ $t('applyFilters') }}</button>
    </form>

    <div class="results">
      <p v-if="filteredPets.length === 0">{{ $t('noResults') }}</p>
      <div v-for="pet in filteredPets" :key="pet._id" class="pet-card">
        <img :src="pet.image" :alt="pet.name" class="pet-image" />
        <h3>{{ pet.name }}</h3>
        <p>{{ $t('type') }}: {{ pet.type }}</p>
        <p>{{ $t('breed') }}: {{ pet.breed }}</p>
        <p>{{ $t('age') }}: {{ pet.age }} {{ $t('years') }}</p>
        <p>{{ $t('location') }}: {{ pet.location }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'SearchView',
  data() {
    return {
      pets: [],
      filters: {
        type: '',
        breed: '',
        location: '',
        age: null,
      },
      filteredPets: [],
    };
  },
  computed: {
    uniqueTypes() {
      return [...new Set(this.pets.map((pet) => pet.type))];
    },
    uniqueBreeds() {
      return [...new Set(this.pets.map((pet) => pet.breed))];
    },
    uniqueLocations() {
      return [...new Set(this.pets.map((pet) => pet.location))];
    },
  },
  async created() {
    try {
      const res = await api.get('/pets');
      this.pets = res.data;
      this.filteredPets = this.pets; // Initialize with all pets
    } catch (err) {
      console.error('Error fetching pets:', err);
      alert(this.$t('fetchError'));
    }
  },
  methods: {
    applyFilters() {
      this.filteredPets = this.pets.filter((pet) => {
        return (
          (!this.filters.type || pet.type.toLowerCase().includes(this.filters.type.toLowerCase())) &&
          (!this.filters.breed || pet.breed.toLowerCase().includes(this.filters.breed.toLowerCase())) &&
          (!this.filters.location || pet.location.toLowerCase().includes(this.filters.location.toLowerCase())) &&
          (!this.filters.age || pet.age === this.filters.age)
        );
      });
    },
  },
};
</script>

<style scoped>
.search-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  flex: 1 1 250px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #374151;
}

input {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
}

.filter-button {
  padding: 12px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.filter-button:hover {
  background-color: #1d4ed8;
  transform: scale(1.05);
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.pet-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 250px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.pet-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.pet-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #1f2937;
}

p {
  font-size: 1rem;
  color: #4b5563;
}
</style>
