<template>
   <div class="users-container">
     <!-- 面包屑导航 -->
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 头部的搜索按钮 -->
      <el-row :gutter="20">
        <!-- 报错：span前面加:,属性绑定 -->
             <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="keywords">
                 <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
             </el-col>
             <el-col :span="3">
                 <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
             </el-col>
             </el-row>
          <!-- 表格部分 -->
          <el-table
              :data="userlist"
              border
              stripe
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column prop="username"
                label="姓名"
                width="100">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="180">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="电话"
                width="120">
              </el-table-column>
               <el-table-column
                prop="role_name"
                label="角色"
                width="150">
              </el-table-column>
               <el-table-column prop="mg_state" label="用户状态" width="100">
                <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" @change="stateChanged(scope.row)">
                </el-switch>
                </template>
              </el-table-column>
               <el-table-column label="操作" width="200">
                <!-- 3个按钮 -->
                <!-- 删除的时候传入的SCOPE是什么？ -->
                <!-- catch (err=>err) 什么意义 -->
                <template slot-scope="scope">
                 <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditPic(scope)"></el-button>
                 <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope)"></el-button>
                 <!-- :enterable="false"加冒号是变量false，不加冒号是字符串false -->
                 <el-tooltip :enterable="false" class="item" effect="dark" content="分配角色" placement="top">
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRoleDialog(scope)"></el-button>
                 </el-tooltip>
                </template>
              </el-table-column>
  </el-table>
              <!-- 页码条 -->
              <!-- pageSize为什么不用this？ -->
               <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="nowPage"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogVisible"
      width="50%" @close="resetAddClose">
      <!-- 添加用户表单信息start -->
        <el-form :model="addUserForm" :rules="addUserFormrules" ref="addUserFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>

          <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>

          <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>

        <!-- prop="mobile"的属性绑定只使用于文本，类似开关，按钮之类的都要通过slot插槽来实现 -->
          <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
        </el-form>
      <!-- 添加用户表单信息end -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

      <!-- 编辑按钮弹出的对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editUserDialogVisible"
      width="50%" @close="resetEditForm">
      <!-- 编辑用户表单信息start -->
      <!-- question：用户名不能禁用，表单不能重置 -->
        <el-form :model="editUserForm" :rules="editUserFormrules" ref="editUserFormRef" label-width="80px">
        <el-form-item label="用户名" v-model="editUserForm.username" disabled>
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>

        <!-- prop="mobile"的属性绑定只使用于文本，类似开关，按钮之类的都要通过slot插槽来实现 -->
         <!-- prop="mobile"这里的mobile指的是什么 -->
          <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
        </el-form>
      <!-- 编辑用户表单信息end -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>

     <!-- 分配角色按钮弹出的对话框 -->
     <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="30%">
      <el-form ref="setRoleFormRef" :model="setRoleForm" label-width="120px">
      <el-form-item label="当前的用户:">
        <span>{{setRoleForm.username}}</span>
      </el-form-item>
       <el-form-item label="当前的角色:">
        <span>{{setRoleForm.rolename}}</span>
       </el-form-item>
        <el-form-item label="分配新角色:">
         <el-select v-model="setRoleForm.newRoleId" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
       </el-select>
       </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setNewRole">确 定</el-button>
      </span>
    </el-dialog>

   </div>
</template>
<script>
import mix from './users-mixins.js'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
</style>
