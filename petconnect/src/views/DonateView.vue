<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const amount = ref(10);

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
  <div class="donate-view">
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
}

.donate-header {
  text-align: center;
  margin-bottom: 40px;
}

.donate-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
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
}

.donate-form label {
  font-size: 1.2rem;
  font-weight: 600;
}

.donate-form input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  width: 200px;
}

.donate-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.donate-button:hover {
  background-color: #1d4ed8;
  transform: scale(1.05);
}
</style>
