import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: "Welcome to PetConnect!",
    home: "Home",
    profile: "Profile",
  },
  de: {
    welcome: "Willkommen bei PetConnect!",
    home: "Startseite",
    profile: "Profil",
  },
  fr: {
    welcome: "Bienvenue sur PetConnect!",
    home: "Accueil",
    profile: "Profil",
  },
};

const i18n = createI18n({
  locale: 'de', // Standard-Sprache
  fallbackLocale: 'en',
  messages,
});

export default i18n;
