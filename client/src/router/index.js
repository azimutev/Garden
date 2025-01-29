import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import axios from "../axios";
import { store } from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/statAverage",
      name: "statAverage",
      component: () => import("../views/statAverage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("../views/statistics.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/settings.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/SignUp.vue"),
      //коментирай долния ред за да разрешиш регистрацията.
      meta: { requiresAuth: true },
    },
        // маршрут за администраторския панел
        {
          path: "/admin/dashboard",
          name: "adminDashboard",
          component: () => import("../views/AdminDashboard.vue"),
          meta: { requiresAuth: true, requiresAdmin: true }, // Добави requiresAdmin
        },
  ],
});

// router.beforeEach(async (to, from) => {
//   try {
//     const authenticated = await is_authenticated();
//     if (to.meta.requiresAuth && !authenticated) {
//       // User is not authenticated, redirect to login
//       return { path: "/sensorsFree" };
//     }
//     if ((to.path === "/login" || to.path === "/register") && authenticated) {
//       // User is authenticated and trying to access login, redirect to dashboard
//       return { path: "/" };
//     }
//   } catch (err) {
//     alert('server is down');
//   }
// });

async function is_authenticated() {
  try {
    const response = await axios.get("profile/");
    store.updateName(response.data.username);
    return true;
  } catch (err) {
    return false;
  }
}

router.beforeEach(async (to, from) => {
  try {
    const authenticated = await is_authenticated();
    const isAdmin = store.state.user?.is_admin; // Проверка дали потребителят е администратор

    if (to.meta.requiresAuth && !authenticated) {
      // Потребителят не е логнат, пренасочване към логин
      return { path: "/login" };
    }

    if (to.meta.requiresAdmin && !isAdmin) {
      // Потребителят не е администратор, пренасочване към началната страница
      return { path: "/" };
    }

    if ((to.path === "/login" || to.path === "/register") && authenticated) {
      // Потребителят е логнат и се опитва да достъпи логин или регистрация, пренасочване към началната страница
      return { path: "/" };
    }
  } catch (err) {
    alert("Server is down");
  }
});

export default router;
