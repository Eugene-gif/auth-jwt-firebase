<script setup>
  import { RouterView } from "vue-router";
</script>

<template>
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
</style>
