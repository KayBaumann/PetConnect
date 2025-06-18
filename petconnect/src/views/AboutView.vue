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
      students: [
        {
          id: 1,
          name: 'Timon Soom',
          role: this.$t('about.alice.role'),
          description: this.$t('about.alice.description'),
          bio: this.$t('about.alice.bio'),
          image: '/src/assets/frontend_Guy.png'
        },
        {
          id: 2,
          name: 'Kay Baumann',
          role: this.$t('about.bob.role'),
          description: this.$t('about.bob.description'),
          bio: this.$t('about.bob.bio'),
          image: '/src/assets/Backend_Guy.png'
        },
        {
          id: 3,
          name: 'Sarujan Uthayachandran',
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

