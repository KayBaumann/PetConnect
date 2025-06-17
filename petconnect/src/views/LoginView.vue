<template>
  <div class="form-container">
    <h1>{{ $t('login.title') }}</h1>
    <form @submit.prevent="login">
      <input
        type="text"
        v-model="username"
        :placeholder="$t('login.username')"
        required
      />
      <input
        type="password"
        v-model="password"
        :placeholder="$t('login.password')"
        required
      />
      <button type="submit">{{ $t('login.button') }}</button>
    </form>
    <router-link to="/register" class="form-container-register-link">
      <button type="button">{{ $t('registerButton') }}</button>
    </router-link>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        alert(this.$t('fillAllFields'));
        return;
      }
      try {
        const res = await api.post('/auth/login', {
          identifier: this.username,
          password: this.password
        });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', res.data.userId);
        alert(this.$t('loginSuccess'));
        this.$router.push('/').then(() => window.location.reload());
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || this.$t('loginFailed'));
      }
    }
  }
};
</script>

