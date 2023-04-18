<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="task-background">
    <div class="round">
      <input type="checkbox" checked v-model="checkbox" :id="checkboxId" />
      <label :for="checkboxId"></label>
    </div>
    <div class="project-info">
      <p class="project-info__name">{{ name }}</p>
      <p class="project-info__discription">Project Info</p>
    </div>
    <div class="favourite">
      <span
        :class="{ 'pi pi-star': !isFavourite, 'pi pi-star-fill': isFavourite }"
        style="color: white"
        @click="isFavourite = !isFavourite"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['name', 'discription', 'favourite', 'done', 'id'])

const isFavourite = ref(false)
const checkbox = ref(props.done)
const checkboxId = ref(props.id)
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

.round {
  z-index: 1;
}

.round label {
  background-color: rgb(54, 54, 54);
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 1.5rem;
  left: 0;
  position: absolute;
  top: 0;
  width: 1.5rem;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: '';
  height: 6px;
  left: 5px;
  opacity: 0;
  position: absolute;
  top: 6px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type='checkbox'] {
  visibility: hidden;
}

.round input[type='checkbox']:checked + label {
  background-color: #066d0b;
  border-color: #066d0b;
}

.round input[type='checkbox']:checked + label:after {
  opacity: 1;
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

.favourite {
  position: absolute;
  right: 1rem;
}
</style>
