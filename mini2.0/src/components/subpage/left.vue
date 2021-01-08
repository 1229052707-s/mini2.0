<template>
  <div style="height: 100%">
    <div class="item_bock head_p" id="Top">
     
      <div class="TopO">
        <i
          @click="icon1"
          class="gan el-icon-warning-outline"
          title="公司信息"
        ></i>
        <!-- <i @click="icon2" class="el-icon-question" title="使用教程"></i> -->
        <i @click="icon3" class="el-icon-notebook-1" title="操作日志"></i>
      </div>
      <!-- 用户操作 -->
      <div class="top">
        <el-dropdown trigger="click">
          <div class="head_img">
            <!-- <img :src="avatar"/> -->
            <!-- 图片地址动态绑定 -->

           <i class="el-icon-s-custom"></i> 欢迎您！ <span>{{ title }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" @click.native="forget"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-circle-plus"
              @click.native="loginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-row class="tac" style="height: 100%">
      
      <el-col :span="12" style="height: 100%">
         <div class="topL">
        <a href=""><img src="../../assets/img/logo (2).png" alt="" /></a>
      </div>
        <!-- <h5>默认颜色</h5> -->
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          :router="true"
          style="height: 100%"
           @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item
            class="el-menu-item"
          index="/page"
            @click="goTo('/page')"
          >
            <i class="el-icon-s-home"></i>
            <span slot="title"
              >首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span
            >
          </el-menu-item>
          <el-menu-item
            class="el-menu-item"
           index="/CloudDisk"
            @click="goTo('/CloudDisk')"
          >
            <i class="el-icon-s-platform"></i>
            <span slot="title">云&nbsp;桌&nbsp;面</span>
          </el-menu-item>
          <el-menu-item
            class="el-menu-item"
          index="/disk"
            @click="goTo('/disk')"
          >
            <i class="el-icon-folder-opened"></i>
            <span slot="title"
              >云&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;盘</span
            >
          </el-menu-item>
          <el-menu-item
            class="el-menu-item"
              index="/acousticImage"
            @click="goTo('/acousticImage')"
           
          >
            <i class="el-icon-s-promotion"></i>
            <span slot="title"
              >镜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像</span
            >
          </el-menu-item>
          <el-menu-item
            class="el-menu-item"
            index="/number"
            @click="goTo('/number')"
          >
            <i class="el-icon-s-custom"></i>
            <span slot="title">账户管理</span>
          </el-menu-item>
          <el-menu-item
            class="el-menu-item"
            index="/system"
            @click="goTo('/system')"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <router-view></router-view>
    </el-row>
  </div>
</template>
<script>
import number from "../../components/subpage/Left-sub/number";
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
export default {
  components: {
    number,
  },
  data() {
    return {
      avatar: "../../../static/img/9.png",
      title: sessionStorage.getItem("name"),
    };
  },
  methods: {
handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    goTo(path) {
     
      this.$router.replace(path);

    },
    //退出登录
    loginOut() {
      this.axios({
        method: "post",
        url: URL + "user/logout",
        params: {
          access_token:localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(res.data)
        if (res.data.code == 0) {
          window.localStorage.clear();
          this.$router.push({ path: "/login" });
        }else{
           window.localStorage.clear();
          this.$router.push({ path: "/login" });
        }
      });
    },
    icon1() {
      this.$router.push({ path: "/synopsis" });
    },
    icon2() {
      this.$router.push({ path: "/course" });
    },
    icon3() {
      this.$router.push({ path: "/journal" });
    },
    //   })
    // }
    //跳转修改密码页面
    forget() {
      this.$router.push({ path: "/ChangeSecret" });
    },
  },
};
</script>
<style scoped>
@import "../css/left";
</style>
