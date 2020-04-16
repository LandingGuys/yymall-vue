import http from './public'
const baseUrl = '/api'
// 电脑列表
// export const getComputer = (params) => {
//   return http.fetchGet(`${baseUrl}/products`, params)
// }
export const getAllGoods = (params) => {
  return http.fetchGet(`${baseUrl}/products`, params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchGet(`${baseUrl}/carts`, params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost(`${baseUrl}/carts`, params)
}
// // 批量加入购物车
// export const addCartBatch = (params) => {
//   return http.fetchPost(`${baseUrl}/goods/addCartBatch`, params)
// }
// 删除购物车
export const cartDel = (params) => {
  return http.fetchDelete(`${baseUrl}/carts/` + params.productId, params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPut(`${baseUrl}/carts/`, params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPut(`${baseUrl}/carts/selectAll`, params)
}
// 删除购物车勾选商品
export const delCartChecked = (params) => {
  return http.fetchPost('/member/delCartChecked', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchGet(`${baseUrl}/shippings`, params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPut(`${baseUrl}/shippings/` + params.shippingId, params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost(`${baseUrl}/shippings`, params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchDelete(`${baseUrl}/shippings/` + params.addressId, params)
}
// 提交订单
export const submitOrder = (params) => {
  return http.fetchPost(`${baseUrl}/user/orders`, params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost(`/pay/create`, params)
}
export const queryByOrderId = (params) => {
  return http.fetchGet(`/pay/queryByOrderId`, params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet(`${baseUrl}/products/` + params.id, params)
}
// 获取用户订单列表
export const orderList = (params) => {
  return http.fetchGet(`${baseUrl}/user/orders`, params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet(`${baseUrl}/user/orderDetail/` + params.orderNo, params)
}
// 确认收货
export const receiptOrder = (params) => {
  return http.fetchPut(`${baseUrl}/user/orderReceipt/` + params.orderNo, params)
}
// 完成订单
export const finishOrder = (params) => {
  return http.fetchPut(`${baseUrl}/user/orderFinish/` + params.orderNo, params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPut(`${baseUrl}/user/orderDetail/` + params.orderNo, params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchDelete(`${baseUrl}/user/order/` + params.orderNo, params)
}
// 获取物流信息
export const transpGet = (params) => {
  return http.fetchGet(`${baseUrl}/transportation`, params)
}
// 获取物流运输轨迹
export const transpTrack = (params) => {
  return http.fetchPost(`${baseUrl}/transportation/track`, params)
}
// 快速搜索
export const getQuickSearch = (params) => {
  return http.fetchGet(`${baseUrl}/products/search`, params)
}
