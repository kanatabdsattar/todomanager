<template>
  <div class="container">
    <div>
      <div class="main-field">{{ currentDate }}</div>
      <div class="tasks" v-for="todo in todos" :key="todo.id">
        <Task :name="todo.title" :discription="todo.content" :done="todo.done" />
      </div>
    </div>
    <AddTask @add="addTodo" class="input-text-block" />
  </div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue'
import AddTask from '@/components/AddTask.vue'
import { ref, onMounted, computed, watch } from 'vue'

const date = new Date()
const currentId = ref()

const currentDate = ref()

currentDate.value = date.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
})

interface Todo {
  id: number
  title: string
  content: string
  done: boolean
  important: boolean
  deadlineAt: Date
}

const todos = ref<Todo[]>([])

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.deadlineAt.getTime() - a.deadlineAt.getTime()
  })
)

const addTodo = (todoFromAddTask: Todo) => {
  if (todoFromAddTask.content.trim() === '' || todoFromAddTask.title.trim() === '') {
    return
  }

  console.log('Added new todo!')

  let newTodo: Todo = {
    id: currentId.value,
    title: todoFromAddTask.title,
    content: todoFromAddTask.content,
    done: todoFromAddTask.done,
    important: todoFromAddTask.important,
    deadlineAt: new Date(todoFromAddTask.deadlineAt)
  }

  currentId.value++
  todos.value.push(newTodo)
}

const removeTodo = (todo: Todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

watch(currentId, (newVal) => {
  localStorage.setItem('currentId', JSON.stringify(newVal))
})

watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  {
    deep: true
  }
)

const savedTodos = ref(localStorage.getItem('todos'))

onMounted(() => {
  currentId.value = parseInt(JSON.parse(localStorage.getItem('currentId') || '1'))

  if (savedTodos.value != null) {
    todos.value = JSON.parse(savedTodos.value)
  } else {
    todos.value = []
  }
  // name.value = localStorage.getItem('name')
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
