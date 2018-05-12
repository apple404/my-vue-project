import Vue from 'vue'
import Router from 'vue-router'
// @代表的是src根目录，在webpack.base.config.js的文件中通过resolve（）起的别名已经配置好了，文件后缀名可以有多个也省略了
import login from '@/components/login'
// 导入后台的home组件
// home可以随便起，与后面想对应
import home from '@/components/home'

// 导入用户列表页
import users from '@/components/user/users'

// 要用一个组件必须先导入，不导入会说未定义
import welcome from '@/components/welcome'
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
    },
    //后台home页面
    {
      path:'/home',
      component: home,
      redirect:'/welcome', 
      //重定向，展示完home页展示welcome页
      children:[  
        {path:'/welcome',component:welcome},
        {path:'/users',component:users}
      ]
      //子路由 ，所有的功能页都放在Home的子路由中展示
     
    }
  ]
})
