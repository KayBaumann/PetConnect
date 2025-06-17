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
        class="advertisement-card"
      >
        <img :src="pet.image" :alt="pet.name" class="pet-image" />
        <h3>{{ pet.name }}</h3>
        <p class="">{{ $t('search.type') }}: {{ pet.type }}</p>
        <p class="ad-description">{{ $t('search.breed') }}: {{ pet.breed }}</p>
        <p class="ad-description">{{ $t('search.age') }}: {{ pet.age }} {{ $t('search.years') }}</p>
        <p class="ad-description">{{ $t('search.location') }}: {{ pet.location }}</p>
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


