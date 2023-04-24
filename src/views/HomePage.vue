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
          <slot name="header"><input type="text" v-model="todoTitle" class="title-text" /></slot>
          
        </div>
        
        <p class="p-float-label data">
          <Textarea
            v-model="todoContent"
            rows="1"
            cols="43"
            autoResize
            aria-describedby="text-error"
            placeholder=" Project Info"
            style="background-color: var(--color-background-sidebar);
            border: none;
            outline: none;
            border-bottom: 1px solid gray;
            color: white;
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
import Button from 'primevue/button';
import { ref, onMounted, computed, watch } from 'vue'

const date = new Date()
const currentId = ref()
const todoTitle = ref('')
const todoContent = ref('')
const todoDone = ref(false)
const todoFavourite = ref(false)
const todoDeadline = ref()
const editingId = ref()

const currentDate = ref()
const visibleRight = ref(false)
const editingId = ref()

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
      editingId.value = id;
    }
  }
}

const addTodo = (taskName: string) => {
  if (taskName.trim() === '') {
    return
  }

  console.log('Added new todo!')

  todoTitle.value = taskName.trim()

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

const editTodo = () => {

  console.log('Edit new todo!')

  let newTodo: Todo = {
    id: editingId.value,
    title: todoTitle.value,
    content: todoContent.value,
    done: todoDone.value,
    favourite: todoFavourite.value,
    deadlineAt: todoDeadline.value
  }

  for (let todo of todos.value){
    if (todo.id === editingId.value){
      todo = newTodo;
      localStorage.setItem('currentId', JSON.stringify(todos))

    }
  }
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
const getData = () => {
  console.log(deadline.value.toLocaleDateString());
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100vh;
  padding: 1% 3rem;
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
.data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10%;
  gap: 1rem;
}

.input-text-block {
  /* position: absolute;  */
  margin-bottom: 1rem;
  left: 0; /* Align it to the left */
  width: 100%; /* Set the width to fill the container */
}

.right-sidebar .title {
  background-color: var(--color-background-sidebar);
  outline: none;
  box-shadow: none;
  color: white;
  font-size: large;
}

.right-sidebar .title-text {
  background-color: var(--color-secondary-sidebar);
  border: none;
  outline: none;
  box-shadow: none;
  color: white;
  padding: 1rem;
  font-size: 32px;
  margin-bottom: 2rem;
  padding-left: 1rem;
  max-width: 100%;
  border-radius: 0.5rem;
  box-shadow: 1px;
}
.sidebar-btn{
  display: flex;
  justify-content: space-between;
  align-self: end;
  padding: 0 2rem;
  margin-bottom: 10rem;
}
</style>
