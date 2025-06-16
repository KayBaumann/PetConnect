<template>
  <div class="about-view">
    <div class="about-header">
      <h1>{{ $t('about.title') }}</h1>
      <p>{{ $t('about.description') }}</p>
    </div>

    <div class="students-section">
      <div
        class="student-section"
        v-for="(student, index) in students"
        :key="student.id"
        :class="{ reverse: index % 2 !== 0 }"
      >
        <div class="student-text">
          <h2 class="student-name">{{ student.name }}</h2>
          <p class="student-role">{{ $t(student.role) }}</p>
          <p class="student-description">{{ $t(student.description) }}</p>
          <p class="student-bio">{{ $t(student.bio) }}</p>
        </div>
        <div class="student-image-container">
          <img :src="student.image" :alt="student.name" class="student-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  computed: {
    students() {
      return [
        {
          id: 1,
          name: 'Alice Johnson',
          role: this.$t('about.alice.role'),
          description: this.$t('about.alice.description'),
          bio: this.$t('about.alice.bio'),
          image: '/src/assets/frontend_Guy.png'
        },
        {
          id: 2,
          name: 'Bob Smith',
          role: this.$t('about.bob.role'),
          description: this.$t('about.bob.description'),
          bio: this.$t('about.bob.bio'),
          image: '/src/assets/Backend_Guy.png'
        },
        {
          id: 3,
          name: 'Charlie Brown',
          role: this.$t('about.charlie.role'),
          description: this.$t('about.charlie.description'),
          bio: this.$t('about.charlie.bio'),
          image: '/src/assets/Designer_Guy.png'
        }
      ];
    }
  }
};
</script>

<style scoped>
.about-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: var(--background-color, #1a202c); /* Dark mode background */
  color: var(--text-color, #f7fafc); /* Default text color for dark mode */
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--header-color, #63b3ed); /* Adjusted header color for dark mode */
}

.about-header p {
  font-size: 1.2rem;
  color: var(--header-text-color, #a0aec0); /* Adjusted text color */
}

.students-section {
  width: 100%;
}

.student-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px;
  background: var(--card-background, rgba(45, 55, 72, 0.95)); /* Darker card background */
  color: var(--card-text-color, #edf2f7); /* Text color for card */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Adjusted shadow for dark mode */
}

.student-section.reverse {
  flex-direction: row-reverse;
}

.student-text {
  flex: 1;
  padding: 20px;
}

.student-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--student-name-color, #63b3ed); /* Adjusted student name color */
}

.student-text p {
  font-size: 1.1rem;
  color: var(--student-text-color, #e2e8f0); /* Adjusted text color */
  margin-bottom: 10px;
  line-height: 1.6;
}

.student-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.student-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--image-border-color, #4a5568); 
}
</style>