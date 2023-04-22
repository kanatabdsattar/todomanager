<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="task-background">
    <Done :done="props.done" :id="props.id"/>
    <div class="project-info">
      <p class="project-info__name">{{ name }}</p>
      <p class="project-info__discription">Project Info</p>
    </div>
    <Star :favourite="props.favourite"/>
  </div>
</template>

<script setup lang="ts">
import Star from './Star.vue'
import Done from './Done.vue'
import { ref } from 'vue'

const props = defineProps(['name', 'discription','favourite', 'done', 'id'])


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
  margin-bottom: 0.75rem;
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
