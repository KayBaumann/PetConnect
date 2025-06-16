<template>
  <div :class="['search-view', { 'dark-mode': isDarkMode }]">
    <h1>{{ $t('search.title') }}</h1>

    <form @submit.prevent="applyFilters" class="filter-form">
      <!-- Type Filter -->
      <div class="form-group">
        <label for="type">{{ $t('search.type') }}</label>
        <div class="input-wrapper">
          <input
            type="text"
            id="type"
            v-model="filters.type"
            list="type-options"
            :placeholder="$t('search.placeholderType')"
          />
          <button v-if="filters.type" type="button" class="clear-button" @click="filters.type = ''">x</button>
        </div>
        <datalist id="type-options">
          <option v-for="type in uniqueTypes" :key="type" :value="type" />
        </datalist>
      </div>

      <!-- Breed Filter -->
      <div class="form-group">
        <label for="breed">{{ $t('search.breed') }}</label>
        <div class="input-wrapper">
          <input
            type="text"
            id="breed"
            v-model="filters.breed"
            list="breed-options"
            :placeholder="$t('search.placeholderBreed')"
          />
          <button v-if="filters.breed" type="button" class="clear-button" @click="filters.breed = ''">x</button>
        </div>
        <datalist id="breed-options">
          <option v-for="breed in uniqueBreeds" :key="breed" :value="breed" />
        </datalist>
      </div>

      <!-- Location Filter -->
      <div class="form-group">
        <label for="location">{{ $t('search.location') }}</label>
        <div class="input-wrapper">
          <input
            type="text"
            id="location"
            v-model="filters.location"
            list="location-options"
            :placeholder="$t('search.placeholderLocation')"
          />
          <button v-if="filters.location" type="button" class="clear-button" @click="filters.location = ''">x</button>
        </div>
        <datalist id="location-options">
          <option v-for="location in uniqueLocations" :key="location" :value="location" />
        </datalist>
      </div>

      <!-- Age Filter -->
      <div class="form-group">
        <label for="age">{{ $t('search.age') }}</label>
        <div class="input-wrapper">
          <input
            type="number"
            id="age"
            v-model="filters.age"
            :placeholder="$t('search.placeholderAge')"
          />
          <button v-if="filters.age" type="button" class="clear-button" @click="filters.age = null">x</button>
        </div>
      </div>

      <button type="submit" class="filter-button">{{ $t('search.applyFilters') }}</button>
    </form>

    <!-- Results -->
    <div class="results">
      <p v-if="filteredPets.length === 0">{{ $t('search.noResults') }}</p>
      <router-link
        v-for="pet in filteredPets"
        :key="pet._id"
        :to="{ name: 'advertisement', params: { id: pet._id } }"
        class="pet-card"
      >
        <img :src="pet.image" :alt="pet.name" class="pet-image" />
        <h3>{{ pet.name }}</h3>
        <p>{{ $t('search.type') }}: {{ pet.type }}</p>
        <p>{{ $t('search.breed') }}: {{ pet.breed }}</p>
        <p>{{ $t('search.age') }}: {{ pet.age }} {{ $t('search.years') }}</p>
        <p>{{ $t('search.location') }}: {{ pet.location }}</p>
      </router-link>
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
    isDarkMode() {
      return localStorage.getItem('isDarkMode') === 'true';
    },
  },
  async created() {
    try {
      const res = await api.get('/pets');
      this.pets = res.data;
      this.filteredPets = res.data;
    } catch (err) {
      console.error('Error fetching pets:', err);
      alert(this.$t('error.fetchPets'));
    }
  },
  methods: {
    applyFilters() {
      this.filteredPets = this.pets.filter((pet) => {
        return (
          (!this.filters.type || pet.type?.toLowerCase().includes(this.filters.type.toLowerCase())) &&
          (!this.filters.breed || pet.breed?.toLowerCase().includes(this.filters.breed.toLowerCase())) &&
          (!this.filters.location || pet.location?.toLowerCase().includes(this.filters.location.toLowerCase())) &&
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
  transition: background-color 0.3s, color 0.3s;
}

/* Dark mode */
.search-view.dark-mode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #f7fafc;
}

/* Bright (light) mode */
.search-view:not(.dark-mode) {
  background: #fff;
  color: #222;
}

/* Light mode overrides for cards and form */
.search-view:not(.dark-mode) .pet-card {
  background: #fff;
  color: #222;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
}

.search-view:not(.dark-mode) .filter-form {
  background: #f7fafc;
  color: #222;
  box-shadow: 0 4px 6px rgba(0,0,0,0.06);
}

.search-view:not(.dark-mode) input {
  background: #fff;
  color: #222;
  border: 1px solid #cbd5e1;
}

.search-view:not(.dark-mode) input:focus {
  outline: 2px solid #3182ce;
  border-color: #3182ce;
}

.search-view:not(.dark-mode) label {
  color: #2d3748;
}

.search-view:not(.dark-mode) .clear-button {
  color: #4a5568;
}

.search-view:not(.dark-mode) .pet-image {
  border: 2px solid #cbd5e1;
}

.search-view:not(.dark-mode) h3 {
  color: #2563eb;
}

.search-view:not(.dark-mode) p {
  color: #2d3748;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  background: var(--form-background, rgba(45, 55, 72, 0.95)); /* Darker form background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: var(--form-text-color, #edf2f7); /* Text color for form */
}

.form-group {
  flex: 1 1 250px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--label-color, #a0aec0); /* Adjusted label color */
}

.input-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--input-border-color, #4a5568); /* Adjusted border color */
  border-radius: 4px;
  font-size: 1rem;
  background: var(--input-background, #2d3748); /* Darker input background */
  color: var(--input-text-color, #f7fafc); /* Input text color */
}

input:focus {
  outline: 2px solid var(--input-focus-color, #63b3ed); /* Adjusted focus color */
  border-color: var(--input-focus-color, #63b3ed); /* Adjusted focus color */
}

.clear-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--clear-button-color, #a0aec0); /* Adjusted clear button color */
  font-size: 1rem;
  cursor: pointer;
}

.clear-button:hover {
  color: #2563eb;
}

.filter-button {
  padding: 12px 20px;
  background-color: var(--button-background, #2c5282); /* Darker button background */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.filter-button:hover {
  background-color: var(--button-hover-background, #2b6cb0); /* Adjusted hover background */
  transform: scale(1.05);
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.pet-card {
  background: var(--card-background, rgba(45, 55, 72, 0.95)); /* Darker card background */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Adjusted shadow for dark mode */
  padding: 20px;
  max-width: 250px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  color: var(--card-text-color, #edf2f7); /* Text color for card */
}

.pet-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5); /* Adjusted hover shadow */
}

.pet-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 2px solid var(--image-border-color, #4a5568); /* Added border for better contrast */
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--heading-color, #63b3ed); /* Adjusted heading color */
}

p {
  font-size: 1rem;
  color: var(--paragraph-color, #e2e8f0); /* Adjusted paragraph text color */
}
</style>
