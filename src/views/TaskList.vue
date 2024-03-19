<template>
  <div class="app">
    <h1>Tasks</h1>
    <div class="tasks-list">
      <div v-for="todo in todos" :key="todo.id" class="task">
        <count-down :name="todo.title" :id="todo.id"/>
        <button @click="deleteTask(todo.id)" class="btn">Delete</button>
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

});

const deleteTask = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos.value));
};
</script>

<style scoped>
.app {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.btn{
  background: red;
  border:none;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  margin-top: 10px;
  padding: 8px 10px;
}
h1 {
  margin-top: 1rem;
}

.tasks-list {
  margin: 0 auto;
  padding-right: 20px;
  display: grid;
  width: 90vw;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: min-content;
  gap: 1rem;
  max-height: 550px;
  overflow-y: auto; 
}

@media only screen and (max-width: 900px) {
  .tasks-list {
    width: 70vw;

  }
}

.task {
  height: auto;
  display: flex;
  flex-direction: column;
}
</style>
