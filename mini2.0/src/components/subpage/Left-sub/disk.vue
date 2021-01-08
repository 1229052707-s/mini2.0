<template>
  <div class="box">
      
    <div @change="open"></div>
    <!-- 虚机列表 -->
    <div>
   <el-input
        class="put"
        placeholder="文件夹名称"
        v-model="text"
      ></el-input>
      <!-- <el-button>查询文件</el-button> -->
      <el-button style="margin-left: 65px" type="primary" @click="xinjian"
        >新建文件夹</el-button
      >
    </div>
    <div class="bigBox">
      <div class="topOne">
        <!-- //自动查询 -->

        <el-table  
       
        stripe
          :data="
           tables.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          :cell-style="rowClass"
        :header-cell-style="headClass"  
        >
          <el-table-column width="80">
            <template slot-scope="scope">
              <img
                @click="erji(scope.row)"
                src="../../../../static/img/folder.png"
                alt=""
              />
            </template>
          </el-table-column>
     
          <el-table-column prop="diskName" label="文件夹名称" width="100">
            
          </el-table-column>
         <el-table-column label="上传">
           <template slot-scope="scope">
              <el-upload
                :action="action(scope.row)"
                :show-file-list="false"
                accept=".rar,.zip,.doc,.docx,.pdf"
                mulitiple
              >
                <el-button
                  size="small"
                  type="primary"
                  @change="upload(scope.row)"
                  ><i class="el-icon-upload el-icon--right"></i
                ></el-button>
              </el-upload>
           </template>
         </el-table-column>
          <el-table-column label="操作" style="display:flex">
            <template slot-scope="scope">
               
              <el-button
                @click="over(scope.$index, scope.row)"
                 size="small"
              type="primary"
              plain
                icon="el-icon-delete"
               
                title="删除该文件夹"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          :page-sizes="[10,20,40,60]"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total,sizes,  prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
      <el-dialog
        class="dilog"
        title="新建文件夹"
        :visible.sync="dialogFormVisible"
      >
        <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->

        <el-form>
          <el-form-item label="文件夹名称" :label-width="formLabelWidth">
            <el-input v-model="form.diskName" maxlength="10" @input="e => form.diskName = validForbid (e)" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <!-- 设置触发更新的方法 -->
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 设置界面 -->
  </div>
  <!-- </div> -->
</template>
 
<script>
import reauest from "../../../apis/request.js";
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
const url1 = URL + "disks/delDisk";
export default {
  inject: ["reload"],
  name: "system",
  data() {
    return {
      text: "",
      // diskName: "",
      tableData: [
      
       
      ],
      currentPage: 1,
      pagesize: 10,

      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: "100px",
      formWidth: "100px",
      form: {},
      currentIndex: "",
      currentIndex1: "",
      files: "",
      mode: {},
    };
  },

  //模糊查询
 computed: {
    tables: function () {
      const text = this.text;
      if (text) {
        return this.tableData.filter((data) => {
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(text) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
  mounted() {
    this.open();
    this.wenjian();
    // this.update();
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
    action: function (row) {
      return (
        "http://192.168.0.113:8081/mini/objects/uploadfile?diskName=" +
        decodeURI(row.diskName) +
        "&access_token=" +
        localStorage.getItem("token")
      );
    },
    open() {
      this.axios({
        method: "get",
        url: URL + "disks/listBuckets",
        params: {
          // diskName: "",
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        this.tableData = res.data.data;
        // console.log(res);
      });
    },
    // 上传文件
    upload: function () {
      // this.form = this.tableData[index].diskName;
      // this.currentIndex = index;
      console.log(row.diskName);
      let fd = new FormData();

      fd.append("templateFile", mode);
      fd.append("diskName", row.diskName);
      console.log(fd);
      this.$axios
        .post(
          URL +
            "objects/uploadfile?diskName=" +
            this.form +
            "&access_token=" +
        localStorage.getItem("token"),
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          // console.log(response.data);
        });
    },
    //查询文件
    wenjian() {},
    erji(row) {
      // this.form = this.tableData[index].diskName;
      // this.currentIndex = index;
      this.$router.push({
        path: "/disker",
        name: "disker",
        params: {
          diskName: row.diskName,
        },
      });
      // this.isButton = true;

      console.log(row.diskName);
    },
    // 新建文件夹
    xinjian() {
      this.form = {
        diskName: "",
      };
      this.dialogFormVisible = true;
    },
    // 取消新建
    cancel() {
      this.dialogFormVisible = false;
    },
    //创建文件夹
    update() {
      if (this.form.diskName == "") {
        this.$message.error("创建失败，文件夹名称不能为空");
      } else {
        this.axios({
          method: "post",
          url: URL + "disks/createBucket",
          params: {
            diskName: this.form.diskName,
            access_token: localStorage.getItem("token"),
          },
        }).then((res) => {
          // console.log(res.data.code)
          if (res.data.code == 0) {
            this.tableData.push(this.form);
            let name = this.form.diskName;
            this.reload();
            // location.reload()
          } else {
            // console.log(res.data.code)
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    //删除文件夹
    over(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("删除该文件夹, 是否继续?(文件夹不能有内容)", "提示", {
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
            url: URL + "disks/delDisk",
            params: {
              diskName: this.form.diskName,
              access_token: localStorage.getItem("token"),
            },
          }).then((res) => {
            if (res.data.code == 0) {
               this.tableData.splice(index, 1);
             this.$message({
              type: "success",
              message: "删除成功!",
             
            });
            // location.reload();
            }
           
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除文件
    shanchu(index, row) {
      this.$confirm("删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.currentIndex1 = index;

        var arr = this.tableData1[index].objectName;
        var diskName = decodeURI(this.form.diskName);
        var fileNames = arr.split(",");
        this.axios({
          method: "post",
          url: URL + "objects/deleteFile",
          params: {
            diskName: this.form,
            fileNames: arr,
            access_token: localStorage.getItem("token"),
          },
        }).then((res) => {
          if (res.data.error_code == 0) {
            this.$message.error("删除成功");
          }
          this.tableData1.splice(index, 1);
          // location.reload();
        });
      });
    },
    // 下载文件
    xiazai(row) {
      window.location.href =
        URL +
        `objects/downloadFile?diskName=${this.form}&fileName=${
          row.objectName
        }&access_token=${localStorage.getItem("token")}`;
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      // console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
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

.topOne {
  /* width: 80%; */
  margin-top: 20px;
}
.el-dialog {
  width: 25%;
}
.top {
  display: flex;
}

.topOne .el-input {
  width: 15%;
}
.cell {
  cursor: pointer;
}
.el-table_1_column_1 {
  padding-left: 12px;
}
.el-table_1_column_3 .cell {
  display: flex;
}

.put {
  width: 20%;
}
img{
  cursor: pointer;
}
.el-table .cell{
  display: flex;
}
</style>