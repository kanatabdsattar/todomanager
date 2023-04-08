<template>
  <div>
    <span class="p-input-icon-left input-task">
      <i class="pi pi-plus" @click="addTask" style="cursor: pointer" />
      <InputText v-model="taskVakue" placeholder="Add task" class="input-text__text" />
    </span>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const taskVakue = ref('')

const addTask = () => {}
</script>

<style scoped>
.input-task {
  color: white;
  display: flex;
}

.input-text__text {
  background-color: rgba(54, 54, 54, 0.8);
  color: white;
  width: 100%;
  max-width: 1280px;
}
</style>
