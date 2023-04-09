<template>
  <div class="container">
    <div>
      <div class="main-field">{{ currentDate }}</div>
      <div class="tasks">
        <Task />
      </div>
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
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 1rem 3rem;
  z-index: 1;
  width: 100%;
}
.main-field {
  font-size: x-large;
  margin-bottom: 2rem;
}

.tasks {
  display: flex;
  flex-direction: column;
}

.input-text-block {
  /* position: absolute;  */
  left: 0; /* Align it to the left */
  width: 100%; /* Set the width to fill the container */
}
</style>
