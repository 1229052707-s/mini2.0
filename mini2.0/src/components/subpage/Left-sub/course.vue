<template>
  <div class="course">
    <div class="left">
      <el-row :gutter="10">
        <el-col>
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height: 875px" @select="handleSelect" >
              <i class="el-icon-location"></i>
              <span>注册登录</span>
              <el-menu-item index="1"><i class="el-icon-message"></i>注册登录</el-menu-item>
              <i class="el-icon-location"></i>
              <span>使用教程</span>
              <el-menu-item-group>
                <span>云盘使用</span>
                <el-menu-item index="2"><i class="el-icon-menu"></i>上传</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>下载</el-menu-item>
              </el-menu-item-group>
                <el-menu-item-group>
                <span>云桌面使用</span>
                <el-menu-item index="4"><i class="el-icon-menu"></i>新建</el-menu-item>
                <el-menu-item index="5"><i class="el-icon-setting"></i>连接</el-menu-item>
                <el-menu-item index="6"><i class="el-icon-menu"></i>关机</el-menu-item>
                <el-menu-item index="7"><i class="el-icon-setting"></i>使用规则</el-menu-item>
                <el-menu-item index="8"><i class="el-icon-menu"></i>注意事项</el-menu-item>
              </el-menu-item-group>
              <i class="el-icon-location"></i>
              <span>其他问题</span>
              <p>
 <i class="el-icon-location"></i>
              <span>服务条款</span>
              </p>
              <el-menu-item-group>
              
                <el-menu-item index="9"><i class="el-icon-setting"></i>用户服务协议</el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="right">
      <el-col>
        <div style="margin-top: 10px">
          <router-view></router-view>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchCriteria: "",
      breadcrumbItems: ["导航一"],
    };
  },

  methods: {
    handleIconClick(ev) {
      console.log(ev);
    },

    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/login");
          this.breadcrumbItems = ["导航一"];
          break;
        case "2":
          this.$router.push("/jiaocheng");
          this.breadcrumbItems = ["导航二"];
          break;
        case "3":
          this.$router.push("/down");
          this.breadcrumbItems = ["导航三"];
          break;
          case "4":
          this.$router.push("/newlyBuild");
          this.breadcrumbItems = ["导航四"];
          break;
            case "5":
          this.$router.push("/connect");
          this.breadcrumbItems = ["导航五"];
          break;
          case "6":
          this.$router.push("/shutDown");
          this.breadcrumbItems = ["导航六"];
          break;
          case "7":
            this.$router.push("/usageRules");
            this.breadcrumbItems = ["导航七"];
            break;
            case "8":
              this.$router.push("/note");
              this.breadcrumbItems = ["导航八"];
              break;
              case "9":
              this.$router.push("/agreement");
              this.breadcrumbItems = ["导航九"];
              break;
      }
    },
  },
};
</script>
<style scoped>
.course {
  display: flex;
  width: 75%;
  margin-left: 15%;
}
.left {
  width: 20%;
  height: 300px;
  margin-top: 60px;
}
.right {
  width: 67%;
  height: 300px;
  background-color: tomato;
  margin-top: 70px;
  margin-left: 20px;
  border-radius: 5px;
}
</style>