import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.json'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import UUID from 'vue-uuid';
import { setupCalendar } from 'v-calendar';
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(UUID)
app.mount('#app')
app.use(setupCalendar, {})