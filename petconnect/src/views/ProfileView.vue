<template>
  <div :class="['profile-view', { 'dark-mode': isDarkMode }]">
    <h1>{{ $t('profile') }}</h1>

    <div v-if="user">
      <h3>{{ $t('username') }}: {{ user.username }}</h3>
      <p>{{ $t('firstname') }}: {{ user.firstName }}</p>
      <p>{{ $t('lastname') }}: {{ user.lastName }}</p>
      <p>{{ $t('email') }}: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>{{ $t('fetchError') }}</p>
    </div>

    <button @click="toggleDarkMode">
      {{ isDarkMode ? $t('switchToBright') : $t('switchToDark') }}
    </button>

    <!-- Gespeicherte Tiere -->
    <div class="saved-pets">
      <h2>{{ $t('savedPets') }}</h2>
      <div v-if="savedPets.length === 0">
        <p>{{ $t('noSavedPets') }}</p>
      </div>
      <div v-else class="pets-list">
        <div v-for="pet in savedPets" :key="pet._id" class="advertisement-card">
          <router-link
            :to="{ name: 'advertisement', params: { id: pet._id } }"
            class="advertisement-card-link"
          >
            <img :src="pet.image" :alt="pet.name" class="pet-image" />
            <h3>{{ pet.name }}</h3>
            <p>{{ pet.type }} - {{ pet.breed }}</p>
            <button @click.stop.prevent="removeFromSaved(pet._id)">
              {{ $t('remove') }}
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Eigene Inserate -->
    <div class="my-pets">
      <h2>{{ $t('myAds') }}</h2>
      <div v-if="myPets.length === 0">
        <p>{{ $t('noAds') }}</p>
      </div>
      <div v-else class="pets-list">
        <div v-for="pet in myPets" :key="pet._id" class="advertisement-card">
          <router-link
            :to="{ name: 'advertisement', params: { id: pet._id } }"
            class="advertisement-card-link"
          >
            <img :src="pet.image" :alt="pet.name" class="pet-image" />
            <h3>{{ pet.name }}</h3>
            <p>{{ pet.type }} - {{ pet.breed }}</p>
            <p>{{ pet.location }}</p>
          </router-link>

          <div class="pet-actions">
            <router-link
              :to="{ name: 'edit-pet', params: { id: pet._id } }"
              class="edit-btn"
            >
              ✏️ {{ $t('edit') }}
            </router-link>

            <button @click="deleteMyPet(pet._id)" class="delete-btn">
              🗑️ {{ $t('delete') }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Nachrichten -->
    <div class="inbox">
      <h2>{{ $t('inbox') }}</h2>

      <div v-if="messages.length === 0" class="no-messages">
        <p>{{ $t('noMessages') }}</p>
      </div>

      <div v-else class="inbox-list">
        <div class="message-card" v-for="msg in messages" :key="msg._id">
          <div class="header">
            📬 <span class="pet-name">{{ msg.petId.name }}</span>
          </div>

          <div class="body" v-if="parseMessage(msg.text)">
            <p><strong>{{ $t('name') }}:</strong> {{ parseMessage(msg.text).name }}</p>
            <p><strong>{{ $t('email') }}:</strong> {{ parseMessage(msg.text).email }}</p>
            <p><strong>{{ $t('message') }}:</strong> {{ parseMessage(msg.text).message }}</p>
          </div>

          <div class="message-actions">
            <button @click="replyToMessage(msg)" class="reply-btn">✉️ {{ $t('reply') }}</button>
            <button @click="deleteMessage(msg._id)" class="delete-btn">🗑️ {{ $t('delete') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'ProfileView',
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      user: null,
      savedPets: [],
      myPets: [],
      messages: []
    };
  },
  methods: {
    async deleteMyPet(petId) {
      if (!confirm(this.$t('confirmDelete'))) return;
      try {
        await api.delete(`/pets/${petId}`);
        this.myPets = this.myPets.filter(pet => pet._id !== petId);
        alert(this.$t('form.adDeleted'));
      } catch (err) {
        console.error('Error deleting pet:', err);
        alert(this.$t('form.adDeleteFailed'));
      }
    },
    async fetchUserData() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');
        const res = await api.get(`/auth/user/${userId}`);
        this.user = res.data;
      } catch (err) {
        console.error('Error fetching user data:', err);
        alert(this.$t('fetchError'));
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', this.isDarkMode);
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    },
    loadSavedPets() {
      const saved = JSON.parse(localStorage.getItem('savedPets')) || [];
      this.savedPets = saved;
    },
    removeFromSaved(petId) {
      this.savedPets = this.savedPets.filter(pet => pet._id !== petId);
      localStorage.setItem('savedPets', JSON.stringify(this.savedPets));
    },
    async loadMyPets() {
      try {
        const userId = localStorage.getItem('userId');
        const res = await api.get(`/pets/user/${userId}`);
        this.myPets = res.data;
      } catch (err) {
        console.error('Error loading user pets:', err);
      }
    },
    async loadMessages() {
      try {
        const userId = localStorage.getItem('userId');
        const res = await api.get(`/messages/owner/${userId}`);
        this.messages = res.data;
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    },
    parseMessage(text) {
      const result = { name: '', email: '', message: '' };
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      lines.forEach(line => {
        if (line.startsWith('Name:')) {
          result.name = line.replace('Name:', '').trim();
        } else if (line.startsWith('E-Mail:')) {
          result.email = line.replace('E-Mail:', '').trim();
        } else if (line.startsWith('Nachricht:')) {
          result.message = line.replace('Nachricht:', '').trim();
        }
      });
      return result;
    },
    replyToMessage(msg) {
      const parsed = this.parseMessage(msg.text);
      if (parsed.email) {
        window.location.href = `mailto:${parsed.email}`;
      } else {
        alert(this.$t('form.emailMissing'));
      }
    },
    async deleteMessage(messageId) {
      if (!confirm(this.$t('confirmDeleteMessage'))) return;
      try {
        await api.delete(`/messages/${messageId}`);
        this.messages = this.messages.filter(msg => msg._id !== messageId);
      } catch (err) {
        console.error('Error deleting message:', err);
        alert(this.$t('form.messageDeleteFailed'));
      }
    }
  },
  async created() {
    await this.fetchUserData();
    this.loadSavedPets();
    await this.loadMyPets();
    await this.loadMessages();
  }
};
</script>

<style scoped>
.message-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.message-actions button {
  background-color: #2563eb;
  border: none;
  padding: 6px 12px;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.message-actions .delete-btn {
  background-color: #dc2626;
}

.message-actions button:hover {
  opacity: 0.85;
}
</style>
