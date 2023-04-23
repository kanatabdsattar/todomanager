<template>
  <Sidebar
        v-model:visible="visibleRight"
        position="right"
        class="right-sidebar"
        style="
        background-color: var(--color-background-sidebar); 
        color: white; 
        border-radius: 0.5rem;
        width: 30%;
        height: 95%;
        margin-right: 1rem;"
      >
        <div class="title">

        </div>
        <input type="text" v-model="todoTitle" class="title-text" />
        <p class="p-float-label">
          <Textarea
            id="value"
            v-model="todoContent"
            rows="2"
            cols="43"
            aria-describedby="text-error"
            style="background-color: var(--color-background-sidebar);
            border: none;
            outline: none;
            border-bottom: 1px solid gray;"
          />
          <label for="value">Description</label>
        </p>
      </Sidebar> 
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>