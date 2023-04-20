import { createRouter, createWebHistory } from 'vue-router'
import HomePageVue from '@/views/HomePage.vue'
import CountDown from "@/components/CountDown.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePageVue },
    {path: '/tasks', component: CountDown}
  ]
})

export default router
