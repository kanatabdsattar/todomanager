<template>
  <div class="app">
    <div id="time">
      <div class="circle">
        <div class="dots" :ref="day_dot"></div>
        <svg>
          <circle cx="70" cy="70" r="50"></circle>
          <circle cx="70" cy="70" r="50" ref="dd"></circle>
        </svg>
        <div id="days">{{ days }}</div>
      </div>
      <h3>Project</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const days = ref(0)
const dd = ref()
const day_dot = ref()

const endDate = '09/01/2023 00:00:00'

const now = new Date(endDate).getTime()
const countDown = new Date().getTime()
const distance = Number(now) - Number(countDown)

const d = Math.floor(distance / (1000 * 60 * 60 * 24));
days.value = d

onMounted(() => {
  dd.value.style.strokeDashoffset = 440 - (440 * d) / 365;
})
</script>

<style scoped>
.app {
  width: 100%;
  align-items: center;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
#time {
  background-color: white;
  border-radius: 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 10px;
}

#time .circle {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#time .circle svg {
  position: relative;
  width: 150px;
  height: 150px;
  transform: rotate(270deg);
}
#time .circle svg circle {
  width: 80%;
  height: 80%;
  fill: transparent;
  stroke-width: 8;
  stroke: #282828;
  transform: translate(5px, 5px);
}
#time .circle svg circle:nth-child(2) {
  stroke: var(--color-blue);
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
}
#time div {
  position: absolute;
  text-align: center;
  font-weight: 500;
  color: var(--color-dark-blue);
  font-size: 1.5em;
}
#time .dots {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
}
#time .dots::before {
  content: '';
  position: absolute;
  top: 1rem;
  left: 2;
  width: 1rem;
  height: 1rem;
  border-radius: 12px;
  background-color: var(--color-blue);
  box-shadow: 0 0 20px var(--color-blue), 0 0 60px var(--color-blue);
}
</style>
