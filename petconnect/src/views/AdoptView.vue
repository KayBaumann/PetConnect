<template>
  <div class="adopt-view" :class="{ 'dark-mode': isDarkMode }">
    <h1 class="adopt-title">{{ $t('adoptThisPet') }}</h1>
    <p class="adopt-subtitle">{{ $t('pleaseFillForm') }}</p>

    <form @submit.prevent="submitAdoptionRequest" class="adopt-form">
      <input
        v-model="form.fullname"
        type="text"
        :placeholder="$t('form.fullname')"
        required
      />
      <input
        v-model="form.email"
        type="email"
        :placeholder="$t('form.email')"
        required
      />
      <textarea
        v-model="form.message"
        :placeholder="$t('form.messageToOwner')"
        required
      ></textarea>

      <button type="submit">{{ $t('sendAdoptionRequest') }}</button>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'AdoptView',
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      form: {
        fullname: '',
        email: '',
        message: ''
      },
      petId: this.$route.params.id
    };
  },
  methods: {
    async submitAdoptionRequest() {
      try {
        const senderId = localStorage.getItem('userId');
        if (!senderId) {
          alert(this.$t('form.notLoggedIn'));
          return;
        }

        await api.post('/messages', {
          fromUserId: senderId,
          petId: this.petId,
          text: `
          Name: ${this.form.fullname}
          E-Mail: ${this.form.email}
          Nachricht: ${this.form.message}
          `
        });

        alert(this.$t('form.messageSent'));
        this.$router.push('/');
      } catch (err) {
        console.error('Adoption request error:', err.response?.data || err.message || err);
        alert(this.$t('form.messageSendError'));
      }
    }
  }
};
</script>
