import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import * as API from './api'
import loading from './common/img/loading.gif'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'
import './mock/mockServer'
import './validate'
import format from 'date-fns/format'


Vue.prototype.$API = API

Vue.use(VueLazyload, { // 内部自定义了一个全局指令: lazy
  loading
})

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)

Vue.filter('dateString', (value, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  return format(value, formatStr)
})

Vue.prototype.$eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /*components: {
    App
  },
  template: '<App/>',*/
  // render: createElement => createElement(App)  // <App/>
  render: h => h(App),  // <App/>
  router, // 配置路由器
  store, // 配置vuex
})
