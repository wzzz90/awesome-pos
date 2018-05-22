import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Details from '@/view/details'

Vue.use(Router)
//const load = (view) => () => import(`./views/${ view }`)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Pos',
      redirect: '/index',
      component: Pos
    },
    {
      path: '/index',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/details',
      name: '详情',
      component: Details
    }
    
  ]
})
