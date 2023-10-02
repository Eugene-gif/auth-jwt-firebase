<script setup>
  import { computed } from "vue";
  import { useRouter, RouterView, RouterLink } from "vue-router";
  import { useAuthStore } from "./stores/auth";

  const router = useRouter();
  const authStore = useAuthStore();

  const token = computed(() => authStore.userInfo.token);

  const checkUser = () => {
    const tokens = JSON.parse(localStorage.getItem("userTokens"));

    if (tokens) {
      authStore.userInfo.token = tokens.token;
      authStore.userInfo.refreshToken = tokens.refreshToken;
    }

    console.log(authStore.userInfo);
  };

  const logout = () => {
    authStore.logout();
    localStorage.removeItem("userTokens");
    router.push("/signin");
  };

  checkUser();
</script>

<template>
  <div class="menu">
    <router-link to="/">Home</router-link>
    <router-link
      v-if="!token"
      to="/signin"
      >Sign In</router-link
    >
    <router-link
      v-if="!token"
      to="/signup"
      >Register</router-link
    >
    <router-link
      v-if="token"
      to="/cars"
      >Cars</router-link
    >
    <router-link
      v-if="token"
      to="/signin"
      @click.prevent="logout"
      >Logout</router-link
    >
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
  .container {
    max-width: 900px;
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif;
  }

  .menu {
    display: flex;
    gap: 20px;

    a {
      text-decoration: none;
      color: #000;
      font-size: 20px;
      transition: all 0.3;
      &:hover {
        filter: drop-shadow(0 0 5px orange);
      }
    }

    .router-link-active {
      color: orange;
      pointer-events: none;
    }
  }
</style>
