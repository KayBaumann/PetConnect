<template>
  <div :class="['contact-view', { 'dark-mode': isDarkMode }]">
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
      success: false,
      isDarkMode: localStorage.getItem('isDarkMode') === 'true'
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
.contact-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f3f4f6;
  color: #1f2937;
  transition: background-color 0.3s, color 0.3s;
}

.contact-header {
  text-align: center;
  margin-bottom: 40px;
}

.contact-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2563eb;
}

.contact-header p {
  font-size: 1.2rem;
  color: #6b7280;
}

.contact-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 30px 20px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: bold;
  color: #1f2937;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #f9fafb;
  color: #111827;
}

input:focus,
textarea:focus {
  outline: 2px solid #2563eb;
  border-color: #2563eb;
}

.contact-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.contact-button:hover {
  background-color: #1d4ed8;
  transform: scale(1.03);
}

.success-message {
  color: #22c55e;
  margin-top: 10px;
  text-align: center;
}

/* Dark mode styles */
.contact-view.dark-mode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #f7fafc;
}

.contact-view.dark-mode .contact-header h1 {
  color: #63b3ed;
}

.contact-view.dark-mode .contact-header p {
  color: #a0aec0;
}

.contact-view.dark-mode .contact-form {
  background: rgba(45, 55, 72, 0.97);
  color: #f7fafc;
  box-shadow: 0 4px 16px rgba(99,179,237,0.10);
}

.contact-view.dark-mode label {
  color: #f7fafc;
}

.contact-view.dark-mode input,
.contact-view.dark-mode textarea {
  background-color: #232946;
  color: #f7fafc;
  border: 1.5px solid #4a5568;
}

.contact-view.dark-mode input:focus,
.contact-view.dark-mode textarea:focus {
  outline: 2px solid #63b3ed;
  border-color: #63b3ed;
  background-color: #1a202c;
}

.contact-view.dark-mode .contact-button {
  background-color: #374151;
  color: #f7fafc;
}

.contact-view.dark-mode .contact-button:hover {
  background-color: #2563eb;
}

.contact-view.dark-mode .success-message {
  color: #22c55e;
}
</style>