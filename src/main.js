import Vue from 'vue'
import App from './App'
import router from './router'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'

// 导入axios
import axios from 'axios'

// 导入和安装element UI 组件
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 把axios挂载在Vue上面
axios.defaults.baseURL = 'http://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios

// 配置当前的环境是开发环境
Vue.config.productionTip = false

// 这行的作用表示new Vue的时候可以不用变量接收
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
