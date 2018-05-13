export default {
  data() {
    return {
      collapse: false,
      menus: [], // 菜单列表
      menusIcon: [
        'icon-users',
        'icon-tijikongjian',
        'icon-shangpin',
        'icon-danju',
        'icon-baobiao'
      ] // 渲染左侧小图标
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    logout() {
      // 什么情况下加''
      // 字符串加'',变量不用加，加“”把它看做是字符串
      sessionStorage.removeItem('token')
      // 编程式导航
      this.$router.push('./login')
    },
    //  获取左侧菜单项
    async getMenus() {
      const { data: res } = await this.$http.get('menus')
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('请求菜单列表失败！')
      }
      this.menus = res.data
      // console.log(res.data)
    }
  }
}
