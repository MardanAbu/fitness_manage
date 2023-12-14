import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

//use element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//import pinia
import { createPinia } from 'pinia'

//instantiate Pinia
const pinia = createPinia()

//data confirm
import myconfirm from './utils/myconfirm'
import objCopy from './utils/objCopy'

const app = createApp(App);
app.use(router).use(ElementPlus).use(pinia)
app.mount('#app') 

//register icons globaly
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//global mount
app.config.globalProperties.$myconfirm =  myconfirm
app.config.globalProperties.$objCopy =  objCopy