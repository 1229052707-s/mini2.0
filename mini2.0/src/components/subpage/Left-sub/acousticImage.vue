<template>
  <div class="Right">
  <el-upload
        style="margin-bottom: 30px;"
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
                <!-- <el-button style="margin-bottom: 30px" type="primary" @click="jiazai"
      >镜像刷新</el-button
    > -->
    <!-- <el-button style="margin-bottom: 30px" type="primary" @click="xinjian"
      >删除</el-button
    > -->
    <!-- 镜像列表 -->
    <el-table :data="tableData" border   :cell-style="rowClass"
        :header-cell-style="headClass"  stripe>
       <el-table-column label="序号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
      <el-table-column prop="name" label="名称" >
      </el-table-column>

      <el-table-column prop="type" label="镜像格式" width="100">
      </el-table-column>
      <!-- <el-table-column prop="status" label="启用状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'VIR_DOMAIN_RUNNING'">运行中</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_NOSTATE'">无状态</span>
        </template>
      </el-table-column>
       <el-table-column prop="status" label="就绪状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'VIR_DOMAIN_RUNNING'">就绪</span>
          <span v-if="scope.row.status == 'VIR_DOMAIN_NOSTATE'">未就绪</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="capacity" label="容量" width="100"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
          <el-button
            :style="{ display: visibleSubmit }"
            size="small"
              type="primary"
              plain
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <!-- v-else -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
       fileList: [],
    };
  },
  mounted() {
    this.all();
  },
  methods: {
    // 镜像上传
      customUpload(file) {
      let FormDatas = new FormData();
      FormDatas.append("file", file.file);
      this.$axios({
        url:
          URL +
          "image/upload?access_token="+localStorage.getItem('token'),
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
    headClass () {
  return 'text-align: center;background:#eef1f6;'
},
rowClass () {
  return 'text-align: center;'
},
    //镜像列表
    all() {
      this.axios({
        method: "get",
        url: URL + "image/listImages",
        params: {
          // pagesize:this.pagesize,
          access_token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          this.tableData = res.data.data;
          console.log(this.tableData);
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    //刷新
    jiazai(){
 this.axios({
        method: "get",
        url: URL + "image/listImages",
        params: {
          // pagesize:this.pagesize,
          access_token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          this.tableData = res.data.data;
          console.log(this.tableData);
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    //删除镜像
 handleDelete(index, row) {
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
            url: URL + "image/remove",
            params: {
              name:this.form.name,
              access_token:localStorage.getItem("token"),
            },
          }).then((res) => {
            if (res.data.code == 0) {
               this.tableData.splice(index, 1);
            this.$message.error("删除成功");
            }
           this.reload();
           
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
.Right {
     width: 88%;
    margin-left: 200px;
    border-radius: 10px;
    height: 800px;
    margin-top: 110px;
}
.upload{
  margin-bottom: 30px;
  width: 100px;
    height: 40px;
}
.upload i{
  font-size: 26px;
    line-height: 20px;
}
</style>