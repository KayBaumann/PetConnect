<!-- src/views/AboutView.vue -->
<template>
  <div class="about-view">
    <div class="about-header">
      <h1>{{ $t('aboutTitle') }}</h1>
      <p>We are three passionate students working together to create PetConnect, a platform to connect people with their future furry friends. Our mission is to simplify the pet adoption process and make it accessible to everyone, while ensuring a delightful experience for both adopters and pets.</p>
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
          name: 'Alice Johnson',
          role: 'Frontend Developer',
          description: 'Alice is responsible for creating the user interface and ensuring a seamless user experience.',
          bio: 'Alice has a strong background in web development and specializes in building responsive and accessible designs. She is passionate about creating intuitive interfaces that make technology easy to use for everyone. In her free time, Alice enjoys hiking and volunteering at local animal shelters.',
          image: '/src/assets/flynn_background.jpg'
        },
        {
          id: 2,
          name: 'Bob Smith',
          role: 'Backend Developer',
          description: 'Bob handles the server-side logic and ensures the application runs smoothly.',
          bio: 'Bob is an experienced backend developer with expertise in building scalable and secure systems. He enjoys solving complex problems and optimizing performance to deliver a seamless experience for users. Outside of coding, Bob loves playing chess and exploring new cuisines.',
          image: '/src/assets/flynn_background.jpg'
        },
        {
          id: 3,
          name: 'Charlie Brown',
          role: 'UI/UX Designer',
          description: 'Charlie designs intuitive and visually appealing interfaces for the platform.',
          bio: 'Charlie has a keen eye for design and a deep understanding of user behavior. He focuses on creating designs that are not only beautiful but also functional, ensuring that users have a delightful experience. Charlie is also an avid photographer and enjoys capturing moments in nature.',
          image: '/src/assets/flynn_background.jpg'
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
  background-color: #f3f4f6; /* Light gray */
  color: #1f2937; /* Dark gray text */
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.about-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.about-header p {
  font-size: 1.2rem;
  color: #6b7280; /* Gray text */
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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
}

.student-text p {
  font-size: 1.1rem;
  color: #6b7280; /* Gray text */
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
}
</style>
