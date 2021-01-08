<template>
<div>


  <div class="box">
    <!-- <div class="basetable" v-loading="loading" element-loading-text="拼命加载中"> -->
    <!-- 虚机列表 -->

    <el-button style="margin-bottom: 30px;background-color:#FFAD1F;border-color:#FFAD1F" type="primary" @onchange="jiazai()"
      >基本信息</el-button
    >
    <el-button style="margin-bottom: 30px" type="primary" @click="license()"
      >license授权</el-button
    >
    <div class="a">
      <p>物理机信息</p>
      <el-table :data="tableData" stripe :cell-style="rowClass"
        :header-cell-style="headClass" style="width: 100%">
        <el-table-column prop="hostName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="connected" label="连接状态">
          <template slot-scope="scope">
            <span v-if="scope.row.connected == true">已连接</span>
            <span v-if="scope.row.connected == false">关机</span>
          </template>
        </el-table-column>
        <el-table-column prop="cpus" label="CPU"> </el-table-column>
        <el-table-column prop="memory" label="内存" >
        </el-table-column>
        <el-table-column prop="domains" label="运行中桌面" >
        </el-table-column>
        <el-table-column prop="freeMemory" label="空余内存" >
        </el-table-column>
        <!-- <el-table-column prop="name" label="绑定用户" width="120">
            </el-table-column> -->
        <el-table-column label="操作" width="500" fixed="right">
          <template slot-scope="scope">
            <el-button
              :disabled="disabledAdd"
             size="small"
              type="primary"
              plain
              @click="close(scope.$index, scope.row)"
              title="关机"
              >关机</el-button
            >
            <el-button
              :disabled="disabledAdd"
              size="small"
              type="primary"
              plain
              @click="open(scope.$index, scope.row)"
              title="重启"
              >重启</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button class="yes" style="margin-bottom: 30px" type="primary"
      :style="{ display: visibleSubmit }"
        @click="add"
        title="添加"
        >连接主机</el-button
      >
    </div>
    <div class="one">
      <p>软件信息</p>
      <div class="xiangO"></div>
    </div>
    <div class="two">
      <p>服务信息</p>
      <div class="xiangT"></div>
    </div>
    
    <!-- 设置界面 -->
  </div>
  <!-- TCP连接 -->
   <!-- <div class="tcp">
      <h1>TCP连接</h1>
      <div class="bottom">
        <p><span>label：</span> <input type="text" /></p>
        <p><span> FQDN/IP：</span><input rows="4" cols="20" /></p>
        <p><span>用户名：</span> <input type="text" /></p>
        <p><span> 密码：</span><input rows="4" cols="20" /></p>
        <el-button class="yes" @click="no" style="margin-bottom: 30px" type="primary"
          >取消</el-button
        >
        <el-button class="yes" @click="yes" style="margin-bottom: 30px" type="primary"
          >确认</el-button
        >
      </div>
    </div> -->
      <el-dialog title="TCP连接" :visible.sync="dialogFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="form">
        <el-form-item label="lable" :label-width="formLabelWidth">
          <el-input v-model="form.lable" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="FQDN/IP" :label-width="formLabelWidth">
          <el-input
            v-model="form.fqdn"
            auto-complete="off"
          >
          </el-input>
        </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            auto-complete="off"
          >
          </el-input>
        </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            auto-complete="off"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import reauest from "../../../apis/request.js";
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
const url1 = URL + "system/operateSystem";
export default {
  name: "system",
  data() {
    return {
      loading: true,
      tableData: [],
    dialogFormVisible: false,
      formLabelWidth: "80px",
      formWidth: "100px",
      form: {},
      currentIndex: "",
      disabledAdd: true,
       visibleSubmit: 'none',
    };
  },
  mounted() {
    this.jiazai();
    this.wode();
  },
  created() {
    //   设置回调函数，进行1.5秒的loading动画显示
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
     headClass () {
  return 'text-align: center;background:#eef1f6;'
},
rowClass () {
  return 'text-align: center;'
},
    add() {
      //   设置点击按钮之后进行显示对话框
      this.dialogFormVisible = true;
    },
    cancel(){
this.dialogFormVisible = false
    },
    update(){
this.axios({
   method: "post",
        url: URL + "host/setHost",
        params:{
          hostName:this.form.lable,
          hostAddress:this.form.fqdn,
          username:this.form.name,
          password:this.form.password,
          access_token:localStorage.getItem('token')
        }
}).then((res)=>{
  console.log(res)
})
    },
    wode() {
      let authority = sessionStorage.getItem("authority");
      // console.log(authority)
      if (authority == "ROLE_ADMIN") {
        this.disabledAdd = false;
      } else {
        this.disabledAdd = true;
      }
    },
    jiazai() {
      this.axios({
        method: "get",
        url: URL + "system/hostInfo",
        params: {
          access_token:localStorage.getItem("token"),
        },
      })
        .then((res) => {
          // console.log(res.data.code)
          if(res.data.code==0){
 this.tableData.push(res.data.data);
 this.visibleSubmit = 'none'
          }else{
            this.visibleSubmit = ''
          }
         
          // console.log(res.data)
        })
        .catch(function (error) {
          // console.log(error);
        });
    },

    open(index, row) {
      this.form = this.tableData[index];
      this.currentIndex = index;
      this.axios({
        method: "post",
        url: url1,
        params: {
          operation: "reboot",
          // uuid: this.form.uuid,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.code == 0) {
        }
      });
    },
    close(index, row) {
      this.form = this.tableData[index];
      this.currentIndex = index;
      this.axios({
        method: "post",
        url: url1,
        params: {
          operation: "shutdown",
          // uuid: this.form.uuid,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.code == 0) {
        }
      });
    },
    license() {
      this.$router.push({ path: "/license" });
    },
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
.box div {
  /* width: 90%; */
  margin-bottom: 50px;
}
.box p {
  background-color:#eef1f6;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  color: #282c34;
  font-weight: bold;
  padding-left: 40px;
  border-bottom: 1px solid white;
}
.el-dialog {
  width: 25%;
}
.el-table__row .el-table_1_column_2 {
  text-align: center;
}
.one .xiangO {
  width: 100%;
  height: 130px;
box-shadow: -0.5rem 0.3rem 0.5rem rgb(167 162 162 / 30%);
}
.two .xiangT {
  width: 100%;
  height: 130px;
  box-shadow: -0.5rem 0.3rem 0.5rem rgb(167 162 162 / 30%);}
.yes {
  margin-bottom: 30px;
  background-color: #465a61;
  margin: 0 auto;
  display: block;
  border: none;
}
.el-dialog{
  width: 50%;
}
</style>
 