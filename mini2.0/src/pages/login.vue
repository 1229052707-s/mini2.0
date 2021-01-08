<template>
  <div class="hello">
      <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="20"
        shapeType="circle"
        :particleSize="4"
        linesColor="#FFFFFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
         class="card"
      :style="{ backgroundImage: 'url(' + cardPath + ')' }"
      >
      </vue-particles>
    <div class="smallBox">
      <div class="login-Ban">
        <span>
          <img :src="imgUrl" />
        </span>
        <p>栎安云</p>
      </div>
      <div class="login-Info">
        <div class="login-info-msg">
          <input type="text" placeholder="请输入用户名" v-model="nameId" />
        </div>
        <p></p>
        <div class="login-info-msg">
          <input
            :type="inputType"
            @keyup.enter="login"
            placeholder="请输入密码"
            v-model="pwdId"
          />
          <div class="xym4" v-if="eye" @click="showPassword">
            <img src="../../static/img/open.png" />
          </div>
          <div class="xym4" v-else @click="showPassword">
            <img src="../../static/img/close.png" />
          </div>
        </div>
        <p></p>

       
        <!-- <el-button class="forget" @click="xiu" type="primary" plain>忘记密码？</el-button> -->

        <el-button
          class="login_btn"
          @click.native="login"
          type="primary"
          :loading="isBtnLoading"
          >登录</el-button
        >
         <!-- <span @click="forget" class="forget">已有账号,忘记密码？</span> -->
      </div>
    </div>
  </div>
</template>
 <script>
// import {register} from '../apis/request'
import axios from "axios";
import cardPath from "@/assets/img/fuwu.jpg";
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
export default {
  data() {
    return {
      nameId: "",
      pwdId: "",
      // scope: "server",
      cardPath: cardPath,
      imgUrl: require("@/assets/img/favicon.jpg"),
      isBtnLoading: false,
      eye: false,
      inputType: "password",
    };
  },
  created() {
    if (
      JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).nameId
    ) {
      this.nameId = JSON.parse(localStorage.getItem("user")).userName;
      this.pwdId = JSON.parse(localStorage.getItem("user")).pwdId;
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return "登录中...";
      return "登录";
    },
  },
  methods: {
    showPassword() {
      var me = this;
      if (me.eye) {
        me.eye = false;
        me.inputType = "password";
      } else {
        me.eye = true;
        me.inputType = "text";
      }
    },
    login() {
      if (!this.nameId || !this.pwdId) {
        this.$message.error("信息不能为空");
      } else {
        this.axios({
          method: "post",
          url: URL + "oauth/token",
          params: {
            username: this.nameId,
            password: this.pwdId,
            grant_type: "password",
            scope: "server",
            client_id: "mini",
            client_secret: "mini",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then((res) => {
          res.data.roles.forEach((item)=>{
            // console.log(item.authority)
            sessionStorage.setItem("authority",item.authority)
          })
          if (res.data.code==0) {
             sessionStorage.setItem("name", this.nameId);
            localStorage.setItem("token", res.data.access_token);
             this.$router.push({ path: "/left" });
           
          }
        }).catch(data=>{
          // console.log(data.response.data.code)
           this.$message.error(data.response.data.message)
        })
          
        
      }
    },
  },
};
</script>
<style scoped>
@import '../components/css/login';
</style>