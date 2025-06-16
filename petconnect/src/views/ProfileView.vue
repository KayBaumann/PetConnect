<template>
  <div :class="['profile-view', { 'dark-mode': isDarkMode }]">
    <h1>{{ $t('profile') }}</h1>

    <div v-if="user">
      <h3>{{ $t('username') }}: {{ user.username }}</h3>
      <p>{{ $t('firstname') }}: {{ user.firstName }}</p>
      <p>{{ $t('lastname') }}: {{ user.lastName }}</p>
      <p>{{ $t('email') }}: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>{{ $t('fetchError') }}</p>
    </div>

    <button @click="toggleDarkMode">
      {{ isDarkMode ? $t('switchToBright') : $t('switchToDark') }}
    </button>

    <!-- Gespeicherte Tiere -->
    <div class="saved-pets">
      <h2>{{ $t('savedPets') }}</h2>
      <div v-if="savedPets.length === 0">
        <p>{{ $t('noSavedPets') }}</p>
      </div>
      <div v-else class="pets-list">
        <div v-for="pet in savedPets" :key="pet._id" class="pet-card">
          <router-link
          :to="{ name: 'advertisement', params: { id: pet._id } }"
          class="advertisement-card-link"
        >
          <img :src="pet.image" :alt="pet.name" class="pet-image" />
          <h3>{{ pet.name }}</h3>
          <p>{{ pet.type }} - {{ pet.breed }}</p>
          <button @click="removeFromSaved(pet._id)">
            {{ $t('remove') }}
          </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Eigene Inserate -->
    <div class="my-pets">
      <h2>{{ $t('myAds') }}</h2>
      <div v-if="myPets.length === 0">
        <p>{{ $t('noAds') }}</p>
      </div>
      <div v-else class="pets-list">
        <div v-for="pet in myPets" :key="pet._id" class="pet-card">
        <router-link
          :to="{ name: 'advertisement', params: { id: pet._id } }"
          class="advertisement-card-link"
        >
          <img :src="pet.image" :alt="pet.name" class="pet-image" />
          <h3>{{ pet.name }}</h3>
          <p>{{ pet.type }} - {{ pet.breed }}</p>
          <p>{{ pet.location }}</p>
        </router-link>

        <button @click="deleteMyPet(pet._id)">
          {{ $t('delete') }}
        </button>
      </div>


      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'ProfileView',
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      user: null,
      savedPets: [],
      myPets: []
    };
  },
  methods: {
    async deleteMyPet(petId) {
      if (!confirm(this.$t('confirmDelete'))) return;

      try {
        await api.delete(`/pets/${petId}`);
        this.myPets = this.myPets.filter(pet => pet._id !== petId);
        alert(this.$t('form.adDeleted'));
      } catch (err) {
        console.error('Error deleting pet:', err);
        alert(this.$t('form.adDeleteFailed'));
      }
    },

    async fetchUserData() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');
        const res = await api.get(`/auth/user/${userId}`);
        this.user = res.data;
      } catch (err) {
        console.error('Error fetching user data:', err);
        alert(this.$t('fetchError'));
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', this.isDarkMode);
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    },
    loadSavedPets() {
      const saved = JSON.parse(localStorage.getItem('savedPets')) || [];
      this.savedPets = saved;
    },
    removeFromSaved(petId) {
      this.savedPets = this.savedPets.filter((pet) => pet._id !== petId);
      localStorage.setItem('savedPets', JSON.stringify(this.savedPets));
    },
    async loadMyPets() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');
        const res = await api.get(`/pets/user/${userId}`);
        this.myPets = res.data;
      } catch (err) {
        console.error('Error loading user pets:', err);
      }
    }
  },
  async created() {
    await this.fetchUserData();
    this.loadSavedPets();
    await this.loadMyPets();
  },
};
</script>

<style scoped>
.profile-view {
  padding: 20px;
  text-align: center;
  background: #f3f4f6;
  color: #1a202c;
  transition: background-color 0.3s, color 0.3s;
}

.profile-view.dark-mode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #f7fafc;
}

.pet-card button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.pet-card button:hover {
  background-color: #dc2626;
}


button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #1d4ed8;
  transform: scale(1.05);
}

.saved-pets,
.my-pets {
  margin-top: 30px;
}

.pets-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.pet-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
  width: 200px;
  color: #1a202c;
}

.pet-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

/* Dark mode styles for pet cards */
.profile-view.dark-mode .pet-card {
  background: rgba(45, 55, 72, 0.97);
  color: #f7fafc;
  box-shadow: 0 4px 16px rgba(99,179,237,0.10);
}

.profile-view.dark-mode .pet-card h3 {
  color: #63b3ed;
}

.profile-view.dark-mode .pet-card p {
  color: #e2e8f0;
}

.profile-view.dark-mode .pet-image {
  border: 2px solid #4a5568;
}
</style>
