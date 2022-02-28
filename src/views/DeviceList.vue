<template>
  <header class="clearfix">
    <Common></Common>
  </header>
  <section class="container">
    测试VNC

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" show-overflow-tooltip label="名称" width="260" />
      <el-table-column label="安装方式">
        <template #default="scope">
          <span v-html="targetTypeFormat(scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-tag type="success" @click="toVnc(scope.row)">VNC</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup lang="ts">
import Common from "@/components/header/index.vue";
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import { showTargetList, getRemoteControl, getPlatformStragety } from "@/api/test";
const { proxy } = getCurrentInstance();
let tableData = ref([]);
const targetTypeFormat = (row) => {
  // console.log(row);
  let { targetType, cloudPlat } = row;
  let html = "";
  switch (targetType) {
    case "1":
      switch (cloudPlat.identifier) {
        case "MSOpenStack":
          html = `
						<p>${proxy.$t("device.platformAdd")}</p><span>${cloudPlat.identifier}[${
            cloudPlat.name
          }]</span>
					`;
          break;
        case "MSZStack":
          html = `<p>${proxy.$t("device.platformAdd")}</p>
						<span>${cloudPlat.identifier}[${cloudPlat.name}]</span>`;
          break;
        case "MSTencent":
          html = `<p>${proxy.$t("device.platformAdd")}</p>
						<span>${cloudPlat.identifier}[${cloudPlat.name}]</span>`;
          break;
        case "MSHuawei":
          html = `<p>${proxy.$t("device.platformAdd")}</p>
						<span>${cloudPlat.identifier}[${cloudPlat.name}]</span>`;
          break;
        case "MSVSphere":
          html = `<p>${proxy.$t("device.platformAdd")}</p>
						<span>${cloudPlat.identifier}[${cloudPlat.name}]</span>`;
          break;
        default:
          break;
      }
      break;
    case "2":
      html = `${proxy.$t("device.platformAdd")}`;
      break;
    case "3":
      html = `${proxy.$t("device.addRemotely")}`;
      break;
    default:
      html = "-";
      break;
  }
  return html;
};
const init = () => {
  showTargetList({
    state: 0,
    page: 1,
    start: 0,
    limit: 25,
  }).then((res) => {
    // console.log(res);
    tableData.value = res.detail;
  });
};
const getStragety = async (platformId) => {
  let stragety = null;
  await getPlatformStragety({ platformId: platformId })
    .then((res) => {
      console.log(res);
      stragety = res.stragety;
    })
    .catch((err) => {
      console.log(err);
    });
  return stragety;
};
const toVnc = async (data) => {
  console.log(data);
  let { uuid, vmId, platformId } = data;
  console.log(uuid, vmId, platformId);
  if (uuid) {
    proxy.$router.push({
      path: "/deviceVnc",
      query: {
        deviceUuid: uuid || "",
        vmId: vmId || "",
        platformId: platformId || "",
      },
    });
  } else {
    proxy.$router.push({
      path: "/cloudVnc",
      query: {
        deviceUuid: uuid || "",
        vmId: vmId || "",
        platformId: platformId || "",
      },
    });
  }
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped></style>
