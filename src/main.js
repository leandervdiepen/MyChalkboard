import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import bulma from './assets/sass/bulma.scss'

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

 

createApp(App).use(store).use(router).use(bulma).mount('#app')
