<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps(['favourite'])
const emit = defineEmits(['doneFavourite'])

const favouritePress = () => {
  emit('doneFavourite')
}
</script>
<template>
    <div class="favourite">
      <span
        :class="{ 'pi pi-star': !favourite, 'pi pi-star-fill': favourite }"
        style="color: white"
        @click="favouritePress"
      ></span>
    </div>
</template>
<style scoped>
.favourite {
  position: absolute;
  right: 1rem;
}
</style>