import Service from '../apis/Service'
const URL = "http://192.168.0.125:8081/mini/";
export function loginReq(username, password) {
    return Service.post(URL + 'oauth/token', {
        loginName: username,
        loginPassword: password
    })
}