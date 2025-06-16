<template>
  <div :class="['about-view', { 'dark-mode': isDarkMode }]">
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
          <p class="student-role">{{ student.role }}</p>
          <p class="student-description">{{ student.description }}</p>
          <p class="student-bio">{{ student.bio }}</p>
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
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      students: [
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
      ]
    };
  }
};
</script>


<style scoped>
.about-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f3f4f6;
  color: #1a202c;
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2563eb;
}

.about-header p {
  font-size: 1.2rem;
  color: #374151;
}

.students-section {
  width: 100%;
  max-width: 1100px;
}

.student-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 40px;
  padding: 28px 20px;
  background: #fff;
  color: #1a202c;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: background 0.3s, color 0.3s;
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
  color: #2563eb;
}

.student-text p {
  font-size: 1.1rem;
  color: #374151;
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
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid var(--image-border-color, #4a5568); 
  border: 2px solid #cbd5e1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}

/* Dark mode styles */
.about-view.dark-mode {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: #f7fafc;
}

.about-view.dark-mode .about-header h1 {
  color: #63b3ed;
}

.about-view.dark-mode .about-header p {
  color: #a0aec0;
}

.about-view.dark-mode .student-section {
  background: rgba(45, 55, 72, 0.97);
  color: #f7fafc;
  box-shadow: 0 4px 16px rgba(99,179,237,0.10);
}

.about-view.dark-mode .student-text h2 {
  color: #63b3ed;
}

.about-view.dark-mode .student-text p {
  color: #e2e8f0;
}

.about-view.dark-mode .student-image {
  border: 2px solid #4a5568;
}
</style>