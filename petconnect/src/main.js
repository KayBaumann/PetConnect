import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import router from './router';
import './assets/styles.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'



import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';

const i18n = createI18n({
  legacy: true,
  globalInjection: true,
  locale: localStorage.getItem('lang') || 'de',
  messages: { en, de, fr, it }
});


axios.interceptors.request.use(config => {
  const lang = localStorage.getItem('lang') || 'de';
  config.headers['Accept-Language'] = lang;
  return config;
});

const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';
if (savedDarkMode) {
  document.body.classList.add('dark-mode');
}

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app');


