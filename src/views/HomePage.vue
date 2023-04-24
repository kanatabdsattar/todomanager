<template>
  <div class="container">
    <div>
      <div class="main-field">{{ currentDate }}</div>
      <div class="tasks-container">
        <div class="tasks" v-for="todo in todos" :key="todo.id">
          <Task 
          v-if="!todo.done"
          :name="todo.title" 
          :discription="todo.content" 
          :done="todo.done" 
          :id="todo.id" 
          :favourite="todo.favourite" 
          @star="starredTask" 
          @done="doneTask"
          @right-sidebar="rightSidebarEffect"/>
        </div>
      </div>
    </div>
    <AddTask @add="addTodo" class="input-text-block" />
    <Sidebar
        v-model:visible="visibleRight"
        position="right"
        class="right-sidebar"
        style="
        background-color: var(--color-background-sidebar); 
        color: white; 
        border-radius: 0.5rem;
        width: 30%;
        height: 95%;
        margin-right: 1rem;"
      >
        <div class="title">
          <input type="text" v-model="todoTitle" class="title-text" />
        </div>
        
        <p class="p-float-label">
          <Textarea
            id="value"
            v-model="todoContent"
            rows="2"
            cols="43"
            aria-describedby="text-error"
            style="background-color: var(--color-background-sidebar);
            border: none;
            outline: none;
            border-bottom: 1px solid gray;
          "
        />
        <label for="value">Description</label>
      </p>
      <span class="p-float-label date">
        <Calendar v-model="deadline" inputId="birth_date" />
        <label for="birth_date">Deadline</label>
      </span>
    </Sidebar>
  </div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue'
import AddTask from '@/components/AddTask.vue'
import Calendar from 'primevue/calendar'
import { ref, onMounted, computed, watch } from 'vue'

const date = new Date()
const currentId = ref()
const todoTitle = ref('')
const todoContent = ref('')
const todoDone = ref(false)
const todoFavourite = ref(false)
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
  favourite: boolean
  deadlineAt: Date
}

const todos = ref<Todo[]>([])

const starredTask = (id: number) => {
  for (let todo of todos.value){
    if (todo.id === id){
      todo.favourite = !todo.favourite;
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }
  
}

const doneTask = (id: number) => {
  for (let todo of todos.value){
    if (todo.id === id){
      todo.done = !todo.done;
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }
  for (let todo of todos.value){
    console.log(todo.id, todo.done)
  }
}

const rightSidebarEffect = (id: number) => {
  for (let todo of todos.value){
    if (todo.id === id){
      visibleRight.value = !visibleRight.value;
      todoTitle.value = todo.title;
      todoContent.value = todo.content;
      todoDeadline.value = todo.deadlineAt;
      todoFavourite.value = todo.favourite;
      todoDone.value = todo.done;
    }
  }
}

const addTodo = (taskName: string) => {
  if (taskName.trim() === '') {
    return
  }

  console.log('Added new todo!')

  todoTitle.value = taskName

  let newTodo: Todo = {
    id: currentId.value,
    title: todoTitle.value,
    content: "",
    done: false,
    favourite: false,
    deadlineAt: new Date()
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

const deadline = ref();
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100vh;
  padding: 0 3rem;
  z-index: 1;
  width: 100%;
}
.date{
  margin-top: 2rem;
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
  color: white;
  padding: 1rem;
  font-size: large;
  margin-bottom: 1rem;
}

.right-sidebar .title-text {
  background-color: var(--color-background-sidebar);
  border: none;
  outline: none;
  box-shadow: none;
  color: white;
  padding: 1rem;
  font-size: large;
  margin-bottom: 2rem;
}
</style>
