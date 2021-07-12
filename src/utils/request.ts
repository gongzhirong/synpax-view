import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create()
http.defaults.baseURL = 'https:api.e-package.cn';

// 默认配置
http.defaults.timeout = 30000

// 请求拦截
http.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use((response: any) => {
  const whiteList = ['/tc/v1/account/wx_get_token'];
  if (!whiteList.includes(response.config.url) && response.data.code !== 0) {
    ElMessage.error(response.data.msg)
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default http