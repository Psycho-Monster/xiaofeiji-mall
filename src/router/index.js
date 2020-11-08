import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search/Search.vue'
import Order from '../views/Order/Order.vue'
import Personal from '../views/Personal/Personal.vue'
import Login from '../views/Login/Login.vue'
import Msite from '../views/Msite/Msite.vue'
import Shop from '../views/Shop/Shop.vue'
import ShopGoods from '../views/Shop/ShopGoods.vue'
import ShopInfo from '../views/Shop/ShopInfo.vue'
import ShopRatings from '../views/Shop/ShopRatings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Msite',
    component: Msite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    children: [
      {
        path: 'goods',
        component: ShopGoods
      },
      {
        path: 'ratings',
        component: ShopRatings
      },
      {
        path: 'info',
        component: ShopInfo
      },
      {
        path: '',
        redirect: 'goods'
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
