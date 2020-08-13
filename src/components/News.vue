<template>
  <el-card class="box-card">
  <ul>
    <li v-for="item in zone" :key="item.title">
      <div class="title">
        <span><i class="el-icon-bell" style="color:blue;font-size:40px"></i></span>
        <span style="margin-left:20px">更新时间：{{item.time}}</span>
      </div>
      <div class="desc">
        <h1>{{item.title}}</h1>
        <a :href="item.url">{{item.desc}}</a>
      </div>
      <hr>
    </li>
  </ul>
  </el-card>
</template>

<style scoped>

</style>

<script>
export default {
  data () {
    return {
      dataList: [],
      zone: []
    }
  },
  created () {
    this.test()
  },
  methods: {
    test () {
      this.$http.get('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoNewsArticleList').then(res => {
        if (res.status !== 200) {
          return this.$message.err('数据请求失败，请确认是否开启网络')
        }

        this.dataList = res.data.data.FAutoNewsArticleList
        // console.log(this.dataList)

        for (var i = 0; i < this.dataList.length; i++) {
          var json = {
            title: this.dataList[i].title,
            desc: this.dataList[i].desc,
            time: this.dataList[i].publish_time,
            url: this.dataList[i].url
          }
          this.zone.push(json)
        }
        // console.log(this.zone)
        this.$message.success('页面刷新成功')
      })
    }

  }
}
</script>
<style scoped>
li{
  list-style: none;
  margin-bottom: 10px;
}
.title{
  line-height: 40px;
}
.desc{
  width: 90%;
  height: 100%;
  margin: 10px auto;
}
h1{
  line-height: 40px;
}
a{
  text-decoration: none;
  color: #1e90ff;
}
</style>
