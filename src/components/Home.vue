<template>
<el-container class="home-container">
  <!-- 头部 -->
  <el-header style="height:100px">
    <!-- logo -->
    <div class="logo">
      <img src="../assets/logo.png" alt="">
      <span>全国疫情详情</span>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="this.$route.path" router  text-color="#fff"
       active-text-color="#409EFF" background-color="rgb(87, 98, 110)">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        { name: '/Map', navItem: '疫情地图' },
        { name: '/Statistics', navItem: '疫情统计' },
        { name: '/RumorIdentification', navItem: '谣言鉴别' },
        { name: '/news', navItem: '疫情动态' },
        { name: '/periphery', navItem: '周边疫情' },
        { name: '/about', navItem: '关于此站' }

      ]
    }
  }

}
</script>

<style scoped>
header.el-header{
  height: 100px;
  background-color:rgb(4, 137, 160);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
}
.el-header .logo{
  width: 100%;
  display: flex;
  align-items: center;
}
.el-header .logo img{
  width: 50px;
}
.el-header .logo span{
font-size: 30px;
margin-left: 30px;
}
.el-aside {
    background-color: rgb(87, 98, 110);
    text-align: center;
    width: 100%;
    line-height: 200px;
}
.el-main{
  width: 100%;
  background-color: #D3DCE6;
}
</style>
