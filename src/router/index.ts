import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { index, SLA, find, protect, testVnc } from "./routes";
import { getToken, removeToken } from "@/utils/auth";
import NProgress from "nprogress";

import { appStoreHook } from "@/pinia/modules/app";
import { userStoreHook } from "@/pinia/modules/user";
const store = appStoreHook();
const userStore = userStoreHook();
const { setWsPrefix } = store;
const { setUser } = userStore;

console.log(userStore);




import "nprogress/nprogress.css";

const baseRoute: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: '/login',
    component: () => import('@/views/others/Login.vue'),
    meta: {
      hidden: true
    }
  },
  {
    name: "404",
    path: '/:pathMatch(.*)', //vue-router4   去掉了 *  换成了  /:pathMatch(.*)
    component: () => import('@/views/others/404.vue'),
    meta: {
      hidden: true
    }
  },
  // {
  //   name: "cloudVnc",
  //   hidden: true,
  //   path: '/cloudVnc',
  //   component: () => import('@/views/others/CloudVnc.vue'),
  // },
  // {
  //   name: "deviceVnc",
  //   hidden: true,
  //   path: '/deviceVnc',
  //   component: () => import('@/views/others/DeviceVnc.vue'),
  // },
  index,
]
export const adminRoute: Array<RouteRecordRaw> = [
  SLA,
  find,
  protect,
  // testVnc
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoute
})

// 适配登录&退出登录
router.beforeEach(async (to, from, next) => {
  // console.log(from, to);
  if (to.path == '/login') {
    removeToken()
    if (router.options.routes.length != baseRoute.length) {//退出登录
      window.location.reload();
      return
    }
    next()
  } else {
    const ws_prefix = store.ws_prefix;
    if (!ws_prefix) {
      await setWsPrefix()
    }
    NProgress.start();
    let user = getToken();
    if (!user && to.path != '/login') { //未登录
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {//登录状态跳转
      if (userStore.userName == "") {
        setUser();
      }
      if (to.path == '/') {
        next({
          path: '/index'
        })
      } else {
        // 动态组件缓存
        if (to.fullPath == "/find") {
          if (from.fullPath == "/index") {
            to.meta.keepAlive = true;
          } else {
            to.meta.keepAlive = false;
          }
        }
        console.log(router);
        if (router.options.routes.length == baseRoute.length) {


          adminRoute.forEach(item => {
            router.addRoute(item)
          })
          router.options.routes = router.options.routes.concat(adminRoute)
          // console.log(to);
          next({ path: to.fullPath, replace: true, query: to.query }) // hack方法 确保addRoutes已完成  刷新页面触发
        } else {
          next()
        }

      }
    }
  }
  // document.title = to.name + "--CloudSure";
});
router.afterEach(() => {
  NProgress.done();
});

export default router