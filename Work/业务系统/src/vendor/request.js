import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
// import store from './store'
import { getToken } from './auth'
import errorCode from './errorCode'
import { tansParams } from '../utils/validate'

const axiosJson = { 'Content-Type': 'application/json;charset=utf-8' }
const axiosForm = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }

const service = axios.create({
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  const message = errorCode[code] || res.data.msg || errorCode['default']
  // if (code === 401) {
  //  
  // } else if (code === 500) {
  //   Message({
  //     message: message,
  //     type: 'error'
  //   })
  //   return Promise.reject(new Error(message))
  // } else if (code !== 200) {
  //   Notification.error({
  //     title: message
  //   })
  //   return Promise.reject('error')
  // } else {
  //   return res.data
  // }
  return res.data
},
  error => {
    MessageBox.confirm(
      '登录状态已过期，您可以继续留在该页面，或者重新登录',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      window.location.href = process.env.ENV_URL_LOGIN
    })
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url, params, filename) {
  return service.post(url, params, {
    transformRequest: [(params) => {
      return tansParams(params)
    }],
    responseType: 'blob'
  }).then((data) => {
    const content = data
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }).catch((r) => {
    console.error(r)
  })
}

export default service
export { axiosForm, axiosJson }
