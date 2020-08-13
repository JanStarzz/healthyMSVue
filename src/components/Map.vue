<template>

  <el-card>
  <div class="echarts">
      <div :style="{height:'700px',width:'100%'}" ref="myEchart"></div>
    </div>
  </el-card>

</template>

<script>
// 引入
import echarts from 'echarts'
export default {
  data () {
    return {
      option: {
        title: {
          text: '全国疫情地图',
          subtext: '仅供学习交流,数据来源腾讯',
          // 标题位置
          left: 'center'
        },
        // 鼠标移上去的提示
        tooltip: {
          trigger: 'item'
        },
        // 图例
        legend: {
          orient: 'vertical',
          left: 'center',
          data: ['疫情']
        },
        visualMap: {
          // 表示分段型视觉映射组件
          type: 'piecewise',
          // 范围
          pieces: [
            { min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28' },
            { min: 500, max: 999, label: '确诊500-999人', color: '#4e160f' },
            { min: 100, max: 499, label: '确诊100-499人', color: '#974236' },
            { min: 10, max: 99, label: '确诊10-99人', color: '#ee7263' },
            { min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7' }
          ],
          top: 'center',
          color: ['#E0022B', '#E09107', '#A3E00B']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        roamController: {
          show: true,
          left: 'right',
          mapTypeControl: {
            china: true
          }
        },
        series: [
          {
            name: '确诊量',
            type: 'map',
            mapType: 'china',
            roam: false,
            zoom: 1,
            label: {
              // 显示省份名字
              show: true,
              color: 'black'
            },
            data: []
          }
        ]
      },
      myChart: ''
    }
  },
  methods: {
    drawChinaMap () {
      this.myChart = echarts.init(this.$refs.myEchart)
      this.myChart.setOption(this.option)
    },
    runData () {
      var url = '/g2/getOnsInfo?name=disease_h5'

      this.$http.get('/api' + url).then(res => {
        if (res.status !== 200) {
          return this.$message.err('数据请求失败')
        }
        this.$message.success('页面刷新成功')
        // 数据提取
        var plagueData = JSON.parse(res.data.data)
        var childrenData = plagueData.areaTree[0].children
        // 存放数据
        var nowData = []
        for (var i = 0; i < childrenData.length; i++) {
          var json = {
            name: childrenData[i].name,
            value: childrenData[i].total.nowConfirm
          }
          nowData.push(json)
        }
        this.option.series[0].data = nowData
        this.myChart.setOption(this.option)
        console.log(this.option.series[0].data)
      })
    }
  },
  mounted () {
    this.drawChinaMap()
    this.runData()
  }
}

</script>

<style scoped>
</style>
