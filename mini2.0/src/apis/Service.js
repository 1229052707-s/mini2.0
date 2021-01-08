import axios from 'axios'
// import qs from 'qs'
import { Message, Loading } from 'element-ui'
const ConfigBaseURL = 'https://localhost:3000/' //默认路径，这里也可以使用env来判断环境
let loadingInstance = null //这里是loading
    //使用create方法创建axios实例
const Service = axios.create({
    baseURL: 'api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function(data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data);
    }],
});
// 添加请求拦截器
Service.interceptors.request.use(config => {
        loadingInstance = Loading.service({
            lock: true,
            text: 'loading...'
        })
        return config
    })
    // 添加响应拦截器
Service.interceptors.response.use(response => {
    loadingInstance.close()
        // console.log(response)
    return response.data
}, error => {
    console.log('TCL: error', error)
    const msg = error.Message !== undefined ? error.Message : ''
    Message({
        message: '网络错误' + msg,
        type: 'error',
        duration: 3 * 1000
    })
    loadingInstance.close()
    return Promise.reject(error)
})
export default Service;