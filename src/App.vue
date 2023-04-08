<template>
  <side-bar/>
  <div>
    <HomePage />
  </div>
</template>

<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
import HomePage from './views/HomePage.vue'
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.app{
  display: flex;
}
</style>   
