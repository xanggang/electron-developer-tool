import { createApp } from 'vue'
// import '@unocss/reset/tailwind.css'
import 'uno.css'
import App from './App.vue'
import An from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
import { setupRouter  } from '@/router'
import 'virtual:svg-icons-register'

// import './style.css'

// import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)
app.use(An)
setupRouter(app)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
