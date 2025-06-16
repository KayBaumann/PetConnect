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

