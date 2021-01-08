<template>
  <div class="boxBig">
    <div>
      <p></p>
    </div>
    <div class="box">
      <div class="projectCost1">
        <div class="container">
          <div class="wrapper">
            <p class="all">物理机CPU</p>
            <div class="big">
              <div class="circle">
                <el-progress
                  type="circle"
                  :percentage="this.list.cpu.cpuRatio"
                ></el-progress>
              </div>
              <div class="bigL">
                <p class="fen">
                  <span>{{ this.list.cpu.cpuNo }}&nbsp;&nbsp;</span>
                  <span
                    ><i class="el-icon-minus" style="color: #52c4ff">&nbsp;</i
                    >已用</span
                  >
                </p>
                <p class="fenO">
                  <span> {{ this.list.cpu.cpuRatio }} %</span>
                  <span
                    ><i class="el-icon-minus" style="color: #007fdf"></i>
                    使用率</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="wrapper">
            <p class="all">物理机内存</p>
            <div class="big">
              <div class="circle">
                <el-progress
                  type="circle"
                  :percentage="this.lv"
                  :color="colors"
                ></el-progress>
              </div>
              <div class="bigL">
                <p class="fen">
                  <span>{{ this.sheng }}&nbsp;&nbsp;GB</span>
                  <span
                    ><i class="el-icon-minus" style="color: #52c4ff"
                      >&nbsp;&nbsp;</i
                    >已用</span
                  >
                </p>
                <p class="fenO">
                  <span> {{ this.list.memory.memTotal }}&nbsp;&nbsp;GB</span>
                  <span
                    ><i class="el-icon-minus" style="color: #007fdf">&nbsp;</i>
                    总量</span
                  >
                </p>
                <p class="fenO">
                  <span>{{ this.list.memory.memFree }}&nbsp;&nbsp;GB</span>
                  <span
                    ><i class="el-icon-minus" style="color: #52c4ff"
                      >&nbsp;&nbsp;</i
                    >剩余</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="projectCost">
        <div class="container">
          <div class="wrapper">
            <!-- <div class="roseChart"></div> -->
            <p class="all">物理机网络吞吐量</p>
            <p class="fenT">
              <span> {{ this.list.network.send }}&nbsp;&nbsp;KB/s </span>
              <span>{{ this.list.network.accept }}&nbsp;&nbsp;KB/s</span>
            </p>
            <p class="fenOt">
              <span>
                <i class="el-icon-minus" style="color: #007fdf"></i>&nbsp;发送
              </span>
              <span
                ><i class="el-icon-minus" style="color: #52c4ff"></i
                >&nbsp;接收</span
              >
            </p>
          </div>
          <div class="wrapper">
            <!-- <div class="roseChart"></div> -->
            <p class="all">物理机磁盘IO</p>
            <p class="fenT">
              <span> {{ this.list.disk.diskWrites }}&nbsp;&nbsp;KB/s</span>
              <span>{{ this.list.disk.diskReads }}&nbsp;&nbsp;KB/s</span>
            </p>
            <p class="fenOt">
              <span
                ><i class="el-icon-minus" style="color: #007fdf"></i> 写入</span
              ><span
                ><i class="el-icon-minus" style="color: #52c4ff"></i
                >&nbsp;读取</span
              >
            </p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
const URL = "http://192.168.0.113:8081/mini/";
// const URL = "http://192.168.0.145:8081/mini/";
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      sheng: "",
      lv: "",
      list: [],
    };
  },
  mounted() {
    this.all();
    // this.suan();
  },
  methods: {
    // //折线图
    all() {
      this.axios({
        method: "get",
        url: URL + "system/systemInfo",
        params: {
          access_token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res.data.data.memory.memFree);
          this.list = res.data.data;
          (this.sheng =
            res.data.data.memory.memTotal - res.data.data.memory.memFree),
            (this.lv = Math.abs(
              Math.round((this.sheng / res.data.data.memory.memTotal) * 10000) /
                100.0
            ));
          console.log(this.sheng);
          console.log(this.lv);
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.box {
  width:100%;
  margin-top: 110px;
  display: flex;
  flex-wrap: wrap;
}

.projectCost {
  width: 100%;
}

.projectCost .container {
  display: flex;
  width: 100%;
  height: 300px;
  background-size: 100% 100%;
}

.container .wrapper {
  background-color: white;
  border-radius: 5px;
  margin-top: 20px;
  width: 45%;
  /* height: 100%; */
  margin-right: 60px;
  box-shadow: -0.5rem 0.3rem 0.5rem rgb(167 162 162 / 55%);
}

.wrapper .roseChart {
  width: 100%;
  height: 100%;
  box-shadow: 10px -10px 10px #f0f0f2, 10px -10px 10px #f0f0f2,
    -10px 10px 10px #f0f0f2, -10px -10px 10px #f0f0f2;
}

.projectCost1 {
  margin-top: 40px;
  width: 100%;
}

.projectCost1 .container {
  display: flex;
  width: 100%;
  height: 300px;
}

.right {
  width: 30%;
  height: 600px;
  margin-top: 130px;
  background-color: aliceblue;
  box-shadow: 10px -10px 10px #f0f0f2, 10px -10px 10px #f0f0f2,
    -10px 10px 10px #f0f0f2, -10px -10px 10px #f0f0f2;
}

.wrapper .fenOt span {
  width: 50%;
}

.wrapper .fenT span {
  /* display: flex; */
  width: 50%;
}

.wrapper .fenT {
  display: flex;
  text-align: center;
}

.wrapper .fenOt {
  display: flex;
  text-align: center;
}

.wrapper .fen {
  display: flex;
  margin-top: 30px;
  border-bottom: 1px solid #eef3f7;
  color: red;
}

.wrapper .fen span,
.wrapper .fenT span {
  width: 50%;
  height: 50px;
  display: block;
  line-height: 80px;
  font-size: 14px;
  /* text-align: center; */
}

.wrapper .fenO {
  display: flex;
  margin-top: 10px;
}

.wrapper .fenO span,
.wrapper .fenOt span {
  width: 50%;
  /* text-align: center; */
  font-size: 14px;
  display: block;
}

.wrapper .fen span i,
.wrapper .fenO span i,
.wrapper .fenT span i,
.wrapper .fenOt span i {
  font-weight: bold;
}

.all {
  font-size: 24px;
  /* font-weight: bold; */
  text-align: center;
  height: 50px;
  line-height: 50px;
  /* width: 74%; */
  color: #52c4ff;
  /* margin: 0 auto; */
}

.big {
  display: flex;
}

.bigL {
  width: 50%;
}

.circle {
  width: 31%;
  height: 125px;
  display: block;
  margin: 0 auto;
  margin-top: 25px;
}
.boxBig {
  /* width: 75%; */
  margin-left: 200px;
  display: flex;
  flex-wrap: wrap;
}
</style>
