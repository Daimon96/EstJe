import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './style.css'
import './assets/css/main.css'

const app = createApp(App);
app.use(router);
app.use(store);
store.dispatch('initAuth');
app.mount('#app');
