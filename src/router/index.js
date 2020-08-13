import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入主页组件
import Home from '../components/Home.vue'
import Map from '../components/Map.vue'
import Statistics from '../components/Statistics.vue'
import Periphery from '../components/Periphery.vue'
import RumorIdentification from '../components/RumorIdentification.vue'
import News from '../components/News.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      // 欢迎页面
      {
        path: '/',
        component: About
      },
      {
        path: '/Map',
        component: Map
      },
      {
        path: '/Statistics',
        component: Statistics
      },
      {
        path: '/periphery',
        component: Periphery
      },
      {
        path: '/RumorIdentification',
        component: RumorIdentification
      },
      {
        path: '/news',
        component: News
      },
      {
        path: '/about',
        component: About
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
