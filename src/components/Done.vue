<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['done', 'id'])

const checkbox = ref(props.done)
const checkboxId = ref(props.id)
</script>

<template>
    <div class="round">
      <input type="checkbox" checked v-model="checkbox" :id="checkboxId" />
      <label :for="checkboxId"></label>
    </div>
</template>

<style scoped>
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
</style>