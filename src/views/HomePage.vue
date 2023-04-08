<template>
  <div class="container">
    <div class="main-field">{{ currentDate }}</div>
    <div class="tasks">
      <Task />
    </div>
    <AddTask class="input-text-block" />
  </div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue'
import AddTask from '@/components/AddTask.vue'
import { ref } from 'vue'

const date = new Date()

const currentDate = ref()

currentDate.value = date.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
})

console.log(currentDate.value)
</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  padding: 1rem 3rem;
}
.main-field {
  font-size: x-large;
  margin-bottom: 2rem;
}

.tasks {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-text-block {
  position: absolute; /* Position the container absolutely */
  bottom: 0; /* Position it at the bottom */
  left: 0; /* Align it to the left */
  width: 100%; /* Set the width to fill the container */
  padding: 1rem 3rem;
}
</style>
