<template>
  <div class="box">
    <!-- <div class="basetable" v-loading="loading" element-loading-text="拼命加载中"> -->
    <!-- 虚机列表 -->
    <el-button
      style="margin-bottom: 30px"
      type="primary"
      :style="{ display: visibleSubmit }"
      @click="xinjian"
      >新建虚机</el-button
    >
    <!-- <el-button style="margin-bottom: 30px" type="primary"
      >开机</el-button
    >
    <el-button style="margin-bottom: 30px" type="primary"
      >关机</el-button
    >
    <el-button style="margin-bottom: 30px" type="primary"
      >销毁</el-button
    > -->
    <el-dialog title="虚机信息" :visible.sync="dialogFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form>
        <el-form-item
          label="虚机名称"
          :label-width="formLabelWidth"
          title="请输入"
        >
          <el-input v-model="form.instanceName" maxlength="10" @input="e => form.instanceName = validForbid (e)" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内存大小" :label-width="formLabelWidth">
          <el-select
            type="number"
            v-model="form.memory"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </el-option> </el-select
          >MB
        </el-form-item>
        <el-form-item label="cpu个数" :label-width="formLabelWidth">
          <el-select
            type="number"
            v-model="form.vcpu"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.cpu"
              :value="item.value"
            >
            </el-option> </el-select
          >个
        </el-form-item>

        <el-form-item label="镜像" :label-width="formLabelWidth">
          <label slot="label">镜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像</label>
          <!-- <el-button @click="jingxiang"></el-button> -->
          <el-select
            v-model="form.isoName"
            @change="selectChange"
            class="filter-item"
            placeholder="选择镜像"
          >
            <el-option
              v-for="pile in piles"
              :key="pile"
              :label="pile"
              :value="pile"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="dilog"
      title="虚机信息"
      :visible.sync="dialogFormVisible1"
    >
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form>
        <el-form-item
          label="虚机名称"
          :label-width="formLabelWidth"
          title="请输入"
        >
          <el-input
            :disabled="true"
            v-model="form.instanceName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="内存大小" :label-width="formLabelWidth">
          <el-select
            type="number"
            v-model="form.memory"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.label"
            >
              {{ item.label }}
            </el-option> </el-select
          >MB
        </el-form-item>
        <el-form-item label="cpu个数" :label-width="formLabelWidth">
          <el-select
            type="number"
            v-model="form.vcpu"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.cpu"
              :value="item.value"
            >
            </el-option> </el-select
          >个
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="dilog"
      title="绑定用户"
      :visible.sync="dialogFormVisible2"
    >
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form>
        <el-form-item
          label="虚机名称"
          :label-width="formLabelWidth"
          title="请输入"
        >
          <el-input
            :disabled="true"
            v-model="form.instanceName"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户" :label-width="formLabelWidth">
          <label slot="label"
            >用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户</label
          >
          <el-select v-model="user" class="filter-item" placeholder="选择用户">
            <el-option
              v-for="item in piles1"
              :key="item.id"
              :label="item.username"
              :value="`${item.id}|${item.username}`"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update2">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="dilog"
      title="解绑用户"
      :visible.sync="dialogFormVisible3"
    >
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form>
        <el-form-item
          label="虚机名称"
          :label-width="formLabelWidth"
          title="请输入"
        >
          <el-input
            :disabled="true"
            v-model="form.instanceName"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户" :label-width="formLabelWidth">
          <label slot="label"
            >用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户</label
          >
          <el-input
            :disabled="true"
            v-model="form.user"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel3">取消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update3">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-button style="margin-bottom: 30px" type="primary" @click="jiazai"
      >刷新桌面</el-button
    > -->

    <!-- 信息列表 -->
    <el-table
      :data="tableData"
      :cell-style="rowClass"
      :header-cell-style="headClass"
      border
       stripe
       style="width: 100%"
    >
    <el-table-column label="序号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
      <el-table-column prop="instanceName" label="虚机名称">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'VIR_DOMAIN_RUNNING'">运行中</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_NOSTATE'">无状态</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_BLOCKED'">已锁定</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_PAUSED'">已暂停</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_SHUTDOWN'">已关机</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_SHUTOFF'">已停止</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_CRASHED'">已崩溃</span>
        </template>
      </el-table-column>
      <el-table-column prop="vcpu" label="CPU"> </el-table-column>
      <el-table-column prop="memory" label="内存/MB">
      </el-table-column>
      <!-- <el-table-column prop="" label="磁盘大小" width="110"> </el-table-column> -->
      <el-table-column label="操作" fixed="right" width="500">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-video-play"
            plain
            @click="open(scope.$index, scope.row)"
            title="开机"
            ></el-button
          >
          <el-button
            type="primary"
               size="small"
               icon="el-icon-switch-button
"
               plain
            @click="close(scope.$index, scope.row)"
            title="关机"
            ></el-button
          >
          <el-button
            type="primary"
               size="small"
               icon="el-icon-refresh"
               plain
            @click="reboot(scope.$index, scope.row)"
            title="重启"
            ></el-button
          >
          <el-button
            type="danger"
               size="small"
               icon="el-icon-switch-button"
               plain
            @click="force(scope.$index, scope.row)"
            title="强制关机"
            ></el-button
          >
          <!-- <el-button
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            title="编辑"
            >编辑</el-button
          > -->
          <el-button
            :style="{ display: visibleSubmit }"
            type="primary"
               size="small"
               icon="el-icon-connection"
                plain
                title="绑定"
            @click="bind(scope.$index, scope.row)"
            v-if="scope.row.user == null"
            ></el-button
          >
          <el-button
            :style="{ display: visibleSubmit }"
            type="danger"
               size="small"
                icon="el-icon-connection"
                plain
                title="解除绑定"
            @click="jieBind(scope.$index, scope.row)"
            v-else
            ></el-button
          >

          <el-button
            @click="over(scope.$index, scope.row)"
            type="danger"
               size="small"
            title="销毁"
             plain
            icon="el-icon-close"
         
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
   
    <!-- 设置界面 -->
  </div>
  <!-- </div> -->
</template>
 
<script>
import reauest from "../../../apis/request.js";
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
const url1 = URL + "instances/operateInstance";
export default {
   inject: ["reload"],
  name: "system",
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      options: [
        {
          value: "1024",
          label: 1024,
        },
        {
          value: "2048",
          label: 2048,
        },
        {
          value: "4096",
          label: 4096,
        },
        {
          value: "8192",
          label: 8192,
        },
      ],
      options1: [
        {
          value: 1,
          cpu: 1,
        },
        {
          value: 2,
          cpu: 2,
        },
        {
          value: 3,
          cpu: 3,
        },
        {
          value: 4,
          cpu: 4,
        },
      ],

      value: "",
      user: "",
      user1: "",

      visibleSubmit: "",

      loading: true,
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: "80px",
      formWidth: "100px",
      form: {},
      currentIndex: "",
      piles: [],
      piles1: [],
    };
  },
  created() {
    this.item = this.options[0].label;
  },
  mounted() {
    this.jiazai();
    this.getPiles();
    this.bindUsername();
    this.init();
  },
  methods: {
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    rowClass() {
      return "text-align: center;";
    },
    init() {
      let authority = sessionStorage.getItem("authority");
      if (authority == "ROLE_ADMIN") {
        this.visibleSubmit = "";
      } else {
        this.visibleSubmit = "none";
      }
    },
    selectChange(val) {},
    handleChange(file, fileList) {},

    //加载桌面
    jiazai() {
      this.axios({
        method: "get",
        url: URL + "instances/listInstance",
        params: {
          access_token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          // console.log(res.data.data);
          this.tableData = res.data.data;
          //  console.log(res.data.data)
          this.tableData.forEach((item) => {
            // console.log(item.user);
          });
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    handleClick(row) {
      return (row.status = !row.status);
    },
    // 新建虚机
    xinjian() {
      this.form = {
        instanceName: "",
        memory: "",
        vcpu: "",
        isoName: "",
      };
      this.dialogFormVisible = true;
    },
    // 取消新建
    cancel() {
      this.dialogFormVisible = false;
    },
    //创建新桌面
    update() {
      // console.log(this.form)
      this.axios({
        method: "post",
        url: URL + "instances/createInstance",

        params: {
          instanceName: this.form.instanceName,
          memory: this.form.memory,
          vcpu: this.form.vcpu,
          isoName: this.form.isoName,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(res)
        if (res.data.code == 0) {
          this.tableData.push(this.form);
          this.dialogFormVisible = false;
          location.reload();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      //
    },
    //查询镜像接口
    getPiles() {
      this.axios({
        method: "get",
        url: URL + "instances/getIso",
        params: {
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(res.data.data)
        this.piles = res.data.data;
      });
    },
    //重启
    reboot(index, row) {
      this.form = this.tableData[index];
      this.currentIndex = index;
      this.axios({
        method: "post",
        url: url1,
        params: {
          function: "reboot",
          uuid: this.form.uuid,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.code == 0) {
          // console.log("重启成功");
        }
        location.reload();
      });
    },
    // 强制关机
    force(index, row) {
      this.form = this.tableData[index];
      this.currentIndex = index;
      // console.log(this.form.uuid);

      this.axios({
        method: "post",
        url: url1,
        params: {
          function: "destroy",
          uuid: this.form.uuid,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.code == 0) {
        }
        location.reload();
      });
      // console.log(uuid)
    },
    //编辑虚机
    handleEdit(index, row) {
      this.form = this.tableData[index];
      this.currentIndex = index;

      this.dialogFormVisible1 = true;
    },
    //确认修改
    update1() {
      this.axios({
        method: "post",
        url: URL + "instances/updateInstance",
        params: {
          uuid: this.form.uuid,
          memory: this.form.memory,
          vcpu: this.form.vcpu,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.code == 0) {
        } else {
          alert("创建失败");
        }
      });
      this.dialogFormVisible1 = false;
    },
    //取消修改
    cancel1() {
      this.dialogFormVisible1 = false;
    },
    open(index, row) {
      this.form = this.tableData[index];
      this.currentIndex = index;
      this.axios({
        method: "post",
        url: url1,
        params: {
          function: "start",
          uuid: this.form.uuid,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.code == 0) {
          location.reload();
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
          function: "shutdown",
          uuid: this.form.uuid,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.code == 0) {
          location.reload();
        }
      });
    },
    //暂停
    // suspend() {},
    //保存
    // preserve() {},
    //绑定
    bind(index, row) {
      this.form = this.tableData[index];
      this.currentIndex = index;

      this.dialogFormVisible2 = true;
    },

    bindUsername() {
      this.axios({
        method: "get",
        url: URL + "user/users",
        params: {
          access_token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          this.piles1 = res.data.data;
          // console.log(this.piles1)
          res.data.data.forEach((id) => {
            // console.log(id.id)
          });
        })
        .catch(function (error) {
          // console.log(error);
        });
    },

    //解绑
    jieBind(index, row) {
      // console.log(this.form.uuid);
      this.form = this.tableData[index];
      this.currentIndex = index;
      this.dialogFormVisible3 = true;
    },
    //查看
    // look() {},
    //销毁
    over(index, row) {
      // console.log(this.form.uuid);

      this.$confirm("永久销毁该桌面，是否继续?(确认关机后销毁)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.form = this.tableData[index];
        this.currentIndex = index;
        this.axios({
          method: "post",
          url: url1,
          params: {
            function: "undefine",
            uuid: this.form.uuid,
            access_token: localStorage.getItem("token"),
          },
        }).then((res) => {
          if (res.data.code == 0) {
            this.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "销毁成功!",
              
            });
            this.reload();
          }else{
              this.$message({
              type: "warning",
              message: "请关机后销毁!",
              
            });
          }
         
        });
      });
    },
    cancel2() {
      this.dialogFormVisible2 = false;
    },
    //确认绑定
    update2() {
      if (this.user) {
        const [lable, value] = this.user.split("|");
        // console.log(value,lable)
        this.user = lable;
      }
      this.axios({
        method: "post",
        url: URL + "instances/bindDesk",
        params: {
          uuid: this.form.uuid,
          userId: this.user,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if ((res.data.code = 0)) {
          this.reload()
          this.dialogFormVisible2 = false;
        }
      });

      location.reload();
    },
    //确认解绑
    update3() {
      this.axios({
        method: "post",
        url: URL + "instances/bindDesk",
        params: {
          uuid: this.form.uuid,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if ((res.data.code = 0)) {
          this.dialogFormVisible3 = false;
        }
      });
      location.reload();
    },
    cancel3() {
      this.dialogFormVisible3 = false;
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style scoped>
@import "../../css/CloudDisk";
.el-dialog {
  width: 25%;
}
</style>
 