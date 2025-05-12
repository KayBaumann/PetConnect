<template>
  <div class="success-message">
    <h1>Danke vielmals für deine Unterstützung!</h1>
    <p>Die Tiere freuen sich sehr darüber</p>
    <router-link to="/" class="back-home-button">Home</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.success-message {
  text-align: center;
  margin-top: 100px;
  padding: 20px;
  color: #1f2937;
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
</style>