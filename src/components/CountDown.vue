<template>
  <div id="time">
    <h3>{{ name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRef } from 'vue'
const props = defineProps(['name', 'id'])

interface Todo {
  id: number
  title: string
  content: string
  done: boolean
  favourite: boolean
  deadlineAt: Date
}
const todos = ref<Todo[]>([])

</script>

<style scoped>
#time {
  background-color: white;
  border-radius: 6px;
  text-align: start;
  display: flex;
  flex-direction: column;
  padding: 10px ;
  width: 100%;
}
</style>
