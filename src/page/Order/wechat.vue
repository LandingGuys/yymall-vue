<template>
    <div class="w" style="padding-bottom: 100px;">
         <y-shelf title="微信收银台 ">
            <div slot="content">
                <div class="box-inner order-info">
                    <div class="x-qrcode" style="margin-bottom: 20px;margin-left:465px">
                        <div id="qrcode" ref="qrCodeDiv"></div>
                    </div>
                    <p class="payment-detail">扫一扫付款（元）</p>
                    <p class="payment-money">{{ordetTotal}}</p>
                </div>
            </div>
        </y-shelf>
  </div>
</template>
<script>
import qrcode from 'qrcodejs2'
import { queryByOrderId } from '/api/goods'
import YShelf from '/components/shelf'
export default {
    data(){
        return{
            orderId: '',
            returnUrl: '',
            codeUrl: '',
            ordetTotal: '',
            timer: null
        }
    },
    mounted(){
        this.orderId = this.$route.params.orderId
        this.returnUrl = this.$route.params.returnUrl
        this.codeUrl = this.$route.params.codeUrl
        // this.ordetTotal = this.$route.params.ordetTotal
        // console.log(this.ordetTotal)
        this.$nextTick(() =>{
            this.init()
            this.setOrderTotal()
        })
        this.timer = setInterval(this._queryByOrderId, 2000);
        

    },

    methods: {
        setOrderTotal(){
            this.ordetTotal = this.$route.params.ordetTotal
            console.log(this.ordetTotal)
        }
        ,
        init(){
            new qrcode(this.$refs.qrCodeDiv,{
                text: this.codeUrl,
                width: 300,
                height: 300,
                colorDark: "#333333", //二维码颜色
                colorLight: "#ffffff", //二维码背景色
                correctLevel: qrcode.CorrectLevel.L//容错率，L/M/H
            })
        },
        async _queryByOrderId(){
            const res = await queryByOrderId({
                orderId : this.orderId
            })
            // console.log(res)
            if(res.status !== 0){
                return this.$message.error(res)
            }
            if(res.data.platformStatus !=null && res.data.platformStatus==='SUCCESS'){
                // this.$router.push(this.returnUrl)
                 clearInterval(this.timer)
                 this.$router.push({path:"/order/paysuccess"})
                //window.open(this.returnUrl,'_self ')

            }
        }
    },
     components: {
      YShelf
    }
    
}
</script>
<style lang="scss" scoped>
.w {
    padding-top: 39px;
  }

  .order-info {
    padding: 60px 0 55px;
    color: #333;
    background: #fff !important;
    h3 {
      padding-bottom: 14px;
      line-height: 36px;
      text-align: center;
      font-size: 36px;
      color: #212121;
    }
    .payment-detail {
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: #999;
    }
  }
   .payment-money {
    text-align: center;
    font-size: 30px;
    color: #d44d44;
    font-weight: 700;
  }
</style>