<template>
  <div class="box">
    <div class="selectMenu">
      <!-- 点击触发add方法 -->
      <el-button
        type="primary"
        :style="{ display: visibleSubmit }"
        @click="add"
        title="添加"
        >添加用户</el-button
      >
      <!-- <el-button style="margin-bottom: 30px" type="primary" @click="jiazai"
        >刷新用户</el-button
      > -->
    </div>
    <div class="tableMain">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        :rules="rule"
         stripe
        :cell-style="rowClass"
        :header-cell-style="headClass"
      >
        <el-table-column label="序号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column
          prop="username"
          label="用户名"
        
        ></el-table-column>
        <el-table-column prop="type" label="用户类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 0">管理员</span>
            <span v-if="scope.row.type == 1">普通用户</span>
          </template></el-table-column
        >
        <el-table-column prop="status" label="用户状态" >
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">启用中</span>
            <span v-if="scope.row.status == 1">禁用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"  width="200"
        ></el-table-column>
        <!-- <el-table-column prop="password" label="密码" width="120"></el-table-column> -->
        <el-table-column label="操作" width="500" fixed="right">
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
            <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->

            <el-button
              :style="{ display: visibleSubmit }"
              size="small"
              type="primary"
              plain
              @click="handleDelete(scope.$index, scope.row)"
              >重置密码</el-button
            >
            <el-button
              :style="{ display: visibleSubmit }"
              size="small"
              type="primary"
              plain
              @click="Delete(scope.$index, scope.row)"
              >删除用户</el-button
            >
           
             <el-button
            :style="{ display: visibleSubmit }"
             size="small"
              type="primary"
              plain
            @click="start(scope.$index, scope.row)"   
                    v-if="scope.row.status == 1"  
            >启用</el-button
          >
           <!-- v-else -->
          <el-button
            :style="{ display: visibleSubmit }"
            size="small"
              type="primary"
              plain
            @click="stop(scope.$index, scope.row)"
           v-else
            >禁用</el-button
          >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        :page-sizes="[5, 10, 20, 40]"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,sizes,  prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    <!-- 下面这个用来设置点击添加按钮的弹出框，里面可以进行嵌套表格来展示弹出的表格信息,使用下面的:visible.sync来控制显示与否 -->
    <!-- 里面绑定的是我们新设置的值，填写完成后，将我们这个新值塞到页面中所有的数据当中去 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :value="form.name" @input="e => form.name = validForbid (e)" maxlength="10" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" >
          <el-input
            :type="inputType"
            v-model="form.address"
            auto-complete="off"
            maxlength="10"
          >
          </el-input>
          <div class="xym4" v-if="eye" @click="showPassword">
            <img src="../../../../static/img/open.png" />
          </div>
          <div class="xym4" v-else @click="showPassword">
            <img src="../../../../static/img/close.png" />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- </div> -->
</template>
 
<script>
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
export default {
  data() {
    return {
      loading: true,
      //   表格的数据
      tableData: [],
      rule: {
     name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
        }
     ],
      },
      currentPage: 1,
      pagesize: 5,
      dialogFormVisible: false,
      formLabelWidth: "110px",
      // 设置form用于进行添加的时候绑定值
      form: {
        name:''
      },
      value6: "",
      currentPage3: 1,
      currentIndex: "",
      eye: false,
      inputType: "password",
      visibleSubmit: "",
      visibleSubmit1: "",
      visibleSubmit2: "",
    };
  },
  mounted() {
    this.jiazai();
    this.init();
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
    init() {
      let authority = sessionStorage.getItem("authority");
      // console.log(authority)
      if (authority == "ROLE_ADMIN") {
        this.visibleSubmit = "";
      } else {
        this.visibleSubmit = "none";
      }
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
    //加载用户
    jiazai() {
      this.axios({
        method: "get",
        url: URL + "user/users",
        params: {
          // pagesize:this.pagesize,
          access_token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          this.tableData = res.data.data;
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    showTime() {
      this.$alert(this.value6, "起止时间", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: "已显示",
          });
        },
      });
    },
    // 增加数据的方式，单独的设置一些值，用于增加功能，这些值放在对象里面进行设置，然后将这个新增的对象塞到总数据里面
    add() {
      this.form = {
        date: "",
        name: "",
        region: "",
        address: "",
      };
      //   设置点击按钮之后进行显示对话框
      this.dialogFormVisible = true;
    },
    //添加用户
    update() {
      if (this.form.name == "" || this.form.address == "") {
        this.$message.error("添加失败,用户名和密码不能为空");
      } else {
        this.axios({
          method: "post",
          url:
            URL +
            "user/adduser?access_token=" +
            localStorage.getItem("token"),
          params: {
            username: this.form.name,
            password: this.form.address,
          },
        }).then((res) => {
          // console.log(res.data.data.code)

          if (res.data.data.code == 0) {
            this.tableData.push(this.form);
            location.reload();
          } else {
            this.$message.error(res.data.data.msg);
          }
        });

        this.dialogFormVisible = false;
      }
    },
    handleEdit(index, row) {
      // 将数据的index传递过来用于实现数据的回显
      this.form = this.tableData[index];
      this.currentIndex = index;
      // 设置对话框的可见
      this.dialogFormVisible = true;
    },
    //重置密码
    handleDelete(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("重置后密码为：123456, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据

        this.form = this.tableData[index];
        this.currentIndex = index;
        this.axios({
          url: URL + "user/reset/" + this.form.id,
          method: "post",

          params: {
            access_token: localStorage.getItem("token"),
          },
        }).then((res) => {
          if (res.code == 0) {
          }
        });
      });
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "取消重置"
      //   });
      // });
    },
    //删除用户
    Delete(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.form = this.tableData[index];
          this.currentIndex = index;
          this.axios({
            method: "post",
            url: URL + "user/deluser",
            params: {
              id: this.form.id,
              del: 0,
              access_token: localStorage.getItem("token"),
            },
          }).then((res) => {
            // console.log(res)
            if (res.code == 0) {
            }
            this.tableData.splice(index, 1);
           this.$message({
              type: "success",
              message: "删除成功!",
            });
            // location.reload()
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //启用
      start(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("确认启用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.form = this.tableData[index];
          this.currentIndex = index;
          // console.log(this.form)
          this.axios({
            method: "post",
            url: URL + "user/lock",
            params: {
              id: this.form.id,
              flag: 0,
              access_token: localStorage.getItem("token"),
            },
          }).then((res) => {
            // console.log(res.data.code)
            if (res.data.code == 0) {
             this.$message({
              type: "success",
              message: "启用成功",
            });
            // this.visibleSubmit=''
            }
            // this.tableData.splice(index, 1);
            
            location.reload()
            
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    
//禁用

    stop(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("确认禁用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.form = this.tableData[index];
          this.currentIndex = index;
          this.axios({
            method: "post",
            url: URL + "user/lock",
            params: {
              id: this.form.id,
              flag: 1,
              access_token: localStorage.getItem("token"),
              
            },
            
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
              type: "success",
              message: "禁用成功!",
            });
              // this.visibleSubmit='none'
            }
            // this.tableData.splice(index, 1);
            
            location.reload()
            // console.log(this.pagesize)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    cancel() {
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible = false;
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  activated() {
    this.Delete();
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
.basetable {
  width: 90%;
}

.tableMain {
  margin-top: 10px;
}

.page {
  float: left;
  margin-top: 10px;
}
.xym4 {
  margin-left: 90%;
  position: absolute;
  top: 10%;
}
.xym4 img {
  width: 70%;
}
.el-table td, .el-table th.is-leaf{
  text-align: center;
}

</style>


