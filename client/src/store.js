import { reactive } from 'vue';

export const store = reactive({
  user: null,
  updateUser(userData) {
    this.user = userData;
  },
  isAdmin() {
    return this.user?.is_admin || false;
  },
});