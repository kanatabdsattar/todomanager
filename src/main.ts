import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'

//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css'

//core
import 'primevue/resources/primevue.min.css'

//icons
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Button', Button)
app.component('Sidebar', Sidebar)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
