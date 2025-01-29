<!-- src/components/AdminDashboard.vue -->
<template>
  <div>
    <h1>Admin Dashboard</h1>
    <!-- Тук можеш да добавиш функционалности за администратора -->
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  mounted() {
    // Проверка дали потребителят е администратор
    if (!this.$store.state.user || !this.$store.state.user.is_admin) {
      this.$router.push('/');
    }
  }
};
</script>