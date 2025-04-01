import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import router from './router'; // Router hier importieren
// main.js
import './assets/styles.css';

// Sprachdateien importieren
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';

// i18n konfigurieren
const i18n = createI18n({
  legacy: false, // Wichtig, um die Composition API zu verwenden
  locale: 'de', // Standard-Sprache
  messages: {
    en,
    de,
    fr,
    it,
  },
});

createApp(App)
  .use(router) // Router hier hinzufügen
  .use(i18n)
  .mount('#app');
