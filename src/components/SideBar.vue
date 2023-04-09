<template>
    <aside :style="{width: SideBarWidth}">
        <div class="logo">
            <h4>ToDo</h4>
        </div>
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu" :class="{'rotate-180': is_expanded}">
                <i class="pi pi-angle-double-right" style="color: white;"/>
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
    position: relative;
    width: calc(2rem + 34px);
    display: flex;
    height: 100vh;
	flex-direction: column;
	background-color: var(--color-dark-blue);
	color: white;
	min-height: 100vh;
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
    padding-top:0.5rem;
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
.pi .pi-angle-double-right:hover{
    transform: translateX(0.5rem);
}

.rotate-180{
    transform: rotate(180deg);
    transition: 0.2s linear;
}

</style>