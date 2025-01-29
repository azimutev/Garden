<!-- src/views/AdminDashboard.vue -->
<template>
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel!</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminDashboard",
    mounted() {
      // Проверка дали потребителят е администратор
      if (!this.$store.state.user || !this.$store.state.user.is_admin) {
        this.$router.push("/"); // Пренасочване към началната страница, ако потребителят не е администратор
      }
    },
  };
  </script>