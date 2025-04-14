<template>
    <div class="register-view">
      <h1>{{ $t('registerTitle') }}</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">{{ $t('username') }}</label>
          <input
            type="text"
            id="username"
            v-model="username"
            :placeholder="$t('usernamePlaceholder')"
            required
          />
        </div>
        <div class="form-group">
          <label for="firstname">{{ $t('firstname') }}</label>
          <input
            type="text"
            id="firstname"
            v-model="firstname"
            :placeholder="$t('firstnamePlaceholder')"
            required
          />
        </div>
        <div class="form-group">
          <label for="lastname">{{ $t('lastname') }}</label>
          <input
            type="text"
            id="lastname"
            v-model="lastname"
            :placeholder="$t('lastnamePlaceholder')"
            required
          />
        </div>
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
        <div class="form-group">
          <label for="confirmPassword">{{ $t('confirmPassword') }}</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            :placeholder="$t('confirmPwPlaceholder')"
            required
          />
        </div>
        <button type="submit">{{ $t('registerButton') }}</button>
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
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async handleRegister() {
        if (!this.username || !this.firstname || !this.lastname || !this.email || !this.password || !this.confirmPassword) {
          alert('Please fill in all fields.');
          return;
        }
  
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match.');
          return;
        }
  
        try {
          const res = await api.post('/auth/register', {
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          });
          console.log('Registration response:', res.data);
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
  .register-view {
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
  