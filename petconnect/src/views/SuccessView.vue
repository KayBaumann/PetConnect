<template>
  <div :class="['success-message', { 'dark-mode': isDarkMode }]">
    <h1>{{ $t('donation.thankYou') }}</h1>
    <p>{{ $t('donation.appreciation') }}</p>
    <router-link to="/" class="back-home-button">
      {{ $t('donation.backHome') }}
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
</script>

<style scoped>
.success-message {
  text-align: center;
  margin-top: 100px;
  padding: 20px;
  color: #1f2937;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: background-color 0.3s, color 0.3s;
}

.success-message h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2563eb;
}

.success-message p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.back-home-button {
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.back-home-button:hover {
  background-color: #1d4ed8;
}

/* Dark mode styles */
.success-message.dark-mode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #f7fafc;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.success-message.dark-mode h1 {
  color: #63b3ed;
}

.success-message.dark-mode p {
  color: #e2e8f0;
}

.success-message.dark-mode .back-home-button {
  background-color: #374151;
  color: #f7fafc;
}

.success-message.dark-mode .back-home-button:hover {
  background-color: #2563eb;
}
</style>