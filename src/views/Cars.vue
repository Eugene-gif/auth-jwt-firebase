<script setup>
import { ref, onMounted } from 'vue'
// import { useAuthStore } from '@/stores/auth'
// import axios from 'axios'
import axiosApiInstance from '@/api.js'


import Card from 'primevue/card'
import Loader from '@/components/Loader.vue';

// const authStore = useAuthStore();

const cars =  ref();
const showLoader = ref(false);
// https://auth-jwt-aa869-default-rtdb.europe-west1.firebasedatabase.app/

const getAllCars = async () => {
  showLoader.value = true;
  try {
    const response = await axiosApiInstance.get(`https://auth-jwt-aa869-default-rtdb.europe-west1.firebasedatabase.app/cars.json`);
    cars.value = response.data
    console.log(response.data)
  } catch (err) {
    console.log(err.response)
  } finally {
    showLoader.value = false;
  }
}

onMounted(async () => await getAllCars());
</script>

<template>
  <div class="cars">
    <h2>Cars</h2>
    <Loader v-if="showLoader"/>
    <div v-else class="flex flex-column gap-3">
      <Card v-for="(car, i) in cars" :key="i">
        <template #title>{{ car.name }}</template>
        <template #subtitle>{{ car.type }}</template>
      </Card>
    </div>

  </div>
</template>

<style lang="scss" scoped></style>
