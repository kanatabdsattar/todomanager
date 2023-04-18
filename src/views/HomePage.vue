<template>
  <div class="container">
    <div>
      <div class="main-field">{{ currentDate }}</div>
      <div class="tasks-container">
        <div class="tasks" v-for="todo in todos" :key="todo.id">
          <Task :name="todo.title" :discription="todo.content" :done="todo.done" :id="todo.id" />
        </div>
      </div>
    </div>
    <AddTask @add="addTodo" class="input-text-block" />
    <Sidebar
      v-model:visible="visibleRight"
      position="right"
      class="right-sidebar"
      style="background-color: var(--color-background-sidebar); color: white"
    >
      <input type="text" v-model="todoTitle" class="title" />
      <p class="p-float-label">
        <Textarea
          id="value"
          v-model="todoContent"
          :class="{ 'p-invalid': errorMessage }"
          rows="4"
          cols="30"
          aria-describedby="text-error"
        />
        <label for="value">Description</label>
      </p>
    </Sidebar>
  </div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue'
import AddTask from '@/components/AddTask.vue'
import { ref, onMounted, computed, watch } from 'vue'

const date = new Date()
const currentId = ref()
const todoTitle = ref('')
const todoContent = ref('')
const todoDone = ref(false)
const todoImportant = ref(false)
const todoDeadline = ref()

const currentDate = ref()
const visibleRight = ref(false)

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

const addTodo = (taskName: string) => {
  if (taskName.trim() === '') {
    return
  }

  visibleRight.value = true

  console.log('Added new todo!')

  todoTitle.value = taskName

  let newTodo: Todo = {
    id: currentId.value,
    title: todoTitle.value,
    content: todoContent.value,
    done: todoDone.value,
    important: todoImportant.value,
    deadlineAt: new Date(todoDeadline.value)
  }

  currentId.value++
  todos.value.push(newTodo)
}

const removeTodo = (todo: Todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

const removeAllTodo = () => {
  todos.value.length = 0
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
  padding: 1rem 3rem 0 3rem;
  z-index: 1;
  width: 100%;
}
.main-field {
  font-size: x-large;
  margin-bottom: 2rem;
}

.tasks-container {
  height: 78vh;
  overflow-y: auto;
}

.tasks-container::-webkit-scrollbar {
  display: none;
}

.tasks {
  display: flex;
  flex-direction: column;
}

.input-text-block {
  /* position: absolute;  */
  margin-bottom: 1rem;
  left: 0; /* Align it to the left */
  width: 100%; /* Set the width to fill the container */
}

.right-sidebar .title {
  background-color: var(--color-background-sidebar);
  border: none;
  outline: none;
  box-shadow: none;
  border-bottom: 1px solid gray;
  color: white;
  padding: 1rem;
  font-size: large;
  margin-bottom: 1rem;
}
</style>
