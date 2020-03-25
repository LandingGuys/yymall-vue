import http from './public'
const baseUrl = '/api'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost(`${baseUrl}/user/login`, params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchPost(`${baseUrl}/user/logout`, params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet(`${baseUrl}/user`, params)
}
// 用户名验证
export const checkName = (params) => {
  return http.fetchGet(`${baseUrl}/user/checkName`, params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost(`${baseUrl}/user/register`, params)
}
// 获取邮箱验证码
export const email = (params) => {
  return http.fetchGet(`${baseUrl}/user/email`, params)
}
// 获取手机验证码
export const phone = (params) => {
  return http.fetchGet(`${baseUrl}/user/phone`, params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost(`${baseUrl}/file/baseUpload`, params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPut(`${baseUrl}/user`, params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet(`${baseUrl}/products`, params)
}
// 推薦
export const recommend = (params) => {
  return http.fetchGet('/products/recommend', params)
}
// 第三方登录
export const oauth = (params) => {
  return http.fetchPost(`${baseUrl}/oauth/` + params, params)
}
//
export const navList = (params) => {
  return http.fetchGet(`${baseUrl}/categories`, params)
}
// 修改用户名
export const updateUser = (params) => {
  return http.fetchPut(`${baseUrl}/user`, params)
}
// 发送邮箱验证码
export const sendEmailCode = (params) => {
  return http.fetchGet(`${baseUrl}/user/sendEmail`, params)
}
// 邮箱验证
export const checkEmail = (params) => {
  return http.fetchGet(`${baseUrl}/user/checkEmail`, params)
}
// 手机验证
export const checkPhone = (params) => {
  return http.fetchGet(`${baseUrl}/user/checkPhone`, params)
}
