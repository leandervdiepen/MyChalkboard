import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import bulma from './assets/sass/bulma.scss'
 

createApp(App).use(store).use(router).use(bulma).mount('#app')
