<template>
  <div class="app">
    <h1>Tasks</h1>
    <div class="tasks-list">
      <div v-for="todo in todos" :key="todo.id" class="task">
        <count-down :name="todo.title"/>
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
.app{
  display: flex;
  flex-direction: column;
}
h1{
  margin-top: 1rem;
}
.tasks-list {
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  grid-template-rows: min-content;
  gap: 1rem;
  flex-wrap: wrap;
}
@media only screen and (max-width: 900px){
  .tasks-list{
   grid-template-columns: 1fr 1fr;
  } 
}

.task {
  height: auto;
}
.tasks::-webkit-scrollbar {
  display: none;
}
</style>
