import {createApp, onMounted} from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Notifications from "notiwind";
import {createPinia} from "pinia";
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia()
const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(pinia)
app.use(router)
app.use(Notifications)
app.mount('#app')