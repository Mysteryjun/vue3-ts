<template>
  <div class="page-home" ref="canvas">
    <div id="noVNC_canvas" style="width: 100%; height: 800px"></div>
  </div>
</template>
<script setup>
import RFB from "@novnc/novnc/core/rfb.js";
import { onMounted, getCurrentInstance } from "vue";
import { getVncConfigByUuid } from "@/api/test";

const { proxy } = getCurrentInstance();
console.log(proxy);
let deviceUuid = proxy.$route.query.deviceUuid;
let rfb;
let url, PASSWORD;
const getVncConfig = () => {
  getVncConfigByUuid({
    uniqueId: deviceUuid,
  }).then((res) => {
    console.log(res);
    url =
      "ws://" +
      res.result.hostIp +
      ":" +
      res.result.hostPort +
      "/websockify?token=" +
      res.result.tokens[0];
    PASSWORD = res.result.vncPwd;
    connectVNC();
  });
};
onMounted(() => {
  getVncConfig();
});

const connectVNC = () => {
  rfb = new RFB(document.getElementById("noVNC_canvas"), url, {
    // 向vnc 传递的一些参数，比如说虚拟机的开机密码等
    credentials: { password: PASSWORD },
  });
  rfb.addEventListener("connect", connectedToServer);
  rfb.addEventListener("disconnect", disconnectedFromServer);
  rfb.scaleViewport = true; //scaleViewport指示是否应在本地扩展远程会话以使其适合其容器。禁用时，如果远程会话小于其容器，则它将居中，或者根据clipViewport它是否更大来处理。默认情况下禁用。
  rfb.resizeSession = true; //是一个boolean指示是否每当容器改变尺寸应被发送到调整远程会话的请求。默认情况下禁用
  // 解决鼠标不显示
  setTimeout(() => {
    document.getElementsByTagName("canvas")[0].style.cursor = "default";
  }, 500);
};
const connectedToServer = (msg) => {
  console.log(msg);
};
const disconnectedFromServer = (msg) => {
  if (msg.detail.clean) {
    // 根据 断开信息的msg.detail.clean 来判断是否可以重新连接
    connectVNC();
  } else {
    //这里做不可重新连接的一些操作
    console.log("链接失败,重新链接中-------");
    proxy.$message.error("链接失败,重新链接中-------");
    connectVNC();
  }
};
</script>
