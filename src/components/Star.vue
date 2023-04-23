<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['favourite'])

const isFavourite = ref(false)
</script>
<template>
    <div class="favourite">
      <span
        :class="{ 'pi pi-star': !isFavourite, 'pi pi-star-fill': isFavourite }"
        style="color: white"
        @click="isFavourite = !isFavourite"
      ></span>
    </div>
</template>
<style scoped>
.favourite {
  position: absolute;
  right: 1rem;
}
</style>