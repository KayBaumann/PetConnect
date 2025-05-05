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
      {{ isDarkMode ? 'Switch to Bright Mode' : 'Switch to Dark Mode' }}
    </button>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'ProfileView',
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      user: null, // Hier werden die Benutzerdaten gespeichert
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const userId = localStorage.getItem('userId'); // Angenommen, die Benutzer-ID wird im LocalStorage gespeichert
        if (!userId) {
          throw new Error('User ID not found');
        }
        const res = await api.get(`/auth/user/${userId}`); // Backend-Route für Benutzerdaten
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
  },
  async created() {
    await this.fetchUserData(); // Benutzerdaten beim Laden der Seite abrufen
  },
};
</script>

<style scoped>
.profile-view {
  padding: 20px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

.profile-view.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

.profile-view:not(.dark-mode) {
  background-color: #ffffff;
  color: #000000;
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
</style>