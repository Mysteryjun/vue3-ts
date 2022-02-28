<template>
  <header class="clearfix">
    <el-button
      type="success"
      v-permission="'reportlog_report_performexport'"
      @click="showAlert"
      ><svg-icon class="svg-icon" icon-class="edit" />{{ $t("edit") }}</el-button
    >
    <Common :message="hello" @onCallback="callback"></Common>
  </header>
  <section class="container">
    <section class="content">
      <section class="content-left">
        <section class="index-find">
          <section class="index-title">{{ $t("find") }}{{ ss }}</section>
          <v-chart
            ref="chart1"
            class="chart"
            :option="option"
            style="width: 100%; height: 100%"
          />
        </section>
      </section>
      <section class="content-right">
        <section class="index-protect">
          <section class="index-title" @click="testss">{{ $t("protect") }}</section>
          <v-chart ref="chart2" class="chart" :option="wsoption" />
        </section>
      </section>
    </section>
  </section>

  <!-- <el-calendar v-model="value" /> -->
</template>
<script setup lang="ts">
import {
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  onMounted,
  onBeforeUnmount,
  reactive,
  Ref,
} from "vue";
import Common from "@/components/header/index.vue";
import { converSize } from "@/utils/format";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import moment from "moment";

console.log("首页", getCurrentInstance());
const ss = ref("11");
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import { appStoreHook } from "@/pinia/modules/app";
const store = appStoreHook();

const ws_prefix = store.ws_prefix;
let socket: Ref<any> = ref(null);
let socketData = ref({
  event: "HOME_PAGE_RUNTIME_EVENT",
  eventType: "FIRE",
});
// 测试组件传值
const hello = "你好";
const callback = (msg: any) => {
  console.log(msg);
};
// const  value = ref(new Date())
console.log(proxy);

const testss = () => {
  ss.value = "222";
};
// 测试elem 提示
const showAlert = () => {
  ElMessageBox.alert("This is a message", "Title", {
    confirmButtonText: "OK",
    callback: (action: Action) => {
      ElMessage({
        type: "info",
        message: `action: ${action}`,
      });
    },
  });
};
// echarts option
const option = ref({
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      areaStyle: {},
    },
  ],
});
let dataT: Array<string> = reactive([]);
let dataV: Array<string> = reactive([]);
const wsoption = reactive({
  title: {
    text: "",
    textStyle: {
      color: "#999",
      fontWeight: "normal",
      fontSize: 16,
    },
  },
  grid: {
    top: 40,
    left: -40,
    right: 0,
    bottom: 30,
  },
  tooltip: {
    trigger: "axis",
    formatter: function (v: any) {
      if (v[0].data === "") {
        res = "";
      } else {
        var res = v[0].name + "<br/>";
        res += '<span class="blue">' + converSize(v[0].data) + "</span>";
      }
      return res;
    },
    backgroundColor: "rgba(255,255,255,0.9)",
    textStyle: {
      color: "#8F9BB0",
      fontSize: 12,
    },
    extraCssText: "z-index:18999",
  },
  yAxis: {
    type: "value",
    scale: true,
    splitLine: {
      show: false,
    },
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: "#EEE",
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: 30,
      color: "#CCC",
    },
    axisPointer: {
      lineStyle: {
        opacity: 0.5,
      },
    },
    data: dataT, //时间
  },
  series: {
    type: "line",
    showSymbol: false,
    smooth: true,
    lineStyle: {
      width: 1,
      opacity: 0.2,
    },
    areaStyle: {
      opacity: 0.1,
    },
    emphasis: {
      lineStyle: {
        width: 1,
        opacity: 0.5,
      },
    },
    data: dataV, //速率
  },
});
import { ECharts } from "echarts";
// 响应式echart
const resizeChart = () => {
  (proxy?.$refs.chart1 as ECharts).resize();
  (proxy?.$refs.chart2 as ECharts).resize();
};
// 初始化socket
const initSocket = () => {
  socket.value = new WebSocket(ws_prefix + "homePageRuntimeMonitor");
  socket.value.onopen = () => {
    socket.value.send(JSON.stringify(socketData));
  };
  socket.value.onmessage = (data: any) => {
    onpush(data);
  };
  socket.value.onerror = () => {
    console.log("概览socket出错");
  };
  socket.value.onclose = () => {
    console.log("概览socket关闭");
  };
};
// 接收推送
const onpush = (res: any) => {
  let data = JSON.parse(res.data).runtimeInfo.totalData;
  console.log("推送实时流量数据", data);
  let date = moment().format("HH:mm:ss");
  data += Math.random() * 1024;
  dataT.shift();
  dataV.shift();
  dataT.push(date);
  dataV.push(data);
  // currentT = date;
  // currentV = converSize(data);
  // wsoption.xAxis.data = dataT;
  // wsoption.series.data = dataV;
};
onMounted(() => {
  //初始化
  for (var i = 0; i < 200; i++) {
    dataT.push("");
    dataV.push("");
  }
  initSocket();
  window.addEventListener("resize", resizeChart);
});
onBeforeUnmount(() => {
  socket.value.close();
  window.removeEventListener("resize", resizeChart);
});
</script>

<style lang="scss">
.content-left {
  flex: 1;
  padding-right: 10px;
}
.content-right {
  flex: 1;
  padding-left: 10px;
}
.index-find,
.index-protect {
  background-color: $white;
  height: 330px;
  border-radius: 5px;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  .index-title {
    font-size: 18px;
    line-height: 36px;
    font-weight: 700;
    color: $gray;
  }
}
</style>
