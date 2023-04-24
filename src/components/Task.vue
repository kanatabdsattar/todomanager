<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button class="task-background" @click="emit('right-sidebar', id)">
    <Done :done="props.done" :id="props.id" @done="emit('done', id)"/>
    <div class="project-info">
      <p class="project-info__name" >{{ name }}</p>
      <p class="project-info__discription">{{ discription }}</p>
    </div>
    <p class="project-info__deadline">Time left to end task is: {{ timeLeft }}</p>
    <Star :favourite="props.favourite" @done-favourite="emit('star', id)" @click.stop/>
  </button>
</template>

<script setup lang="ts">
import Star from './Star.vue'
import Done from './Done.vue'
import { ref } from 'vue'

const props = defineProps(['name', 'discription','favourite', 'done', 'id', 'deadline'])
const emit = defineEmits(['star', 'done', 'right-sidebar'])

const date = new Date();
const taskDealine = new Date(props.deadline)
const dayOfToday =  (date.getTime() - taskDealine.getTime()) / 1000

const hours = ref(Math.floor(dayOfToday / 3600))
const minutes = ref(Math.floor((dayOfToday % 3600) / 60))
const seconds = ref(Math.floor(dayOfToday % 60))
const timeLeft = ref(`${hours.value}:${minutes.value}:${seconds.value}`)
console.log(dayOfToday)

</script>

<style scoped>
.task-background {
  display: flex;
  flex-direction: row;
  align-items: start;
  background-color: rgb(54, 54, 54);
  border-radius: 0.5rem;
  padding: 0.8rem 0.8rem;
  height: 4.5rem;
  position: relative;
  cursor: pointer;
  margin-bottom: 0.75rem;
}

.task-background::hover {

}

.project-info {
  margin-left: 1.5rem;
  color: white;
  padding-top: 0.2rem;
  display: flex;
  flex-direction: column;
}

.project-info__name {
  margin-bottom: 0.5rem;
  align-self: flex-start;
}
.project-info__discription {
  font-size: small;
  align-self: flex-start;
}

.project-info__deadline {
  font-size: small;
  align-self: flex-end;
}
</style>
