<template>
  <div class="contact-view">
    <div class="contact-header">
      <h1>{{ $t('contact') }}</h1>
      <p>{{ $t('contactDescription') }}</p>
    </div>
    <form class="contact-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">{{ $t('yourName') }}</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">{{ $t('yourEmail') }}</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="message">{{ $t('yourMessage') }}</label>
        <textarea id="message" v-model="form.message" rows="5" required></textarea>
      </div>
      <button type="submit" class="contact-button">{{ $t('sendMessage') }}</button>
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

