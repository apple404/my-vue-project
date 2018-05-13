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

// 添加路由导航守卫，只有在登录的情况下，才允许访问有权限的页面，否则，跳转到登录
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取令牌
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
// 把axios挂载在Vue上面
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

// 'http://www.liulongbin.top:8888/api/private/v1/'
// 在每次请求的请求头中添加token令牌
axios.interceptors.request.use(
  function(config) {
    // 获取令牌
    const token = sessionStorage.getItem('token')
    // 把令牌添加到每次ajax的请求中
    config.headers.Authorization = token
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 配置当前的环境是开发环境
Vue.config.productionTip = false

// 这行的作用表示new Vue的时候可以不用变量接收
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
