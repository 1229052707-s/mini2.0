<template>
    <div class="journal">
       <p>操作日志</p> 
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  :cell-style="rowClass"
        :header-cell-style="headClass"  stripe border style="width: 90%;margin: 40px auto;">
           <el-table-column label="序号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
       <el-table-column prop="item" label="操作说明" width="300">
      </el-table-column>
      <el-table-column prop="result" label="结果" width="300">
        <template slot-scope="scope">
          <span v-if="scope.row.result == '0'">成功</span>
          <span v-if="scope.row.result == '1'">失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户" width="300"> </el-table-column>
      <el-table-column prop="operateTime" label="操作时间">
      </el-table-column>
      
      
    </el-table>
     <div class="page">
       <el-pagination
     @size-change="handleSizeChange"
     :page-sizes="[5, 10, 20, 40]"
      @current-change="handleCurrentChange"
      :current-page="currentPage" 
      :page-size="pagesize"
      layout="total,sizes,prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
    </div>
    </div>
</template>
<script>
// const URL = "http://192.168.0.145:8081/mini/";
const URL = "http://192.168.0.113:8081/mini/";
export default {
    data() {
        return {
            currentPage:1,
       pagesize: 5,
           tableData:[],
        }
    },
    mounted(){
this.all();
    },
    methods:{
       headClass () {
  return 'text-align: center;background:#eef1f6;'
},
rowClass () {
  return 'text-align: center;'
},
      all(){
         this.axios({
        method: "get",
        url: URL + "syslog/logInfo",
        params: {
          pageNum:this.currentPage,
          pageSize:this.pagesize,
          access_token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
        //  console.log(res.data)
         this.tableData = res.data.data.sysLogs;
        })
        .catch(function (error) {
          // console.log(error);
        });
      },
      handleSizeChange: function (size) {
                this.pagesize = size;
                // console.log(this.pagesize)  //每页下拉显示数据
        },
     handleCurrentChange(currentPage) {
        this.currentPage = currentPage
       
      }
    }
}
</script>
<style scoped>
    .journal{
       width: 88%;
    margin-left: 200px;
    border-radius: 10px;
    height: 800px;
    margin-top: 110px;
    }
    .journal p{
     /* width: 90%; */
    height: 70px;
    background-color: #4390dd;
    margin: 0 auto;
    color: white;
    line-height: 70px;
    font-size: 26px;
    font-weight: bold;
    padding-left: 40px;
   }
   .page{
       /* width: 90%; */
       margin: 0 auto;
   }
</style>