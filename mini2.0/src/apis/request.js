// import { Service } from "./Service";
import url from "postcss-url";
const Url = 'http://192.168.0.145:8081'
    // 登录
export function register() {
    return Service({
        url: Url + '/oauth/token',
        method: 'post'
    })
}
//忘记密码
export function onSubmit() {
    return Service({
        url: Url + '/user/changePass',
        method: 'post'
    })
}
//退出登录
export function logOut() {
    return Service({
        url: Url + '/api/user/logOut',
        method: 'post'
    })
}
// 强制关机
export function force() {
    return Service({
        url: Url + '',
        method: 'get'
    })
}
//暂停
export function suspend() {
    return Service({
        url: '',
        method: 'get'
    })
}
//保存
export function preserve() {
    return Service({
        url: '',
        method: 'get'
    })
}
//绑定用户
export function bind() {
    return Service({
        url: '',
        method: 'get'
    })
}
//查看
export function look() {
    return Service({
        url: '',
        method: 'get'
    })
}
//销毁
export function over() {
    return Service({
        url: '',
        method: 'get'
    })
}
//用户账号
//添加账号
export function add() {
    return Service({
        url: '',
        method: 'get'
    })
}
//删除账号
export function handleDelete() {
    return Service({
        url: '',
        method: 'grt'
    })
}
//系统设置
//