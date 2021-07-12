// https://shimo.im/docs/pYYdvwRkkHQJdRyr 接口文档

import { AxiosRequestConfig } from 'axios'
import http from '../utils/request'

// 获取包装配置器列表
export const getPackageList = () => http.get('/tc/v1/home/package_list')

// 获取案例分类列表
export const getCaseList = () => http.get('/tc/v1/home/case/case_list')

// 获取模版分类列表
export const getTypeList = () => http.get('/tc/v1/home/stencil/type_list')

// 根据分类id返回模版列表
export const getProductList = (options: AxiosRequestConfig) => http.post('/tc/v1/home/stencil/product_list', options.data)

// 根据装配器id或模版返回配置详情
export const packConfig = (options: AxiosRequestConfig) => http.post('/tc/v1/home/pack_config', options.data)

// 根据模版id返回配置id数组
export const configArray = (options: AxiosRequestConfig) => http.post('/tc/v1/home/config_array', options.data)

// 留言板留言
export const sendSuggest = (options: AxiosRequestConfig) => http.post('/tc/v1/home/send_suggest', options.data)

// 提交配置信息创建订单
export const sendSonfig = (options: AxiosRequestConfig) => http.post('/tc/v1/home/send_config', options.data)

// 提交配置信息创建订单
export const register = (options: AxiosRequestConfig) => http.post('/tc/v1/account/register', options.data)

// 发送验证码
export const sendVcode = (options: AxiosRequestConfig) => http.post('/tc/v1/account/send_vcode', options.data)

// 验证验证码
export const checkVcode = (options: AxiosRequestConfig) => http.post('/tc/v1/account/check_vcode', options.data)

// 登录
export const login = (options: AxiosRequestConfig) => http.post('/tc/v1/account/login', options.data)

// 获取用户资料(检查是否登录)
export const getUserinfo = (options: AxiosRequestConfig) => http.get('/tc/v1/user/get_userinfo', options)

// 修改用户资料
export const changeInfo = (options: AxiosRequestConfig) => http.post('/tc/v1/user/change_info', options.data)

// 获取站内信列表
export const newsList = (options: AxiosRequestConfig) => http.post('/tc/v1/user/news_list', options.data)

// 获取站内信详情
export const newInfo = (options: AxiosRequestConfig) => http.post('/tc/v1/user/new_info', options.data)

// 更改站内信状态
export const changeNewStatus = (options: AxiosRequestConfig) => http.post('/tc/v1/user/change_new_status', options.data)

// 更改站内信状态
export const orderList = (options: AxiosRequestConfig) => http.post('/tc/v1/user/order_list', options.data)

// 更改站内信状态
export const caseInfo = (options: AxiosRequestConfig) => http.post('/tc/v1/home/case/case_info', options.data)

// 获取用户未读消息数量
export const getUnreadNum = (options: AxiosRequestConfig) => http.get('/tc/v1/user/get_unread_num', options)

/**
 * Wechat  微信获取登录二维码
 * @param options 
 * @returns { ogin_img_url: '', cene_id": '' }
 */
export const wxGetCodeimg = (options?: AxiosRequestConfig) => http.get('/tc/v1/account/wx_get_codeimg', options)

/**
 * Wechat  根据scene_id获取登录token
 * @param options { scene_id: '' }
 * @returns { token: '' }
 */
export const wxGetToken = (options: AxiosRequestConfig) => http.get('/tc/v1/account/wx_get_token', options)

export default {
  getPackageList,
  getCaseList,
  getTypeList,
  getProductList,
  configArray,
  packConfig,
  sendSuggest,
  sendSonfig,
  login,
  getUserinfo,
  changeInfo,
  newsList,
  newInfo,
  changeNewStatus,
  orderList,
  caseInfo,
  getUnreadNum
}