<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, admin!</p>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  mounted() {
    if (!this.$store.state.user || !this.$store.state.user.is_admin) {
      this.$router.push('/');
    }
  },
};
</script>