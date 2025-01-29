// store.js
import { reactive } from 'vue';

export const store = reactive({
  user: null, // Тук ще съхраняваме цялата информация за потребителя
  hasLogin: false, // Флаг, който показва дали потребителят е логнат

  // Метод за актуализиране на потребителската информация
  updateUser(userData) {
    this.user = userData;
    this.hasLogin = !!userData; // Ако userData е null, hasLogin става false
  },

  // Метод за проверка дали потребителят е администратор
  isAdmin() {
    return this.user?.is_admin || false;
  },

  // Метод за изчистване на потребителската информация (при logout)
  clearUser() {
    this.user = null;
    this.hasLogin = false;
  }
});