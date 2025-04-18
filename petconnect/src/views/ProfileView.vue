<template>
  <div :class="['profile-view', { 'dark-mode': isDarkMode }]">
    <h1>Profile</h1>
    <button @click="toggleDarkMode">
      {{ isDarkMode ? 'Switch to Bright Mode' : 'Switch to Dark Mode' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', this.isDarkMode);
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    },
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