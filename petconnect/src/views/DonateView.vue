<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const amount = ref(10);
const isDarkMode = localStorage.getItem('isDarkMode') === 'true';

const donate = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/create-checkout-session', {
      amount: amount.value,
    });

    const stripe = await loadStripe('pk_test_51RNuRZHCn7PF7a88rJOGiKFBPRtoXH1nFlwSzd3QPyICdHqrt4ejWvXhrNrkQIzNbAmANcMquHyl5DGPfkED0hjp00cSq3jTC4');
    await stripe.redirectToCheckout({ sessionId: res.data.id });
  } catch (error) {
    console.error('Fehler beim Erstellen der Zahlung:', error);
  }
};
</script>

<template>
  <div :class="['donate-view', { 'dark-mode': isDarkMode }]">
    <div class="donate-header">
      <h1>{{ $t('donateTitle') }}</h1>
      <p>{{ $t('donateDescription') }}</p>
    </div>
    <div class="donate-form">
      <label for="amount">{{ $t('donateAmount') }}</label>
      <input type="number" id="amount" v-model="amount" min="1" />
      <button class="donate-button" @click="donate">{{ $t('donateNow') }}</button>
    </div>
  </div>
</template>

<style scoped>
.donate-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f3f4f6;
  color: #1f2937;
  transition: background-color 0.3s, color 0.3s;
}

.donate-header {
  text-align: center;
  margin-bottom: 40px;
}

.donate-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2563eb;
}

.donate-header p {
  font-size: 1.2rem;
  color: #6b7280;
}

.donate-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
  padding: 32px 22px;
  min-width: 300px;
}

.donate-form label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
}

.donate-form input {
  padding: 10px;
  font-size: 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  width: 200px;
  background: #f9fafb;
  color: #1f2937;
  transition: border-color 0.2s, background-color 0.2s;
}

.donate-form input:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
  background: #fff;
}

.donate-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.donate-button:hover {
  background-color: #1d4ed8;
  transform: scale(1.05);
}

/* Dark mode styles */
.donate-view.dark-mode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #f7fafc;
}

.donate-view.dark-mode .donate-header h1 {
  color: #63b3ed;
}

.donate-view.dark-mode .donate-header p {
  color: #a0aec0;
}

.donate-view.dark-mode .donate-form {
  background: rgba(45, 55, 72, 0.95);
  color: #edf2f7;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.donate-view.dark-mode .donate-form label {
  color: #f7fafc;
}

.donate-view.dark-mode .donate-form input {
  background: #2d3748;
  color: #f7fafc;
  border: 1.5px solid #4a5568;
}

.donate-view.dark-mode .donate-form input:focus {
  outline: 2px solid #63b3ed;
  border-color: #63b3ed;
  background: #232946;
}

.donate-view.dark-mode .donate-button {
  background-color: #374151;
  color: #f7fafc;
}

.donate-view.dark-mode .donate-button:hover {
  background-color: #2563eb;
}
</style>
