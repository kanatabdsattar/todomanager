<template>
  <aside :style="{ width: SideBarWidth }">
    <div class="logo">
      <h3>ToDo</h3>
    </div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu" :class="{ 'rotate-180': isExpanded }">
        <i class="pi pi-angle-double-right" style="color: white" />
      </button>
    </div>
    <div class="links">
      <SideBarLink to="/" icon="pi pi-sun">My day</SideBarLink>
      <SideBarLink to="/main" icon="pi pi-star">Important</SideBarLink>
      <SideBarLink to="/main" icon="pi pi-home">Tasks</SideBarLink>
      <SideBarLink to="/main" icon="pi pi-plus-circle">Add task</SideBarLink>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSidebarStore } from './state'
import SideBarLink from './SideBarLink.vue'

const store = useSidebarStore()
const SideBarWidth = computed(() => store.SideBarWidth)
const isExpanded = computed(() => store.is_expanded)
const toggleMenu = () => {
  store.ToggleMenu()
}
</script>

<style lang="scss" scoped>
aside {
  position: relative;
  width: calc(2rem + 34px);
  display: flex;
  height: 100vmax;
  flex-direction: column;
  background-color: var(--color-dark-blue);
  color: white;
  padding: 1rem;
  transition: 0.2s ease-in-out;
  margin: 0;
  z-index: 1000;
}
.menu-toggle-wrap {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  top: 0;
  transition: 0.2s ease-in-out;
  right: 0;
  transform: translateX(50%);
  z-index: 1000;
  padding-top: 1rem;
}
.logo {
  margin-top: 0.5rem;
}
.menu-toggle {
  display: flex;
  padding: 0.5rem;
  transition: 0.2s ease-in-out;
  background: var(--color-dark-blue);
  border: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.pi .pi-angle-double-right:hover {
  transform: translateX(0.5rem);
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.links {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
