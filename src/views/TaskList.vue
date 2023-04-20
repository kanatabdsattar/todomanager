<template>
    <div class="app">
        <count-down/>
    </div>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue";
</script>

<style scoped> 
.app{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>