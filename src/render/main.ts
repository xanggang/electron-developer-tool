import { createApp } from 'vue'
import An, { message } from 'ant-design-vue'
import App from './App.vue'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/reset.css'
import { setupRouter } from './router'

message.config({
  top: '100px',
})

export default function initWeb() {
  const app = createApp(App)
  app.use(An)
  setupRouter(app)

  app.mount('#app')
  // .$nextTick(() => {
  //   postMessage({ payload: 'removeLoading' }, '*')
  // })
}
