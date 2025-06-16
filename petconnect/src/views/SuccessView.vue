<template>
  <div class="success-message">
    <h1>{{ $t('donation.thankYou') }}</h1>
    <p>{{ $t('donation.appreciation') }}</p>
    <router-link to="/" class="back-home-button">
      {{ $t('donation.backHome') }}
    </router-link>
  </div>
</template>

<script setup>
</script>

