import axios from "axios";
import { Message } from "element-ui";
// import { getToKen, getUserName } from "@/utils/app";

const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;
const service = axios.create({
  baseURL: BASEURL,
  // baseURL: 'http://111.62.51.42:8005',  
  timeout: 15000,   // 超时
  // 网络请求接口，假设 5000
  // 1000 2000，
});


/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 后台需要前端这边传相关的参数（在请求头添加参数）
  // Tokey
  // userId
  // sui
  // 业务需求
  // 最终目地不是在请求头添加参数
  // config.headers['Tokey'] = getToKen()
  // config.headers['UserName'] = getUserName()
  const token = window.localStorage.getItem('TOKEN')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data
  // 业务需求

  if (data.resCode !== 0) {
    Message.error(data.message);
    return Promise.reject(data);
  } else {
    return response;
    // return Promise.reject(data);
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;

/**
 * 使用export default时，但不能同时存在多个default。
 * 文件 import 不需要花括号，
 */