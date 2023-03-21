import { createApp } from 'vue'
import App from './App.vue'

// 重置CSS
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'

import registerIcons from './global/register-icons'

const app = createApp(App)

app.use(registerIcons)

app.use(router).use(store)

app.mount('#app')
