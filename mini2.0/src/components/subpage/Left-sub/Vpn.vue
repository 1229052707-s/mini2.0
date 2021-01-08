<template>
  <div class="box">
    <div
      class="basetable"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <!-- v-loading 设置加载 -->
      <div class="selectMenu">
        <!-- <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围"></el-date-picker> -->
        <!-- 点击触发add方法 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="add"
          title="添加"
        ></el-button>
      </div>
      <div class="tableMain">
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          style="width: 50%"
        >
          <el-table-column
            type="selection"
            width="55"
            label="全选"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="账号"
            width="80"
          ></el-table-column>
          <el-table-column prop="address" label="密码"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >新增</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
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
          layout="total,sizes,prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
      <!-- 下面这个用来设置点击添加按钮的弹出框，里面可以进行嵌套表格来展示弹出的表格信息,使用下面的:visible.sync来控制显示与否 -->
      <!-- 里面绑定的是我们新设置的值，填写完成后，将我们这个新值塞到页面中所有的数据当中去 -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
        <el-form :model="form">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <!-- <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <!-- 设置触发更新的方法 -->
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      loading: true,

      //   表格的数据
      tableData: [
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
        {
          date: "2017-05-03",
          name: "半藏",
          region: "女",
          address: "花村",
          city: "",
        },
      ],
      //   城市选择数据
      cityList: [
        { name: "国王大道" },
        { name: "尼泊尔" },
        { name: "沃斯卡亚工业区" },
        { name: "花村" },
        { name: "尼泊尔" },
        { name: "月球基地" },
      ],
      dialogFormVisible: false,
      formLabelWidth: "80px",
      // 设置form用于进行添加的时候绑定值
      form: {},
      value6: "",
      pagesize: 5,
      currentPage: 1,
      currentIndex: "",
    };
  },
  created() {
    //   设置回调函数，进行1.5秒的loading动画显示
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
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
    update() {
      //   this.form.date = reformat(this.form.date);
      //    可以在html上面进行设置日期的格式化
      //   将我们添加的信息提交到总数据里面
      this.tableData.push(this.form);
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      // 将数据的index传递过来用于实现数据的回显
      this.form = this.tableData[index];
      this.currentIndex = index;
      // 设置对话框的可见
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      // 设置类似于console类型的功能
      this.$confirm("删除该Vpn, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
};
</script>

<style >
.box {
  width: 75%;
  margin-left: 20%;
  border-radius: 10px;
  height: 800px;
  margin-top: 80px;
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
</style>


