import Vue from 'vue'
import Router from 'vue-router'
// @代表的是src根目录，在webpack.base.config.js的文件中通过resolve（）起的别名已经配置好了，文件后缀名可以有多个也省略了
import login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 如果访问的是根路径，则重定向到登录页面
      path: '/',
      name: 'HelloWorld',
      redirect: '/login'
    },
    {
      // 登录页面
      path: '/login',
      component: login
    }
  ]
})
