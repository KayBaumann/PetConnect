<template>
  <div class="form-container">
    <h1>{{ $t('contact') }}</h1>
    <form @submit.prevent="submitForm">
      <input
        type="text"
        v-model="form.name"
        :placeholder="$t('yourName')"
        required
      />
      <input
        type="email"
        v-model="form.email"
        :placeholder="$t('yourEmail')"
        required
      />
      <div style="position: relative;">
        <textarea
          v-model="form.message"
          :placeholder="$t('yourMessage')"
          rows="5"
          required
          style="resize: none; min-height: 120px; min-width: 500px;"
        ></textarea>
      </div>
      <button type="submit">{{ $t('sendMessage') }}</button>
      <p v-if="success" class="success-message">{{ $t('contactSuccess') }}</p>
    </form>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      success: false
    };
  },
  methods: {
    submitForm() {
      const serviceID = 'service_c536nta';
      const templateID = 'template_wzc5g4i';
      const userID = 'qw7hYnngPdDp8zxUH';

      const templateParams = {
        from_name: this.form.name,
        from_email: this.form.email,
        message: this.form.message,
        to_email: 'kay_baumann@sluz.ch'
      };

      emailjs.send(serviceID, templateID, templateParams, userID)
        .then(() => {
          this.success = true;
          this.form = { name: '', email: '', message: '' };
          setTimeout(() => (this.success = false), 4000);
        })
        .catch(() => {
          alert(this.$t('contactError'));
        });
    }
  }
};
</script>

<style scoped>
.success-message {
  color: #22c55e;
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}
</style>