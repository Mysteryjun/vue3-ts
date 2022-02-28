<template>
  <header class="clearfix">
    <Common></Common>
  </header>
  <section class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">
        <count-to
          :startVal="0"
          :endVal="value"
          :duration="1000"
          prefix="￥"
          class="countTo"
        ></count-to>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup lang="ts">
import Common from "@/components/header/index.vue";
import { CountTo } from "vue3-count-to";
import { ref, onActivated } from "vue";

const activeName = ref("first");

let value = ref(2021);
onActivated(() => {
  console.log(1);
});
const handleClick = (tab:any, event:Event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
.countTo {
  font-size: 22px;
  color: red;
}
</style>
