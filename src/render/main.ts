import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import 'uno.css'
import 'virtual:svg-icons-register'
import An, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

message.config({
  top: '100px',
})

export function initWeb() {
  const app = createApp(App)
  app.use(An)
  
  createApp(App)
    .mount('#app')
    .$nextTick(() => {
      postMessage({ payload: 'removeLoading' }, '*');
    });
}
