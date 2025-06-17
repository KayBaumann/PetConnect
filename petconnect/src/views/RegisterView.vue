<template>
  <div class="form-container">
    <h1>{{ $t('register.title') }}</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">{{ $t('register.username') }}</label>
        <input
          type="text"
          id="username"
          v-model="username"
          :placeholder="$t('usernamePlaceholder')"
          required
        />
      </div>
      <div class="form-group">
        <label for="firstName">{{ $t('register.firstName') }}</label>
        <input
          type="text"
          id="firstName"
          v-model="firstName"
          :placeholder="$t('firstNamePlaceholder')"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastName">{{ $t('register.lastName') }}</label>
        <input
          type="text"
          id="lastName"
          v-model="lastName"
          :placeholder="$t('lastNamePlaceholder')"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">{{ $t('register.email') }}</label>
        <input
          type="email"
          id="email"
          v-model="email"
          :placeholder="$t('emailPlaceholder')"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">{{ $t('register.password') }}</label>
        <input
          type="password"
          id="password"
          v-model="password"
          :placeholder="$t('pwPlaceholder')"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">{{ $t('register.confirmPassword') }}</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          :placeholder="$t('confirmPwPlaceholder')"
          required
        />
      </div>
      <button type="submit">{{ $t('register.button') }}</button>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async handleRegister() {
      if (!this.username || !this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
        alert(this.$t('fillAllFields'));
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert(this.$t('passwordMismatch'));
        return;
      }

      try {
        const res = await api.post('/auth/register', {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        });
        console.log('Registration response:', res.data);
        alert(this.$t('register.success'));
        this.$router.push('/login');
      } catch (err) {
        console.error('Registration error:', err.response?.data || err);
        alert(err.response?.data?.message || this.$t('register.failed'));
      }
    }
  }
};
</script>
