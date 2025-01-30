import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { store } from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('../views/AdminDashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/SignUp.vue'),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const isAuthenticated = await checkAuth();
  const isAdmin = store.isAdmin();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { path: '/login' };
  }

  if (to.meta.requiresAdmin && !isAdmin) {
    return { path: '/' };
  }
});

async function checkAuth() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const response = await fetch('/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const userData = await response.json();
      store.updateUser(userData);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Authentication check failed', error);
    return false;
  }
}

export default router;