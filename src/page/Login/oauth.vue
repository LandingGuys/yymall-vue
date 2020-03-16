<template>
    <div></div>
</template>
<script>
import { addCart } from '/api/goods.js'
import { setStore, getStore, removeStore } from '/utils/storage.js'
export default {
    data () {
    return {
      res: this.$route.query.result,
      cart: []
    }
  },
  mounted () {
    // 这是element-ui中的组件
    const loading = this.$loading({
      lock: true,
      text: '登陆中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.oauthLogin()
    loading.close()
  },
    methods: {
    oauthLogin () {
      console.log(this.res)
      let res = JSON.parse(this.res)
      console.log(res)
      if (res.status === 0) {
          setStore('token', res.data.token)
          setStore('userId', res.data.id)
          // 登录后添加当前缓存中的购物车
          if (this.cart.length) {
            for (var i = 0; i < this.cart.length; i++) {
              addCart(this.cart[i]).then(res => {
                if (res.status === 0) {
                }
              })
            }
            removeStore('buyCart')
            this.$router.push({
              path: '/'
            })
          } else {
            this.$router.push({
              path: '/'
            })
          }
    } else {
          this.logintxt = '登录失败'
          //this.$message.error(res.msg)
          //this.$message.error(res.msg)
        //   this.message(res.result.message)
        //   captcha.reset()
          return false
        }
    },
    }
}
</script>
<style scoped>

</style>