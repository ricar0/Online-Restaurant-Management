import Vue from 'vue'
import VueRouter from 'vue-router'
import UserMain from '../views/UserMain.vue'
import HistoryList from '../views/HistoryList.vue'
import ManageMain from '../views/ManageMain.vue'
import DeleteDish from '../views/DeleteDish.vue'
import ListManage from '../views/ListManage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:UserMain,
    component: UserMain
  },
  {
    path: '/HistoryList',
    component: HistoryList
  },
  {
    path: '/ManageMain',
    component: ManageMain
  },
  {
    path: '/ListManage',
    component: ListManage
  },
  {
    path:'/DeleteDish',
    component: DeleteDish
  },
  {
    path:'/Login',
    component: Login
  },
  {
    path:'/Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
