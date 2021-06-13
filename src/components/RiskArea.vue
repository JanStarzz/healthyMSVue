<template>
  <div id="app" >

    <span>将此地区设置为风险地区：</span>
    <el-cascader
      size="large"
      :options="options"
      :clearable="true"
      v-model="selectedOptions"
      @change="handleChange"
      filterable
    >
    </el-cascader>
    <el-select v-model="risk">
      <el-option v-for="item in risks" :key="item.name" :label="item.name" :value="item.status">

      </el-option>
    </el-select>

    <el-button @click="submitStatus">提交</el-button>

    <el-table :data="tableValue" v-loading="loading">
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-table :data="scope.row.cities">

            <el-table-column type="expand">
              <template v-slot="scope">
                <el-table :data="scope.row.areas">
                  <el-table-column prop="areaName" label="辖区名称"></el-table-column>
                  <el-table-column   label="状态">
                    <template v-slot="scope">
                      <span v-if="scope.row.status === 0">低风险</span>
                      <span v-else-if="scope.row.status===1" style="color: orange">中风险</span>
                      <span v-else-if="scope.row.status===2" style="color: red">高风险</span>

                    </template>

                  </el-table-column>

                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="cityName" label="辖区名称"></el-table-column>
            <el-table-column prop="count" label="辖区数" ></el-table-column>
            <el-table-column prop="high" label="高风险地区" style="color: red"></el-table-column>
            <el-table-column prop="mid" label="中风险地区" style="color: orange"></el-table-column>
            <el-table-column prop="low" label="低风险地区"></el-table-column>
          </el-table>
        </template>
      </el-table-column>


      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="count" label="辖区数"></el-table-column>
      <el-table-column prop="high" label="高风险地区" style="color: red"></el-table-column>
      <el-table-column prop="mid" label="中风险地区" style="color: orange"></el-table-column>
      <el-table-column prop="low" label="低风险地区"></el-table-column>

    </el-table>
  </div>
</template>

<script>
import { regionDataPlus } from 'element-china-area-data'
import { getRiskArea ,setRiskArea} from '../api/api'

export default {
  created () {
    this.HandleGetRiskArea()

  },

  data () {
    return {
      status: 4,
      risk: '',
      risks: [
        {
          status: 0,
          name: '低风险'
        },
        {
          status: 1,
          name: '中风险'
        },
        {
          status: 2,
          name: '高风险'
        },

      ],
      options: regionDataPlus,
      selectedOptions: [],
      tableValue: [],
      loading: true
    }
  },

  methods: {
    handleChange (value) {
      console.log(value)
    },

    HandleGetRiskArea () {
      getRiskArea(this.status).then(res => {
        this.loading= false;
        const resData = res.data
        if (resData.code === 200) {
          this.tableValue = resData.data
        } else {
          this.$message.error(resData.message)
        }

      })
    },

    submitStatus () {
      if (this.risk === '' || this.selectedOptions === []) {

        this.$message.error('请将信息选择完整后点击提交')
      } else {
        setRiskArea(this.risk,this.selectedOptions).then(res=>{
          const resData = res.data
          if (resData.code === 200) {
            this.tableValue = resData.data
            this.HandleGetRiskArea();
            this.loading = true;
          } else {
            this.$message.error(resData.message)
          }
        })
        this.$message.success('提交成功')
      }
      console.log(this.risk)
      console.log(this.selectedOptions)
    }
  }
}
</script>
