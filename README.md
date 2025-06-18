# PetConnect

PetConnect ist eine mehrsprachige Webplattform, die Tierheime und Privatpersonen verbindet, um weltweite Tieradoptionen zu vereinfachen. Zukünftig soll zudem ein Betreuungsservice integriert werden, der Haustierbesitzern vertrauenswürdige Sitter vermittelt.

> **Hinweis:** Aus Sicherheitsgründen wird die `.env`-Datei nicht im Repository bereitgestellt. Bitte kontaktiere einen Entwickler, um die benötigten Zugangsdaten zu erhalten. Eine sichere und skalierbare Lösung für das Secret Management ist in Entwicklung.

---

## 🌎 Features

- Benutzerregistrierung und Login mit sicherer Authentifizierung
- Erstellung und Verwaltung von Tieranzeigen
- Mehrsprachige Benutzeroberfläche (Deutsch, Englisch, Französisch, Italienisch)
- Favoritenfunktion für eingeloggte Benutzer
- Registrierung und Verwaltung von Tierheimen
- Responsives Design für Desktop und Mobile
- Sicheres Backend mit RESTful API-Architektur

---

## 📁 Tech Stack

**Frontend:**
- Vue.js 3 (Composition API)
- Vue Router
- Vue-i18n (Internationalisierung)
- Axios
- Bootstrap & Custom CSS

**Backend:**
- Node.js mit Express.js
- MongoDB Atlas (Cloud gehostet)
- Mongoose ODM
- dotenv (Umgebungsvariablen)
- bcrypt (Passwort-Hashing)

**Deployment:**
- Plesk Webhosting

---

## 🔄 Systemarchitektur

**Datenbank (MongoDB Collections):**

- **users**: Benutzerinformationen, Favoriten
- **shelters**: Tierheiminformationen
- **advertisements**: Tieranzeigen

**Kommunikation:**
- Das Frontend kommuniziert über Axios mit dem Express-Backend.
- Das Backend stellt RESTful API-Endpunkte bereit (z.B. `/api/auth`, `/api/pets`, `/api/shelter`).
- Die Datenbankzugriffe erfolgen über Mongoose.

**Authentifizierung:**
- Passwort-Hashing mit bcrypt
- Schutz sensibler API-Routen nur für authentifizierte Benutzer
- Token-Speicherung im Local Storage

**Mehrsprachigkeit:**
- Frontend-basiert mit Vue-i18n und JSON-Locale-Files
- Datenbank bleibt sprachneutral
- Sprachen: Englisch, Deutsch, Französisch, Italienisch (erweiterbar)

---

## 🔧 Installation & Setup

### 1. Repository klonen
```bash
git clone https://github.com/KayBaumann/PetConnect.git

npm install

npm run dev
