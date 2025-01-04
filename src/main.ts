import './assets/global.css'
import './assets/variables.scss'; // 根据实际路径调整
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'
import router from './router'
import Markdown from 'vue3-markdown-it';
const app = createApp(App)
const pinia = createPinia();

// 注册持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.use(Markdown)
app.mount('#app')
