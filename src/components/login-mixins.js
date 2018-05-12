export default {
  data() {
    return {
      // 默认渲染密码
      pwd: true,
      // 登录表单对象
     loginForm:{ 
       username: "",
       password:""
     },
     //  登录表单验证规则
     loginFormRules:{
      //  用户名的校验规则
      username:[ { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'blur' }
            ],
      // 登录密码的校验规则
       password:[ { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
            ]
      }
    }
  },
  methods:{
     fun1(){
      this.pwd=!this.pwd
     },
    //  点击按钮重置表单项
    reset(){
      this.$refs.loginFormRef.resetFields()
    },
    // 登录的方法
    login(){
      // 先校验表单的合法性
      this.$refs.loginFormRef.validate(async valid=>{
        // console.log(valid) true or false
        // 表单验证失败
        if(!valid) return this.$message.error('请填写完整的登录信息！')
        // 发起登录请求
        // 为什么要用await,本来拿到是promise返回的对象需要点then，用await接收了之后，就不用点then就可以拿到数据
        // 什么时候用解构赋值，什么时候直接用res接收
        // object{ data:{data: {…}, meta: {…}}} 
        // 把Object中的data剥离出来，赋值为res
       const {data:res} = await this.$http.post('login', this.loginForm)
       if(res.meta.status !==200) return this.$message.error('登录失败！')
      //  console.log(res)
       this.$message.success('登录成功！')
      //  把服务器颁发的令牌存储到session storage中
       sessionStorage.setItem('token',res.data.token)
      //  通过编程式导航api，跳转到后台home的路由地址
      // console.log(this),
      // this是一个VUE的组件对象，里面有个属性是$routers,有很多的方法,表示主动去请求home路径
      this.$router.push('/home')
      })
    }
  }
}