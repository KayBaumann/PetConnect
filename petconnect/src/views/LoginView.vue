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
        alert('Please fill in all fields.');
        return;
      }
      console.log('Sending login:', this.identifier, this.password);
      try {
        const res = await api.post('/auth/login', {
          identifier: this.identifier,
          password: this.password
        });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', res.data.userId);
        alert('Login successful');

        
        this.$router.push('/').then(() => {
          window.location.reload(); 
        }); 
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Login failed');
      }
    }
  }
};
</script>

<style scoped>
.register-link {
  display: block;
  margin-top: 15px;
  text-align: center;
  color: #1f2937;
  text-decoration: none;
}

.login-view {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 94%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #1f2937;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #374151;
}
</style>