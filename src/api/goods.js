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
  return http.fetchPost(`${baseUrl}/user/addressList`, params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost(`${baseUrl}/user/addressUpdate`, params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost(`${baseUrl}/user/addressAdd`, params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost(`${baseUrl}/user/addressDel`, params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost(`${baseUrl}/user/payMent`, params)
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
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost(`${baseUrl}/users/delOrder`, params)
}
