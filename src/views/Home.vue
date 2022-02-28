<template>
  <section class="wrapper">
    <aside>
      <img :src="logoSvg" alt="cloudsure" class="logo" />
      <section class="menu scroll">
        <el-menu
          active-text-color="#fff"
          background-color="#1a356a"
          class="el-menu-vertical-demo"
          text-color="rgba(255,255,255,0.6)"
          unique-opened
          router
          :default-active="thisRoute"
          @open="handleOpen"
          @close="handleClose"
        >
          <template v-for="item in allRoutes" :key="item.children[0].path">
            <el-menu-item :index="item.children[0].path" v-if="item.children.length == 1">
              <svg-icon class="svg-icon" :icon-class="item.svg" />
              <span>{{ item.children[0].name }}</span>
            </el-menu-item>
            <el-sub-menu :index="item.path + item.svg" v-else>
              <template #title>
                <svg-icon class="svg-icon" icon-class="protect" />
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="el.path" v-for="el in item.children" :key="el.path">{{
                el.name
              }}</el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </section>
    </aside>
    <section class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
    </section>
  </section>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance ,ComponentInternalInstance} from "vue";
import { useRoute, useRouter } from "vue-router";

import logoSvg from "@/assets/images/header/logo.svg";
// console.log(useRouter());
let thisRoute = ref("");
const { path } = useRoute();
thisRoute.value = path;
const { routes } = useRouter().options;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
console.log(useRouter().options);
console.log(proxy?.$router);

const filterMenu = (menuList:Array<any>) => {
  return menuList
    .filter((item) => {
      return !item.meta.hidden;
    })
    .map((item) => {
      if (item.children) {
        item.children = filterMenu(item.children);
      }
      return item;
    });
};
const allRoutes = computed(() => filterMenu(routes));
console.log(routes, allRoutes);

const handleOpen = (key:any, keyPath:any) => {
  // console.log(key, keyPath);
};
const handleClose = (key:any, keyPath:any) => {
  // console.log(key, keyPath)
};
</script>
<style lang="scss">
.wrapper {
  width: 100%;
  height: 100vh;
  background-color: rgba(234, 240, 246, 1);
  display: flex;
}
aside {
  width: 240px;
  height: 100vh;
  overflow: hidden;
  background-color: $primary;
  display: flex !important;
  flex-direction: column;
  .logo {
    width: 159px;
    margin: 27px auto;
    display: block;
  }
  .menu {
    flex: 1;
    overflow-x: hidden;
    overflow-y: overlay;
    .el-menu-item.is-active {
      .svg-icon {
        opacity: 1;
      }
    }
    .svg-icon {
      margin-right: 28px;
      margin-left: 20px;
      opacity: 0.6;
    }
  }
}
.main {
  flex: 1;
  header {
    height: 60px;
    line-height: 60px;
    padding: 0px 30px;
    background-color: $white;
    .header-right {
      overflow: hidden;
      float: right;
      line-height: 60px;
      .changeLang {
        float: right;
        cursor: pointer;
        .el-dropdown-link {
          line-height: 60px;
          color: $primary;
        }
      }
      .svg-icon {
        cursor: pointer;
        opacity: 0.6;
        font-size: 18px;
        margin-top: 21px;
        margin-left: 40px;
        &:hover {
          opacity: 0.8;
        }
      }
      .user-icon {
        cursor: pointer;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: $white;
        background-color: $primary;
        border-radius: 50%;
        margin: 15px 10px 15px 40px;
      }
      .logout {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
  .container {
    padding: 30px;
    .content {
      display: flex;
    }
  }
}
</style>
