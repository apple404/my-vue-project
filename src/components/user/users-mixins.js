export default {
  data() {
    return {
      // 搜索关键字
      keywords: '',
      nowPage: 1, // 当前显示第几页
      pageSize: 2, // 当前每页显示多少条
      total: 0, // 总记录条数
      userlist: [], // 用户列表数据
      // 控制添加用户对话框的显示和隐藏
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      setRoleDialogVisible: false,
      // 添加用户表单
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单验证规则
      addUserFormrules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }]
      },
      // 编辑用户表单
      // 这里面的运行流程是？
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: -1
      },
      // 编辑用户的表单验证规则
      editUserFormrules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }]
      },
      // 分配用户角色的表单
      // 这一块不明白？
      setRoleForm: {
        newRoleId: ''
      },
      roles: [] // 默认下拉菜单是空数组
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: {
          query: this.keywords,
          pagenum: this.nowPage,
          pagesize: this.pageSize
        }
      })
      //  this指的是vue实例
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据列表失败！')
      }
      // console.log(res)
      this.userlist = res.data.users
      this.total = res.data.total
    },
    // 监听关闭事件，并重置表单
    resetAddClose() {
      // 报错：$refs少一个s
      this.$refs.addUserFormRef.resetFields()
    },
    addUser() {
      // 先表单验证
      // console.log(123)
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addUserForm)
        // 合格后提示信息
        if (res.meta.status !== 201) {
          return this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 重新渲染列表
        this.getUserList()
        // 关闭对话框
        this.addUserDialogVisible = false
      })
    },
    // 为什么报错undefined,因为没有加await,得到的是promise对象
    async stateChanged(row) {
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      )
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('修改状态失败！')
      this.$message.success('修改状态成功！')
      //  为什么不需要刷新数据？25个14分
    },
    // 这里的newSize形参，实参是什么？
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.nowPage = newPage
      this.getUserList()
    },
    async removeUser(scope) {
      const result = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 直接复制elementUI错误？
      //   用户取消了删除
      if (result !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      // console.log(result)  //confirm

      // 向服务器发起删除请求
      const { data: res } = await this.$http.delete('users/' + scope.row.id)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除列表失败！')
      this.$message.success('删除成功！')
      this.getUserList()
    },
    // 点关闭按钮的时候，重置编辑的表单
    resetEditForm() {
      this.$refs.editUserFormRef.resetFields()
    },
    // 点击按钮，提交编辑信息
    editUser() {
      // 先验证表单
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return
        // 表单合格，通过后，提交编辑信息向后台发起请求
        const { data: res } = await this.$http.put(
          'users/' + this.editUserForm.id,
          {
            // 报错：注意对象成员之间加引号
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          }
        )
        // console.log(res)
        // 弹一下成功和失败的信息
        if (res.meta.status !== 200) {
          return this.$message.error('编辑用户信息失败！')
        }
        this.$message.success('编辑用户信息成功！')
        // 重新渲染一下列表
        this.getUserList()
        // 让编辑框隐藏起来
        this.editUserDialogVisible = false
      })
    },
    // 点击编辑按钮，弹出层，另外加本身的用户信息
    async showEditPic(scope) {
      this.editUserDialogVisible = true
      // 根据Id查询用户最新信息
      const { data: res } = await this.$http.get('users/' + scope.row.id)
      console.log(res)
      this.editUserForm.username = res.data.username
      this.editUserForm.email = res.data.email
      this.editUserForm.mobile = res.data.mobile
      // 把获取的用户id也存起来，方便以后用
      this.editUserForm.id = res.data.id
    },
    async showSetRoleDialog(scope) {
      this.setRoleDialogVisible = true
      const id = scope.row.id
      // 根据id向服务器查询用户信息，取回来的数据不包含用户的角色
      const { data: res } = await this.$http.get('users/' + id)
      //  console.log(res)
      if (res.meta.status !== 200) return this.$message.error('查询信息失败！')
      //  查询成功后往分配角色的表格中填数据
      this.setRoleForm.id = res.data.id
      this.setRoleForm.username = res.data.username
      // console.log(scope.row)
      // 从scope.row中查询用户角色
      this.setRoleForm.rolename = scope.row.role_name
      // 前两行表格填完之后，完成第3行数据获取
      const { data: roles } = await this.$http.get('roles')
      console.log(roles)
      if (roles.meta.status !== 200) {
        return this.$message.error('获取信息失败！')
      }
      // 获取成功之后，开始赋值
      this.roles = roles.data
    },
    //  点击确定按钮，向后台提交新设置的角色
    async setNewRole() {
      // console.log(this.setRoleForm)
      const { data: res } = await this.$http.put(
        `users/${this.setRoleForm.id}/role`,
        {
          rid: this.setRoleForm.newRoleId
        }
      )
      if (res.meta.status !== 200) return this.$message.error('设置角色失败！')
      this.$message.success('分配权限成功！')
      // 渲染一下页面
      this.getUserList()
      // 让分配角色框隐藏起来
      this.setRoleDialogVisible = false
    }
  }
}
