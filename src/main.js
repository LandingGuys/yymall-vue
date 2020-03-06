import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { userInfo } from './api'

Vue.use(Element)
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
Vue.prototype.$message = Element.Message
// 不需要登陆的页面 => 白名单
const whiteList = ['/home', '/goods', '/login', '/goodsDetails', '/register']
router.beforeEach(function (to, from, next) {
  userInfo().then(res => {
    // 没登录
    if (res.status !== 0) {
      // 白名单
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        Element.Message.error(res.msg)
        next('/login')
      }
    } else {
      store.commit('RECORD_USERINFO', {info: res.data})
      //  跳转到
      if (to.path === '/login') {
        next({path: '/'})
      }
      next()
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
