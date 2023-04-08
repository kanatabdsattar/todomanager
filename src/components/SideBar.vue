<template>
    <aside :style="{width: SideBarWidth}">
        <div class="logo">
            <h4>ToDo</h4>
        </div>
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <i class="pi pi-angle-double-right" style="color: white;"></i>
            </button>
        </div>
    </aside>
</template>
<script setup lang="ts">
import {ref, computed} from 'vue';

const is_expanded = ref(true);
const sidebar_width = 300;
const sidebar_width_collapsed = 80;
const SideBarWidth = computed(() =>
    `${is_expanded.value ? sidebar_width : sidebar_width_collapsed}px`);
const ToggleMenu = () => {    
    is_expanded.value = !is_expanded.value;

}
</script>

<style lang="scss" scoped>
aside {
    width: calc(2rem + 32px);
    display: flex;
	flex-direction: column;
	background-color: var(--color-dark-blue);
	color: white;
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;
	transition: 0.2s ease-in-out;
    margin: 0;
}
.menu-toggle-wrap {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 1rem;
	top: 0;
	transition: 0.2s ease-in-out;
}
.menu-toggle {
	transition: 0.2s ease-in-out;
    background: transparent;
    border: none;
    cursor: pointer;
}
.pi .pi-angle-double-right:hover{
    transform: translateX(0.5rem);
}

</style>