<template>
  <div class="edit-pet-view">
    <h1>{{ $t('edit') }}: {{ pet.name }}</h1>

    <form @submit.prevent="updatePet">
      <label>
        {{ $t('form.name') }}:
        <input v-model="pet.name" required />
      </label>

      <label>
        {{ $t('form.breed') }}:
        <input v-model="pet.breed" required />
      </label>

      <label>
        {{ $t('form.age') }}:
        <input type="number" v-model.number="pet.age" required />
      </label>

      <label>
        {{ $t('form.gender') }}:
        <select v-model="pet.gender">
          <option value="Male">{{ $t('form.male') }}</option>
          <option value="Female">{{ $t('form.female') }}</option>
        </select>
      </label>

      <label>
        {{ $t('form.location') }}:
        <input v-model="pet.location" />
      </label>

      <label>
        {{ $t('form.vaccinated') }}:
        <select v-model="pet.vaccinated">
          <option :value="true">{{ $t('yes') }}</option>
          <option :value="false">{{ $t('no') }}</option>
        </select>
      </label>

      <label>
        {{ $t('form.description') }}:
        <textarea v-model="pet.description" />
      </label>

      <label>
        {{ $t('form.imageUrl') }}:
        <input v-model="pet.image" />
      </label>

      <button type="submit">{{ $t('submit') }}</button>
      <router-link to="/profile">
        <button type="button">{{ $t('cancel') }}</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'EditPetView',
  data() {
    return {
      pet: {
        name: '',
        breed: '',
        age: 0,
        location: '',
        description: '',
        image: '',
        gender: 'Male',
        vaccinated: false
      }
    };
  },
  async created() {
    const petId = this.$route.params.id;
    try {
      const res = await api.get(`/pets/${petId}`);
      this.pet = res.data;

      // ✅ Korrektur: vaccinated sicherstellen als Boolean
      this.pet.vaccinated = res.data.vaccinated === true;

    } catch (err) {
      console.error('Fehler beim Laden des Tieres:', err);
      alert(this.$t('fetchError'));
    }
  },
  methods: {
    async updatePet() {
  try {
    // Vue Proxy in normales Objekt umwandeln
    const cleanPet = JSON.parse(JSON.stringify(this.pet));

    // Optional: sicherstellen, dass vaccinated ein Boolean ist
    cleanPet.vaccinated = cleanPet.vaccinated === true;

    console.log('📦 Gesendete Daten:', cleanPet);

    await api.put(`/pets/${this.pet._id}`, cleanPet);

    alert(this.$t('form.updateSuccess'));
    this.$router.push('/profile');
  } catch (err) {
    console.error('Fehler beim Speichern:', err);
    alert(this.$t('form.adFail'));
  }
}

  }
};
</script>
