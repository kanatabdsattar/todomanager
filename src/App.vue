<template>
  <div class="app">
    <side-bar/>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
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
