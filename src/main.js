import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入全局css
import './assets/base.css'
// 引入echarts
import echarts from 'echarts'

import 'echarts/map/js/china'
// 引入axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import axios from 'axios'
Vue.prototype.$http = axios
// axios.defaults.baseURL = '/api'
Vue.prototype.$echarts = echarts
Vue.use(echarts)

//
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
