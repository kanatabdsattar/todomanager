<template>
  <div class="app">
    <div class="tasks">
      <div v-for="todo in todos" :key="todo.id">
        <count-down :name="todo.title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CountDown from '@/components/CountDown.vue'
import { ref, onMounted } from 'vue'

interface Todo {
  id: number
  title: string
  content: string
  done: boolean
  important: boolean
  deadlineAt: Date
}
const currentId = ref()
const todos = ref<Todo[]>([])

const savedTodos = ref(localStorage.getItem('todos'))

onMounted(() => {
  currentId.value = parseInt(JSON.parse(localStorage.getItem('currentId') || '1'))

  if (savedTodos.value != null) {
    todos.value = JSON.parse(savedTodos.value)
  } else {
    todos.value = []
  }

  console.log(todos)
})
</script>

<style scoped>
.app {
  width: 100%;
  display: flex;
}
.tasks {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  height: 90%;
  overflow-y: auto;

}
.tasks::-webkit-scrollbar {
  display: none;
}
</style>
