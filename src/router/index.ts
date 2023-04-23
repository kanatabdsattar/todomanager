import { createRouter, createWebHistory } from 'vue-router'
import HomePageVue from '@/views/HomePage.vue'
import TaskListVue from "@/views/TaskList.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePageVue },
    {path: '/tasks', component: TaskListVue},
    {path: '/favourites', component: TaskListVue}
  ]
})

export default router
