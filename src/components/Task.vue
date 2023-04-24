<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button class="task-background" @click="emit('right-sidebar', id)">
    <Done :done="props.done" :id="props.id" @done="emit('done', id)"/>
    <div class="project-info">
      <p class="project-info__name" >{{ name }}</p>
      <p class="project-info__discription">Project Info</p>
    </div>
    <Star :favourite="props.favourite" @done-favourite="emit('star', id)" @click.stop/>
  </button>
</template>

<script setup lang="ts">
import Star from './Star.vue'
import Done from './Done.vue'
import { ref } from 'vue'

const props = defineProps(['name', 'discription','favourite', 'done', 'id'])
const emit = defineEmits(['star', 'done', 'right-sidebar'])

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
  padding-left: 1.5rem;
  color: white;
  padding-top: 0.2rem;
}

.project-info__name {
  margin-bottom: 0.5rem;
}
.project-info__discription {
  font-size: small;
}


</style>
