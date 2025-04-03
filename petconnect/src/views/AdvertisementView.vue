<template>
  <div class="advertisement-view">
    <div v-if="advertisement" class="advertisement-container">
      <div class="advertisement-details">
        <h1 class="advertisement-title">{{ advertisement.title }}</h1>
        <p class="advertisement-description">{{ advertisement.description }}</p>
        <div class="advertisement-bio">
          <h2>Biography</h2>
          <ul>
            <li>
              <strong>Age:</strong> {{ advertisement.bio.age }}
            </li>
            <li>
              <strong>Breed:</strong> {{ advertisement.bio.breed }}
            </li>
            <li>
              <strong>Personality:</strong> {{ advertisement.bio.personality }}
            </li>
            <li>
              <strong>Health:</strong> {{ advertisement.bio.health }}
            </li>
            <li>
              <strong>Ideal Home:</strong> {{ advertisement.bio.idealHome }}
            </li>
          </ul>
        </div>
        <div class="advertisement-contact">
          <h2>Contact the Owner</h2>
          <p><strong>Name:</strong> {{ advertisement.contact.name }}</p>
          <p><strong>Email:</strong> <a :href="`mailto:${advertisement.contact.email}`">{{ advertisement.contact.email }}</a></p>
          <p><strong>Phone:</strong> <a :href="`tel:${advertisement.contact.phone}`">{{ advertisement.contact.phone }}</a></p>
        </div>
      </div>
      <div class="advertisement-image-container">
        <img :src="advertisement.image" :alt="advertisement.title" class="advertisement-image" />
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading advertisement...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvertisementView',
  props: ['id'], // Receive the advertisement ID as a prop
  data() {
    return {
      advertisement: null, // Store the advertisement details
    };
  },
  created() {
    this.fetchAdvertisement();
  },
  methods: {
    fetchAdvertisement() {
      // Simulate fetching advertisement data based on the ID
      const advertisements = [
        {
          id: '1',
          title: 'Adopt Bella',
          description: 'Bella is a friendly Labrador looking for a loving home.',
          bio: {
            age: '3 years old',
            breed: 'Labrador Retriever',
            personality: 'Friendly, playful, and great with kids.',
            health: 'Fully vaccinated and trained in basic commands.',
            idealHome: 'A family who can give her love and attention.',
          },
          contact: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '+1234567890',
          },
          image: '/src/assets/dog1.png',
        },
        {
          id: '2',
          title: 'Adopt Max',
          description: 'Max is a playful Golden Retriever who loves adventures.',
          bio: {
            age: '2 years old',
            breed: 'Golden Retriever',
            personality: 'Energetic, adventurous, and loves meeting new people.',
            health: 'Neutered, vaccinated, and healthy.',
            idealHome: 'An active family who enjoys outdoor activities.',
          },
          contact: {
            name: 'Jane Smith',
            email: 'janesmith@example.com',
            phone: '+9876543210',
          },
          image: '/src/assets/dog2.jpg',
        },
        {
          id: '3',
          title: 'Adopt Luna',
          description: 'Luna is a sweet cat who enjoys cuddles and naps.',
          bio: {
            age: '4 years old',
            breed: 'Domestic Shorthair',
            personality: 'Calm, affectionate, and loves sunny spots.',
            health: 'Spayed, litter-trained, and up-to-date on vaccinations.',
            idealHome: 'A quiet home where she can relax and be loved.',
          },
          contact: {
            name: 'Emily Johnson',
            email: 'emilyjohnson@example.com',
            phone: '+1122334455',
          },
          image: '/src/assets/cat1.jpg',
        },
      ];

      // Find the advertisement by ID
      this.advertisement = advertisements.find(
        (ad) => ad.id === this.id
      );
    },
  },
};
</script>

<style scoped>
.advertisement-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.advertisement-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1000px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.advertisement-details {
  flex: 2;
  padding: 20px;
  text-align: center;
}

.advertisement-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1f2937;
}

.advertisement-description {
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
}

.advertisement-bio {
  text-align: left;
  margin-top: 20px;
}

.advertisement-bio h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1f2937;
}

.advertisement-bio ul {
  list-style-type: disc;
  padding-left: 20px;
}

.advertisement-bio li {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 10px;
}

.advertisement-contact {
  text-align: left;
  margin-top: 20px;
}

.advertisement-contact h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1f2937;
}

.advertisement-contact p {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 10px;
}

.advertisement-contact a {
  color: #2563eb;
  text-decoration: none;
}

.advertisement-contact a:hover {
  text-decoration: underline;
}

.advertisement-image-container {
  flex: 1;
  max-width: 400px;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.advertisement-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #6b7280;
}
</style>
