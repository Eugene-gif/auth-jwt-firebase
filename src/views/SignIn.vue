<script setup>
  import { ref } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useRouter } from "vue-router";
  import Button from "primevue/button";
  import InputText from "primevue/inputtext";
  import Message from "primevue/message";
  import Loader from "@/components/Loader.vue";

  const router = useRouter();
  const authStore = useAuthStore();

  const email = ref("");
  const password = ref("");

  const signin = async () => {
    await authStore.auth({
      email: email.value,
      password: password.value,
    }, 'signin');
    router.push('/cars');
  };
</script>

<template>
  <div class="signup">
    <h2>Sign In</h2>
    <form class="flex flex-column gap-3">
      <Message
        v-if="authStore.error"
        severity="warn"
      >
        {{ authStore.error }}
      </Message>
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText
          v-model="email"
          type="email"
          placeholder="Your email"
        />
      </div>

      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-at"></i>
        </span>
        <InputText
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <Loader v-if="authStore.loader" />
      <div
        v-else
        class="flex flex-column gap-3"
      >
        <Button
          label="Sign In"
          @click="signin"
        />
        <span>
          Register
          <router-link to="/signup">Sign Up</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .signup {
    max-width: 600px;
    box-shadow: 0 0 5px 0;
    border-radius: 10px;
    padding: 20px;
    margin: 15vh auto 0 auto;
    h2 {
      text-align: center;
    }
  }
</style>
