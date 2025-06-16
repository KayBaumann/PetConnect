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
  data() {
    return {
      students: [
        {
          id: 1,
          name: 'Alice Johnson',
          role: 'about.alice.role',
          description: 'about.alice.description',
          bio: 'about.alice.bio',
          image: '/src/assets/flynn_background.jpg'
        },
        {
          id: 2,
          name: 'Bob Smith',
          role: 'about.bob.role',
          description: 'about.bob.description',
          bio: 'about.bob.bio',
          image: '/src/assets/flynn_background.jpg'
        },
        {
          id: 3,
          name: 'Charlie Brown',
          role: 'about.charlie.role',
          description: 'about.charlie.description',
          bio: 'about.charlie.bio',
          image: '/src/assets/flynn_background.jpg'
        }
      ]
    };
  }
};
</script>


