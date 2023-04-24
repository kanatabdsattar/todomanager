import { createRouter, createWebHistory } from 'vue-router'
import HomePageVue from '@/views/HomePage.vue'
import TaskListVue from "@/views/TaskList.vue"
import FavouriteList from "@/views/FavouriteList.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePageVue },
    {path: '/tasks', component: TaskListVue},
    {path: '/favourite', component: FavouriteList}
  ]
})

export default router
