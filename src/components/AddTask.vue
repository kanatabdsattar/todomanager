<template>
  <div>
    <span class="p-input-icon-left input-task">
      <i class="pi pi-plus" aria-disabled="false" @click="addTask" />
      <InputText
        v-model="taskValue"
        placeholder="Add task"
        class="input-text__text"
        @keyup.enter="addTaskByEnter()"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const emit = defineEmits(['add'])

const taskValue = ref('')

interface Todo {
  title: string
  content: string
  done: boolean
  important: boolean
  deadlineAt: Date
}

const addTaskByEnter = () => {
  if (taskValue.value === '' || taskValue.value.trim() === '') {
    return
  }

  let newTodo: Todo = {
    title: taskValue.value,
    content: 'Play Guitar',
    done: false,
    important: false,
    deadlineAt: new Date('2002-02-02')
  }

  console.log('emitted text')
  emit('add', newTodo)
  taskValue.value = ''
}

const addTask = () => {
  console.log('Pressen + sign')
}
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
  /* max-width: 1280px; */
}

::placeholder {
  color: white;
}

.add-button {
  cursor: pointer;
}
</style>
