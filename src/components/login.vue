<template>
 <div class="login-container">
   <!-- 登录框 -->
   <div class="login-box">

     <!-- logo区域 -->
     <div class="logo">
       <img src="../assets/logo.png">
     </div>

     <!-- 登录表单 -->
     <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
      <el-form-item prop="username">
         <el-input placeholder="请输入用户名" prefix-icon="iconfont icon-user" v-model="loginForm.username">
        </el-input>
      </el-form-item>

       <el-form-item prop="password">
         <el-input placeholder="请输入密码"  v-model="loginForm.password" 
         :type="pwd? 'password':'text'">
            <!-- 用slot的形式 -->
            <!-- 标签内部不能加变量，加变量要用v-bind属性绑定的形式 -->
             <i slot="prefix" :class="['iconfont', pwd ?'icon-3702mima':'icon-showpassword']" @click="fun1"></i>
        </el-input>
      </el-form-item>

      <el-row>
        <el-col>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-col>
      </el-row>
     </el-form>



   </div>
 </div>
</template>

<script>
// 导入login-mixins.js
import mix from './login-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
// lang="less、sass"表示支持less或者sass语法

.login-container {
  background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  background-color: #fff;
  width: 450px;
  height: 304px;
  border-radius: 4px;
  position: relative;
  top: 20%;
  left: 50%;
  margin-left: -225px;
  // 此处还可以用：
  // transform: translateX(-50%)
  .el-form {
    padding: 15px;
    position: relative;
    top: 100px;
  }
  .logo {
    width: 120px;
    height: 120px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 1px 6px #eee;
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el-col {
    // 伸缩布局，靠右边对齐
    display: flex;
    justify-content: flex-end;
  }
  .icon-3702mima,
  .icon-showpassword {
    // 给它本体加transition
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
      color: darkred;
    }
  }
}
</style>
