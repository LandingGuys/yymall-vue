<template>
  <div>
    <y-shelf v-bind:title="orderTitle">
      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." style="min-height: 10vw;" v-if="orderList.length">
          <div class="orderStatus" v-if="orderStatus !== -1 && orderStatus !== 6">
            <el-steps :space="200" :active="orderStatus">
              <el-step title="下单" v-bind:description="createTime | formatDate"></el-step>
              <el-step title="付款" v-bind:description="payTime | formatDate"></el-step>
              <el-step title="出库" v-bind:description="sendTime | formatDate"></el-step>
               <el-step title="收货" v-bind:description="endTime | formatDate"></el-step>
              <el-step title="交易成功" v-bind:description="closeTime | formatDate"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus-close" v-if="orderStatus === -1">
            <el-steps  :space="780" :active="2">
              <el-step title="下单" v-bind:description="createTime | formatDate"></el-step>
              <el-step title="交易关闭" v-bind:description="closeTime | formatDate"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus-close" v-if="orderStatus === 6">
            <el-steps :space="780" :active="2">
              <el-step title="下单" v-bind:description="createTime | formatDate"></el-step>
              <el-step title="交易关闭" v-bind:description="closeTime | formatDate"></el-step>
            </el-steps>
          </div>
          <div class="status-now" v-if="orderStatus === 1">
            <ul>
              <li class="status-title"><h3>订单状态：待付款</h3></li>
              <li class="button">
                <el-button @click="orderPayment(orderId)" type="primary" size="small">现在付款</el-button>
                <el-button @click="_cancelOrder()" size="small">取消订单</el-button>
              </li>
            </ul>
            <p class="realtime">
              <span>您的付款时间还有 </span>
              <span class="red"><countDown v-bind:endTime="countTime" endText="已结束"></countDown></span>
              <span>，超时后订单将自动取消。</span>
            </p>
          </div>
          <div class="status-now" v-if="orderStatus === 2">
            
            <ul>
              <li class="status-title"><h3>订单状态：已支付，待发货</h3></li>
            </ul>
            <p class="realtime">
              <span>请耐心等待，即将为您发出货物</span>
            </p>
           
          </div>
          <div class="status-now" v-if="orderStatus === 3">
            <ul>
              <li class="status-title"><h3>订单状态：已发货，待收货</h3></li>
              <li class="button">
                <el-button @click="handleTrace(orderId)" type="primary" size="small">订单追踪</el-button>
                <el-button @click="_ReciptOrder(orderId)" size="small">确认收货</el-button>
              </li>
            </ul>
            <ul >
              <li class="realtime">
                 <span>请耐心等待，货物正在快马加鞭向你赶来</span>
              </li>
              <li class="button">
                  <span style="margin-right:10px">物流公司：{{transp.logisticsCa}}</span>
                  <span>物流单号：</span><span><a @click="handleTrace(orderId)">{{transp.logisticsNo}}</a></span>
              </li>
            </ul>
            
          </div>
           <div class="status-now" v-if="orderStatus === 4">
            <ul>
              <li class="status-title"><h3>订单状态：已收货</h3></li>
              <li class="button">
                <el-button @click="handleFinish(orderId)" type="primary" size="small">完成订单</el-button>
              </li>
            </ul>
            <p class="realtime">
              <span>请尽快确认完成订单！！！确认收货后 7 天将自动确认完成订单！！！</span>
            </p>
            
          </div>
          <div class="status-now" v-if="orderStatus === -1 || orderStatus === 6">
            <ul>
              <li class="status-title"><h3>订单状态：已关闭</h3></li>
            </ul>
            <p class="realtime">
              <span>您的订单已关闭。</span>
            </p>
          </div>
          <div class="status-now" v-if="orderStatus === 5">
            <ul>
              <li class="status-title"><h3>订单状态：已完成</h3></li>
            </ul>
            <p class="realtime">
              <span>您的订单已交易成功，感谢您的惠顾！</span>
            </p>
          </div>
          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">商品名称</span>
              </div>
              <div class="f-bc">
                <span class="price" style="padding-right: 15px">单价</span>
                <span class="num">数量</span>
                <span class="operation">小计</span>
              </div>
            </div>
          </div>

          <!--商品-->
          <div class="goods-table">
            <div class="cart-items" v-for="(item,i) in orderList" :key="i">
              <a @click="goodsDetails(item.productId)" class="img-box"><img :src="item.productImage" alt=""></a>
              <div class="name-cell ellipsis">
                <a @click="goodsDetails(item.productId)" title="" target="_blank">{{item.productName}}</a>
              </div>
              <div class="n-b">
                <div class="price"> ¥ {{Number(item.currentUnitPrice).toFixed(2)}}</div>
                <div class="goods-num">{{item.quantity}}</div>
                <div class="subtotal"> ¥ {{Number(item.totalPrice).toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <!--合计-->
          <div class="order-discount-line">
            <p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">商品总计：</span>
              <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{Number(orderTotal).toFixed(2)}}</span>
            </p>
            <p><span style="padding-right:30px">运费：</span><span style="font-weight: 700;">+ ¥ 0.00</span></p>
            <p class="price-total"><span>应付金额：</span><span class="price-red">¥ {{orderTotal}}</span></p>
          </div>

          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">收货信息</span>
              </div>
            </div>
          </div>
          <div style="height: 155px;padding: 20px 30px;">
            <p class="address">姓名：{{ userName }}</p>
            <p class="address">联系电话：{{ tel }}</p>
            <p class="address">详细地址：{{ streetName }}</p>
          </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." v-else>
          <div style="padding: 100px 0;text-align: center">
            获取该订单信息失败
          </div>
        </div>
      </div>
    </y-shelf>

    <el-dialog title="订单跟踪"
             :visible.sync="dialogTrackVisible"
             width="40%">
            <el-steps direction="vertical"
                      :active="stepActive"
                      finish-status="success"
                      space="50px">
              <el-step  v-for="item in TrackList"
                        :key="item.AcceptStation"
                        :title="item.AcceptStation"
                        :description="item.AcceptTime"></el-step>
            </el-steps>
    </el-dialog>

  </div>
</template>
<script>
  import { getOrderDet, cancelOrder , transpGet, transpTrack,receiptOrder,finishOrder} from '/api/goods'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  import countDown from '/components/countDown'
  // const countDown = () => import ('/components/countDown')
  import moment from 'moment'
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderStatus: 0,
        orderId: '',
        userName: '',
        tel: '',
        streetName: '',
        orderTitle: '',
        createTime: '',
        payTime: '',
        closeTime: '',
        sendTime: '',
        endTime: '',
        orderTotal:'',
        loading: true,
        countTime:'',
        transp:{
          logisticsCa:'',
          logisticsNo: ''
        },
        dialogTrackVisible: false,
        TrackList:[],
        stepActive: 0
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      orderPayment (orderId) {
        //window.open(window.location.origin + '/order/payment?orderId=' + orderId)
        window.location.href = window.location.origin + '/#/order/payment?orderId=' + orderId
      },
      goodsDetails (id) {
         window.location.href = window.location.origin + '/#/goodsDetails?productId=' + id
       // window.open(window.location.origin + '/goodsDetails?productId=' + id)
      },
      handleFinish(orderId){
        finishOrder({orderNo: orderId}).then(res => {
          if (res.status === 0) {
            this._getOrderDet()
          } else {
            this.message('取消失败')
          }
        })
      },
      _ReciptOrder(orderId){
        receiptOrder({orderNo: orderId}).then(res => {
          if (res.status === 0) {
            this._getOrderDet()
          } else {
            this.message('取消失败')
          }
        })
      },
      handleTrace(orderId){  
        this.dialogTrackVisible = true
        // this._transpGet(orderId)
        this._transpTrack()
        
      },
      async _transpGet(orderId){
         let params={
                orderNo:orderId
            }
        const res = await transpGet(params)
        if(res.status !== 0){
          this.$message.error(res.msg)
        }
        this.transp = res.data
      },
      async _transpTrack(){
        let params={
          params:{
            expCode: this.transp.logisticsCa,
            expNo: this.transp.logisticsNo
          }
        }
        const res = await transpTrack(params.params)
        if(res.status !==0){
          this.$message.error(res.msg)
        }
        if(res.data.Reason === "暂无轨迹信息"){
          this.TrackList = [{
            AcceptStation:"暂无轨迹信息",
            AcceptTime: "暂无轨迹信息"
            }]
        }else{
          this.TrackList = res.data.Traces
          this.stepActive = this.TrackList.length
        }
        
       },
      async _getOrderDet () {
        let params = {
             orderNo: this.orderId
        }
        const res = await getOrderDet(params)
        console.log(res)
        if(res.status === 0){
          if(res.data.status === 0){
              this.orderStatus = -1
          } else if(res.data.status === 10){
              this.orderStatus = 1
          } else if(res.data.status === 20){
              this.orderStatus = 2
          } else if(res.data.status === 30){
              this.orderStatus = 3
          } else if(res.data.status === 40){
              this.orderStatus = 4
          } else if(res.data.status === 50){
              this.orderStatus = 5
          } else if(res.data.status === 60){
              this.orderStatus = 6
          }
          if(this.orderStatus === 3){
            this._transpGet(this.orderId)
          }
          this.orderList = res.data.orderItemVoList
          this.orderTotal = await res.data.payment
          this.userName = res.data.receiverName
          this.tel = res.data.receiverPhone
          this.streetName = res.data.receiverAddress
          this.createTime = res.data.createTime
          this.payTime = res.data.paymentTime
          this.sendTime = res.data.sendTime
          this.closeTime = res.data.closeTime
          
            this.endTime = res.data.endTime
          
            let sdate=new Date(res.data.createTime)
            sdate.setMinutes(sdate.getMinutes()+30);
            var ss = sdate.getTime();
            this.countTime = (new Date(ss).toLocaleString('chinese',{hour12:false})).replace(/\//g,'-')
          
          this.loading = false
        } else {
          
        }


      },
      _cancelOrder () {
        cancelOrder({orderNo: this.orderId}).then(res => {
          if (res.status === 0) {
            this._getOrderDet()
          } else {
            this.message('取消失败')
          }
        })
      }
    },
    created () {
      
      this.userId = getStore('userId')
      this.orderId = this.$route.query.orderId
      this.orderTitle = '订单号：' + this.orderId
      this._getOrderDet()
      
    },
    components: {
      YShelf,
      countDown
    },
    filters: {
      formatDate: function(val){
         if(val == null || val == ''){
              return ''
          }
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .orderStatus {
    // display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -150px 40px 60px;
  }

  .orderStatus-close {
    // display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -800px 40px 60px;
  }

  .status-now {
    background: #F6F6F6;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 22px 30px 20px;
    margin: 0 30px 30px 30px;
    line-height: 38px;
  }

  .status-title {
    font-size: 18px;
    color: #666;
  }

  .button {
    float: right;
    margin: -37px 0 20px 0;
  }

  .realtime {
    border-top: 1px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 26px;
  }

  .red {
    color: #d44d44;
  }

  .address {
    line-height: 38px;
    word-wrap: break-word;
    word-spacing: normal;
    word-break: break-all;
    color: #626262;
  }

  .img-box {
    border: 1px solid #EBEBEB;
    margin-left: -80px;
  }
  
  img {
    display: block;
    @include wh(80px);
  }

  .goods-table {
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 165px;
        text-align: center;
      }
    }
    .cart-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 15px 0 15px 111px;
      border-bottom: 1px solid #EFEFEF;
      a {
        color: #333;
      }
    }
    .price {
      padding-left: 100px;
    }
    .goods-num {
      padding-left: 60px;
    }
  }

  .order-discount-line {
    padding: 22px 30px 20px;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 130px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 10px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }

  .price-total {
    height: 54px;
    line-height: 54px;
    font-size: 18px;
  }

  .price-red {
    font-weight: 700;
    color: #d44d44;
  }
  
</style>
