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
import { ref, onMounted, computed, watch } from 'vue'

const date = new Date()

const currentDate = ref()

currentDate.value = date.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
})

interface Todo {
  title: string
  content: string
  done: boolean
  important: boolean
  deadlineAt: Date
}

const todos = ref<Todo[]>([])
const name = ref('')
const input_content = ref('')
const deadlineTime = ref('')

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.deadlineAt.getTime() - a.deadlineAt.getTime()
  })
)

const addTodo = () => {
  if (input_content.value.trim() === '' || name.value.trim() === '') {
    return
  }

  let newTodo: Todo = {
    title: name.value,
    content: input_content.value,
    done: false,
    important: false,
    deadlineAt: new Date(deadlineTime.value)
  }

  todos.value.push(newTodo)
  input_content.value = ''
  name.value = ''
  deadlineTime.value = ''
}

const removeTodo = (todo: Todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  {
    deep: true
  }
)

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

const savedTodos = ref(localStorage.getItem('todos'))

onMounted(() => {
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
