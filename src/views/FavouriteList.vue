<template>
    <div class="container">
      <div>
        <div class="main-field">{{ currentDate }}</div>
        <div class="tasks-container">
          <div class="tasks" v-for="todo in todos" :key="todo.id">
            <Task :name="todo.title" :discription="todo.content" :done="todo.done" :id="todo.id" :favourite="todo.favourite" @star="starredTask"/>
          </div>
        </div>
      </div>
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
  
          </div>
          <input type="text" v-model="todoTitle" class="title-text" />
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
              border-bottom: 1px solid gray;"
            />
            <label for="value">Description</label>
          </p>
      </Sidebar> 
    </div>
  </template>
  
  <script setup lang="ts">
  import Task from '@/components/Task.vue'
  import { ref, onMounted} from 'vue'
  
  const date = new Date()
  
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
    for (let todo of todos.value){
      console.log(todo.id, todo.favourite)
    }
  }

  const savedTodos = ref(localStorage.getItem('todos'))
  
  onMounted(() => {  
    if (savedTodos.value != null) {
      todos.value = JSON.parse(savedTodos.value)
    } else {
      todos.value = []
    }
  })
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-content: flex-end;
    min-height: 100vh;
    padding: 0 3rem;
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
  