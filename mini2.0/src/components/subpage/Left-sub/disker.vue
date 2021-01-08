<template>
  <div class="disker">
    <div class="Top">
      <span><i @click="goOff()" class="el-icon-arrow-left"></i></span>
      <div class="R">
        <span>{{ id }}</span>
        <!-- <el-upload :action="action()"  :show-file-list="false"
                accept=".rar,.zip,.doc,.docx,.pdf"
                mulitiple>
          <el-button style="margin-left: 40px;" type="primary" @change="upload(scope.row)" class="upload-demo"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </el-upload> -->
        <el-upload
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
        </el-upload>

        <!-- <el-button class="btn" type="primary" @click="xinjian"
          >新建文件夹</el-button
        > -->
      </div>
    </div>

    <div class="topTwo">
      <el-table
        :data="
          tableData1.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
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
          prop="objectName"
          label="文件名称"
          width="200"
        ></el-table-column>
        <el-table-column prop="size" label="文件大小/kb" width="200">
        </el-table-column
        >kb
        <el-table-column prop="LastModified" label="上传时间" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="shanchu(scope.$index, scope.row)"
              type="danger"
              plain
              size="small"
              title="删除该文件"
              >删除文件</el-button
            >

            <!-- <el-button @dblclick="erji(scope.$index, scope.row)"> </el-button> -->
            <!-- <el-button
              @click="yulan(scope.row)"
              type="danger"
               size="small"
               plain
              title="预览该文件"
              >预览</el-button
            >
            <el-button
              type="primary"
              @click="fenxiang(scope.row)"
              icon="el-icon-paperclip"
              circle
            ></el-button> -->
            <el-button
              @click="xiazai(scope.row)"
              type="danger"
              size="small"
              plain
              title="下载该文件"
              >下载文件</el-button
            >
          </template>

          <!-- <el-button @dblclick="erji(scope.$index, scope.row)"> </el-button> -->
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
        :total="tableData1.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
export default {
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      tableData1: [],
      id: "",
      currentIndex1: "",
      fileList: [],
    };
  },
  created() {
    this.getParams();
  },
  methods: {
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    rowClass() {
      return "text-align: center;";
    },
    //上传文件
    //      action: function () {
    //       return (
    //         "http://192.168.0.113:8081/mini/objects/uploadfile?diskName=" +
    //         decodeURI(this.id) +
    //         "&access_token=" +
    //         localStorage.getItem("token")

    // );

    //     },
    customUpload(file) {
      let FormDatas = new FormData();
      FormDatas.append("file", file.file);
      this.$axios({
        url:
          URL +
          "objects/uploadfile?diskName=" +
          decodeURI(this.id) +
          "&access_token=" +
          localStorage.getItem("token"),
        method: "post",
        data: FormDatas,
        //上传进度
        onUploadProgress: (progressEvent) => {
          let num = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //百分比
          file.onProgress({ percent: num }); //进度条
        },
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message({
              type: "success",
              message: "上传成功!",
            });
          this.reload();
        }
        file.onSuccess(); //上传成功(打钩的小图标)
      });
    },
    /**     文件正在上传时的钩子    **/
    progressA(event, file) {},
    /**     移除上传文件    **/
    handleRemove(file) {
      this.$refs.upload.abort(); //取消上传
      this.$message({ message: "成功移除" + file.name, type: "success" });
    },
    //查询文件
    getParams() {
      var routerParams = this.$route.params.diskName;
      this.id = routerParams;
      // console.log(routerParams)
      this.axios({
        method: "get",
        url: URL + "objects/listFiles",
        params: {
          diskName: this.id,
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        this.tableData1 = res.data.data;
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
        // var diskName = decodeURI(this.form.diskName);
        var fileNames = arr.split(",");
        console.log(fileNames);
        console.log(this.id);
        this.axios({
          method: "post",
          url: URL + "objects/deleteFile?diskName=" + decodeURI(this.id),
          params: {
            // diskName: this.form,
            fileNames: arr,
            access_token: localStorage.getItem("token"),
          },
        }).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.tableData1.splice(index, 1);
            this.reload();
          }

          // location.reload();
        });
      });
    },
    //下载文件
    xiazai(row) {
      window.location.href =
        URL +
        `objects/downloadFile?diskName=${this.id}&fileName=${
          row.objectName
        }&access_token=${localStorage.getItem("token")}`;
    },
    //预览文件
    yulan() {
      this.axios({
        method: "",
        url: URL + "",
        params: {
          access_token: localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res);
      });
    },
    goOff() {
      this.$router.go(-1);
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      //   console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  watch: {
    $route: "getParams",
  },
};
</script>
<style scoped>
.Top {
  box-shadow: -0.5rem 0.3rem 0.5rem rgb(167 162 162);
  margin-bottom: 30px;
  height: 60px;
  line-height: 60px;
  display: flex;
}
.disker {
  width: 88%;
  margin-left: 200px;
  border-radius: 10px;
  height: 800px;
  margin-top: 110px;
}
.el-icon-arrow-left {
  font-size: 35px;
    /* padding-top: 12px; */
    margin-top: 12px;
}
.R {
  display: flex;
}
.btn {
  margin-left: 65px;
  height: 40px;
  margin-top: 10px;
}
.el-upload-list__item:first-child{
margin-top: -45px;
    /* margin-left: 140%; */
    margin-left: 175px;
}
</style>