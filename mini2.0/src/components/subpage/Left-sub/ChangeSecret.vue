<template>
  <div class="card">
    <p class="tiao">账户安全</p>
    <div class="smallBox">
      <!-- <div class="login-Ban">
        <span>
          <img :src="imgUrl" />
        </span>
        <p>栎安云</p>
      </div>-->
      <div class="login-Info">
        <div class="login-info-msg">
          <span>旧密码</span>
          <input type="password" placeholder="旧密码" v-model="pwdId" />
        </div>
        <div class="login-info-msg">
          <span>新密码</span>
          <input type="password" placeholder="新密码" v-model="newId" />
        </div>

        <div class="login-info-msg">
          <span>确认密码</span>
          <input type="password" placeholder="确认密码" v-model="repeatId" />
        </div>
        <div class="yes">
          <el-button class="login_btn" @click.native="no" type="primary" plain>重置</el-button>
          <el-button class="login_btn" @click.native="yes" type="primary" plain>确认修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
export default {
  data() {
    return {
      pwdId: "",
      newId: "",
      repeatId: "",
      imgUrl: require("@/assets/img/favicon.jpg"),
      eye: true,
      inputType: ""
    };
  },
  methods: {
    no() {
      this.pwdId = "";
      this.newId = "";
      this.repeatId = "";
    },
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
    yes() {
      if (!this.pwdId) {
        this.$message.error("旧密码");
        return;
      }
      if (!this.newId) {
        this.$message.error("新密码");
        return;
      }
      if (this.newId === this.pwdId) {
        this.$message.error("新密码不能与原密码相同!");
        return;
      }
      if (!this.repeatId) {
        this.$message.error("确认密码");
        return;
      }
      if ((this.repeatId = this.newId)) {
        this.$message.error("确认密码与新密码不同，请重新设置!");
        return;
      }
      this.axios({
        method: "post",
        url: URL + "user/changePasss",
        params: {
          oldPassword: this.pwdId,
          newPassword: this.newId,
          access_token: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          console.log(1);
          this.$router.push({ path: "/login" });

          // this.$router.push({ path: "/login" });
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../../css/ChangeSecret";
</style>