<template>
<!-- 根容器 -->
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <img src="../assets/images/logo.png">
      <h3 class="title">电商后台管理系统</h3>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>

      <!-- 左侧菜单栏 -->
      <!-- :unique-opened="true" 加：不加：当做是字符串解析，加：当做是true有意义 -->
      <el-aside width="200px" :style="{width:collapse?'65px':'200px'}">
        <div class="toggleBar" @click="collapse=!collapse">|||</div>
        
         <el-menu :collapse="collapse" :collapse-transition="false" default-active="2" background-color="#333744"  text-color="#fff" :unique-opened="true" font-size:12px>
            <!-- 第一个子菜单   -->
              <el-submenu :index="(i+1).toString()" v-for="(item,i) in menus" :key="item.id"
              :style="{width:collapse?'65px':'200px'}">
              <template slot="title"> 
                <!-- 左侧图标  -->
                <!-- 报错：menusIcon[i]这个是数组，不能加引号 -->
                <i :class="['iconfont', menusIcon[i]]" style="margin-right:10px"></i>
                <span style="font-size:13px;">{{item.authName}}</span>
              </template>
               <el-menu-item style="font-size:13px;" :index="subitem.path" v-for="subitem in item.children" :key="subitem.id"><i class="el-icon-menu"></i>{{subitem.authName}}</el-menu-item>
            </el-submenu>  
         </el-menu>
      </el-aside>

      <!-- 右侧区域  -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 报错：注意，变量不加‘’，字符串加‘’
import mix from './home-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  height: 60px;
  background-color: #373d41;
  padding: 0;
  user-select: none;
  .title {
    font-weight: 200;
    color: #fff;
    float: left;
    margin-left: 15px;
  }
  img {
    float: left;
  }
  .el-button {
    float: right;
    margin: 10px 20px 0 0;
  }
}
.el-aside {
  background-color: #333744;
  user-select: none;
}
.toggleBar{
  font-size:12px;
  color: #fff;
  letter-spacing: 0.2em;
  line-height: 26px;
  cursor: pointer;
  background-color: #4a5064;
  user-select: none;
  text-align: center;
}
</style>


