import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSidebarStore = defineStore('sidebar', () => {
    const is_expanded = ref(false);
    const sidebar_width = 300;
    const sidebar_width_collapsed = 85;
    const ToggleMenu = () => {is_expanded.value = !is_expanded.value}
    const SideBarWidth = computed(() =>
        `${is_expanded.value ? sidebar_width : sidebar_width_collapsed}px`); 
    
    return {is_expanded, SideBarWidth, ToggleMenu}
});


