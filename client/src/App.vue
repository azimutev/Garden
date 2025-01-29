<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import { store } from "./store";

const router = useRouter();
const route = useRoute();
const logout = async () => {
  localStorage.clear();
  store.updateHasLogin(false);
  store.updateName(null);
  router.push("/login");
};

function checkForLogin() {
  return localStorage.getItem("token") != null;
}
</script>

<template>
  <header class="header">
    <div class="header-title">
      <h2>Smart garden</h2>
    </div>
    <nav class="header-nav">
      <RouterLink
          class="nav-link"
          :class="{ active: route.name === 'home' }"
          to="/"
          >Home</RouterLink
        >
        <RouterLink
          v-if="checkForLogin()"
          class="nav-link"
          :class="{ active: route.name === 'statAverage' }"
          to="/statAverage"
          >Statistics Average</RouterLink
        >  
        <RouterLink
          v-if="checkForLogin()"
          class="nav-link"
          :class="{ active: route.name === 'statistics' }"
          to="/statistics"
          >Statistics</RouterLink
        >        
        <RouterLink
          v-if="checkForLogin()"
          class="nav-link"
          :class="{ active: route.name === 'settings' }"
          to="/settings"
          >Settings</RouterLink
        >
        <a v-if="checkForLogin()" @click="logout" class="logout nav-link">Logout</a>
        <RouterLink
        v-else
          class="nav-link"
          :class="{ active: route.name === 'login' }"
          to="/login"
          >Login</RouterLink
        >
    </nav>
  </header>

  <router-view v-slot="{ Component}">
    <!-- Use any custom transition and  to `fade` -->
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  box-sizing: border-box;
  padding: 1rem 4rem;
  background-color: #184c52;
  color: #fff;

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.header-title {
  flex: 1;
}

.header-nav {
  display: flex;
  gap: 12px;
}

.nav-link {
  text-decoration: none;
  color: #fff;
}

.nav-link:hover {
  color: rgb(0, 213, 142);
}

.active {
  border-bottom: 1px solid rgb(0, 213, 142);
  padding-bottom: 5px;
  color: rgb(0, 213, 142);
  
}

.logout {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
