<template>
  <div class="box">
    <el-button style="margin-bottom: 30px" type="primary" @click="jiben"
      >基本信息</el-button
    >
    <el-button style="margin-bottom: 30px;background-color:#FFAD1F;border-color:#FFAD1F" type="primary" @click="license()"
      >license授权</el-button
    >
    <div class="shou">
      <h1>授权</h1>
      <div class="bottom">
        <p><span> 注册号：</span> <input type="text" v-model="text" /></p>
        <p><span> 激活码：</span> <el-upload
        style="margin-left: 40px;"
          class="upload-demo"
          ref="upload"
          :multiple="false"
          action="void"
          :http-request="customUpload"
          :on-remove="handleRemove"
          :on-progress="progressA"
          :file-list="fileList"
        
          :auto-upload="true"
          
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
        </el-upload></p>
        <el-button class="yes" style="margin-bottom: 30px" type="primary"
          >确认</el-button
        >
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
      text:'',
    };
  },
  mounted(){
this.zhuce();
  },
  methods: {
    jiben() {
      this.$router.push({ path: "/system" });
    },
    // 注册码
    zhuce(){
      this.axios({
        method:'get',
        url:URL+'register/registerCode',
        params:{
          // pagesize:this.pagesize,
          access_token: localStorage.getItem("token"),
        },
      }).then((res)=>{
        this.text =res.data;
        console.log(res.data)
      })

    }
  },
};
</script>
<style scoped>
.box {
   width: 88%;
    margin-left: 200px;
    border-radius: 10px;
    height: 800px;
    margin-top: 110px;
}
.shou h1 {
  font-size: 24px;
  color: white;
  height: 70px;
  line-height: 70px;
  background-color: #4390dd;
  font-weight: bold;
  padding-left: 40px;
}
.shou p {
  display: flex;
  height: 70px;
  width: 80%;
  margin: 0 auto;
  border-bottom: 3px solid #ebeef5;
  line-height: 70px;
}
.shou p span {
  margin-left: 25%;
}
.shou p input {
  margin-left: 20%;
  height: 35px;
  width: 250px;
  border-radius: 5px;
  border: none;
  border: 1px solid #efefef;
  outline: none;
}
.shou p textarea {
  width: 250px;
  margin-left: 20%;
  outline: none;
  border: none;
  border: 1px solid #efefef;
  resize: none;
}
.bottom {
  height: 250px;
  box-shadow: -0.5rem 0.3rem 0.5rem rgb(167 162 162);
}
.yes {
  margin: 0 auto;
  width: 100px;
  display: block;
  height: 40px;
  margin-top: 40px;
}

</style>