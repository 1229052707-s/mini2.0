// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import ElementUI from 'element-ui'
import VueParticles from 'vue-particles'

import 'element-ui/lib/theme-chalk/index.css'
import { message } from '../message'

import Vue from 'vue'
import App from './App'
import echarts from 'echarts'
import qs from 'qs';
Vue.prototype.$qs = qs
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VeRing from 'v-charts/lib/ring.common' // 环形图

Vue.component(VeRing.name, VeRing)
    // import qs from 'qs';
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Vue.config.productionTip = false
Vue.use(VueParticles)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://api.example.com';
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.prototype.$message = message;
Vue.use(VueAxios, axios)
    // 注册element-ui
Vue.use(ElementUI)
    // Vue.prototype.$cookie = cookie; 
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.validForbid = function (value) {
    value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
    return value;
  }
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})