<template>
<el-card class="box-card">
  <ul v-for="item in newsList" :key="item.title">
    <li>
      <h2>标题:{{item.title}}</h2>
      <p>日期：{{item.date}}</p>
      <p style="color:red">鉴别：{{item.explain}}</p>
      <p>澄清：{{item.desc}}</p>
      <p>平台：{{item.Source}}</p>
    </li>
  </ul>
  <!-- 分页 -->
  <el-pagination
  layout="total, sizes, prev, pager, next"
      background
      :page-sizes="[5, 10, 15, 20]"
      :total="total">
</el-pagination>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      newsList: [],
      total: 0
    }
  },
  methods: {
    rumorData () {
      this.$http.get('http://api.tianapi.com/txapi/rumour/index?key=03b1289b52cb6bf38e6f0593dbe776e7&num=20$page=3').then(res => {
        if (res.status !== 200) {
          return this.$message.err('获取数据失败')
        }
        var listData = res.data.newslist
        for (var i = 0; i < listData.length; i++) {
          var json = {
            date: listData[i].date,
            title: listData[i].title,
            explain: listData[i].explain,
            Source: listData[i].author,
            desc: listData[i].desc
          }
          this.newsList.push(json)
        }
        this.total = listData.length
        console.log(this.total)
        this.$message.success('页面刷新成功')
      })
    }
  },
  created () {
    this.rumorData()
  }
}
</script>
<style scoped>
ul li{
  list-style: none;
  margin: 10px;
  border-bottom: 2px solid gray;
}
 /* https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoNewsArticleList */

</style>
