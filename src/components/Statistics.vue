<template>
  <el-card class="box-card">
    <el-table :data="showList" border stripe >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="疫情地区" prop="name"></el-table-column>
      <el-table-column label="新增" prop="today"></el-table-column>
      <el-table-column label="现有" prop="nowConfirm"></el-table-column>
      <el-table-column label="累计" prop="confirm"></el-table-column>
      <el-table-column label="治愈" prop="heal"></el-table-column>
      <el-table-column label="死亡" prop="dead"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      layout="total, sizes, prev, pager, next"
      background
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="total"
      class="PageCenter">
    </el-pagination>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      // 存放所有数据
      tableData: [],
      // 数据数量
      total: 0,
      // 页数
      pagenum: 1,
      // 每页的数据量
      pagesize: 10,
      // 分组
      totalpage: [],
      // 默认显示哪一页
      defalut: 0,
      // 存放每页数据
      showList: []
    }
  },
  methods: {
    getData () {
      this.$http.get('api/g2/getOnsInfo?name=disease_h5').then(res => {
        if (res.status !== 200) {
          return this.$message.err('数据请求失败')
        }
        this.$message.success('页面刷新成功')
        // 数据提取
        var plagueData = JSON.parse(res.data.data)
        // 获取所有身份的数据
        var childrenData = plagueData.areaTree[0].children
        // 存放数据
        var nowData = []
        for (var i = 0; i < childrenData.length; i++) {
          var json = {
            name: childrenData[i].name,
            confirm: childrenData[i].total.confirm,
            nowConfirm: childrenData[i].total.nowConfirm,
            dead: childrenData[i].total.dead,
            heal: childrenData[i].total.heal,
            today: childrenData[i].today.confirm
          }
          nowData.push(json)
        }
        this.total = nowData.length
        this.tableData = nowData

        // 分页功能
        // 获取页数:将所有的数据去除以每页渲染的条数得到页数
        this.pagenum = Math.ceil(this.total / this.pagesize)

        // 分组：每一页的数据组成一组，互不影响。
        // slice() 方法可从已有的数组中返回选定的元素。
        for (let i = 0; i < this.pagenum; i++) {
          this.totalpage[i] = this.tableData.slice(this.pagesize * i, this.pagesize * (i + 1))
          // console.log(this.totalpage[i])
        }

        // 将每一组的数据渲染到对应的页面
        this.showList = this.totalpage[this.defalut]
      })
    },
    // 条数切换
    changeSize (val) {
      this.pagesize = val
      this.getData()
    },
    // 页码切换
    changePage (val) {
      // 页码是1开始，但是数组下标是0开始，所以需要减去1
      this.defalut = val - 1
      this.getData()
    }
  },

  created () {
    this.getData()
  }
}
</script>

<style scoped>
.el-card__body {
    padding: 0;
    margin: 0;
}
.el-pagination{
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
