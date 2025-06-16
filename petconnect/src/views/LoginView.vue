<template>
  <div class="login-view">
    <h1>{{ $t('loginTitle') }}</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="identifier">{{ $t('emailOrUsername') }}</label>
        <input
          type="text"
          id="identifier"
          v-model="identifier"
          :placeholder="$t('emailOrUsernamePlaceholder')"
          required
        />        
      </div>
      <div class="form-group">
        <label for="password">{{ $t('password') }}</label>
        <input
          type="password"
          id="password"
          v-model="password"
          :placeholder="$t('pwPlaceholder')"
          required
        />
      </div>
      <button type="submit">{{ $t('loginButton') }}</button>
      <router-link to="/register" class="register-link">{{ $t('register') }}</router-link>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'LoginView',
  data() {
    return {
      identifier: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      if (!this.identifier || !this.password) {
        alert(this.$t('fillAllFields'));
        return;
      }
      try {
        const res = await api.post('/auth/login', {
          identifier: this.identifier,
          password: this.password
        });
        localStorage.setItem('token', res.data.token);
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

