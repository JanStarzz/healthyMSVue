<template>
  <el-card class="box-card">
    <!-- 表单 -->
      <el-button type="primary"  @click="dialogVisible = true" size="small">周边查询</el-button>
      <p style="margin-top:10px">提示：用户输入地址规范如广东省深圳市龙华区。因为是公共接口网络访问慢，只需点击一次就行。</p>
      <!-- 表单验证 -->
      <el-dialog title="周边疫情查询" width="50%" :visible.sync="dialogVisible" @close="dialogVisibleClose">
        <el-form :model="query" ref="editRef" label-width="70px">
          <el-form-item label="省份" prop="province">
            <el-input v-model="query.province"></el-input>
          </el-form-item>
          <el-form-item label="市区" prop="city">
            <el-input v-model="query.city"></el-input>
          </el-form-item>
          <el-form-item label="街道" prop="district">
            <el-input v-model="query.district"></el-input>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="testData">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 表格 -->
      <el-table border stripe :data="showList">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="省份" prop="province"></el-table-column>
        <el-table-column label="市区" prop="city"></el-table-column>
        <el-table-column label="街道" prop="district"></el-table-column>
        <el-table-column label="地点" prop="locale"></el-table-column>
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
      key: '',
      url: '',
      api: '',
      // 存放输入地址的对象
      query: {
        province: '',
        city: '',
        district: ''
      },
      // 存放数据
      datalist: [],
      // 默认隐藏对话框
      dialogVisible: false,
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
    testData () {
      this.url = 'http://api.tianapi.com/txapi/ncovnearby/index?'
      this.key = '03b1289b52cb6bf38e6f0593dbe776e7'
      this.province = this.query.province
      this.city = this.query.city
      this.district = this.query.district
      this.api = this.url + 'key=' + this.key + '&' + 'province=' + this.province + '&' + 'city=' + this.city + '&' + 'district=' + this.district
      this.$http.get(this.api).then(res => {
        // 放到这是因为怕网络访问慢，造成用户点击，请求还没成功，用户会因为是否没点到从而多次点击，造成数据混乱
        this.dialogVisible = false
        if (res.data.code === 250) {
          this.dialogVisible = false
          return this.$message.error('该区域没有疫情或是地区不按规范输入')
        }
        for (var i = 0; i < res.data.newslist.length; i++) {
          var json = {
            province: this.query.province,
            city: this.query.city,
            district: this.query.district,
            locale: res.data.newslist[i].locale

          }
          this.datalist.push(json)
        }
        this.pageChange()
      })
    },
    // 分页
    pageChange () {
      // 分页功能
      this.total = this.datalist.length
      // 获取页数:将所有的数据去除以每页渲染的条数得到页数
      this.pagenum = Math.ceil(this.total / this.pagesize)

      // 分组：每一页的数据组成一组，互不影响。
      // slice() 方法可从已有的数组中返回选定的元素。
      for (let i = 0; i < this.pagenum; i++) {
        this.totalpage[i] = this.datalist.slice(this.pagesize * i, this.pagesize * (i + 1))
      }

      // 将每一组的数据渲染到对应的页面
      this.showList = this.totalpage[this.defalut]
      this.$message.success('数据请求成功')
    },
    // 重置表单
    dialogVisibleClose () {
      this.$refs.editRef.resetFields()
      // this.pageChange()
    },
    // 条数切换
    changeSize (val) {
      this.pagesize = val
      this.pageChange()
      console.log(val)
    },
    // 页码切换
    changePage (val) {
      // 页码是1开始，但是数组下标是0开始，所以需要减去1
      this.defalut = val - 1
      this.pageChange()
    }
  },
  created () {
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
.el-table{
  margin-top: 20px;
}
</style>
