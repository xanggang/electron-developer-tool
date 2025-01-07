import { createApp } from 'vue'
// import '@unocss/reset/tailwind.css'
import 'uno.css'
import App from './App.vue'
import An, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { setupRouter } from '@/router'
import 'virtual:svg-icons-register'

import './styles/index.less'

message.config({
  top: '100px',
})

const app = createApp(App)
app.use(An)
setupRouter(app)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
