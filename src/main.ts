import { createApp } from 'vue'
import App from './App.vue'

import CKEditor from '@ckeditor/ckeditor5-vue'

import './assets/css/main.css'

import router from './router'
import store from './store'

import registerIcons from './global/register-icons'

const app = createApp(App)

app.use(registerIcons)
app.use(store)
app.use(CKEditor)

app.use(router)

app.mount('#app')
