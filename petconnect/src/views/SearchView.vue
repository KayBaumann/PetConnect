<!-- src/views/SearchView.vue -->
<template>
  <div :class="['search-view', { 'dark-mode': isDarkMode }]">
    <h1>{{ $t('search') }}</h1>
    <form @submit.prevent="applyFilters" class="filter-form">
      <div class="form-group">
        <label for="type">{{ $t('type') }}</label>
        <div class="input-wrapper">
          <input
            type="text"
            id="type"
            v-model="filters.type"
            list="type-options"
            placeholder="e.g., Dog, Cat"
          />
          <button v-if="filters.type" type="button" class="clear-button" @click="filters.type = ''">x</button>
        </div>
        <datalist id="type-options">
          <option v-for="type in uniqueTypes" :key="type" :value="type" />
        </datalist>
      </div>
      <div class="form-group">
        <label for="breed">{{ $t('breed') }}</label>
        <div class="input-wrapper">
          <input
            type="text"
            id="breed"
            v-model="filters.breed"
            list="breed-options"
            placeholder="e.g., Labrador"
          />
          <button v-if="filters.breed" type="button" class="clear-button" @click="filters.breed = ''">x</button>
        </div>
        <datalist id="breed-options">
          <option v-for="breed in uniqueBreeds" :key="breed" :value="breed" />
        </datalist>
      </div>
      <div class="form-group">
        <label for="location">{{ $t('location') }}</label>
        <div class="input-wrapper">
          <input
            type="text"
            id="location"
            v-model="filters.location"
            list="location-options"
            placeholder="e.g., New York"
          />
          <button v-if="filters.location" type="button" class="clear-button" @click="filters.location = ''">x</button>
        </div>
        <datalist id="location-options">
          <option v-for="location in uniqueLocations" :key="location" :value="location" />
        </datalist>
      </div>
      <div class="form-group">
        <label for="age">{{ $t('age') }}</label>
        <div class="input-wrapper">
          <input type="number" id="age" v-model="filters.age" placeholder="e.g., 2" />
          <button v-if="filters.age" type="button" class="clear-button" @click="filters.age = null">x</button>
        </div>
      </div>
      <button type="submit" class="filter-button">{{ $t('applyFilters') }}</button>
    </form>

    <div class="results">  
      <p v-if="filteredPets.length === 0">{{ $t('noResults') }}</p>
      <router-link
        v-for="pet in filteredPets"
        :key="pet._id"
        :to="{ name: 'advertisement', params: { id: pet._id } }"
        class="pet-card"
      >
        <img :src="pet.image" :alt="pet.name" class="pet-image" />
        <h3>{{ pet.name }}</h3>
        <p>{{ $t('type') }}: {{ pet.type }}</p>
        <p>{{ $t('breed') }}: {{ pet.breed }}</p>
        <p>{{ $t('age') }}: {{ pet.age }} {{ $t('years') }}</p>
        <p>{{ $t('location') }}: {{ pet.location }}</p>
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


