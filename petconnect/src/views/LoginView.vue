<template>
    <div class="login-view">
      <h1>{{ $t('loginTitle') }}</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">{{ $t('email') }}</label>
          <input
            type="email"
            id="email"
            v-model="email"
            :placeholder="$t('emailPlaceholder')"
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
        <button style="margin-top:10px" @click.prevent="handleRegister">{{ $t('registerButton') }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async handleLogin() {
        if (!this.email || !this.password) {
          alert('Please fill in all fields.');
          return;
        }
        try {
          const res = await api.post('/auth/login', {
            email: this.email,
            password: this.password
          });
          console.log(res.data);
          alert('Login successful');
          this.$router.push('/');
        } 
        catch (err) {
          console.error(err);
          alert(err.response?.data?.message || 'Login failed');
        }
      },
      async handleRegister() {
        if (!this.email || !this.password) {
          alert('Please fill in all fields.');
          return;
        }
        try {
          console.log('Sending registration request:', { email: this.email, password: this.password }); // Log the request payload
          const res = await api.post('/auth/register', {
            email: this.email,
            password: this.password,
          });
          console.log('Registration response:', res.data); // Log the response
          alert('Registration successful');
          this.$router.push('/login');
        } catch (err) {
          console.error('Registration error:', err.response?.data || err);
          alert(err.response?.data?.message || 'Registration failed');
        }
      }
    }
  };
  </script>
  
  <style scoped>
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
    width: 100%;
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