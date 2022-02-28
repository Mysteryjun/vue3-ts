import Home from "@/views/Home.vue";
import i18n from "@/lang";
const index = {
  path: '/index',
  component: Home,
  name: 'index',
  svg: 'overview',
  meta: {
    hidden: false
  },
  children: [{
    path: '/index',
    component: () => import('@/views/overview/index.vue'),
    name: i18n.global.t('overview'),
    meta: {
      hidden: false
    }
  }]
}
const SLA = {
  path: '/sla',
  component: Home,
  name: 'sla',
  svg: 'sla',
  meta: {
    hidden: false
  },
  children: [{
    path: '/sla',
    component: () => import('@/views/SLA/index.vue'),
    name: 'SLA',
    meta: {
      hidden: false
    }
  }]
}
const find = {
  path: '/find',
  component: Home,
  name: 'find',
  svg: 'find',
  meta: {
    hidden: false
  },
  children: [{
    path: '/find',
    component: () => import('@/views/find/Index.vue'),
    name: i18n.global.t('find'),
    meta: {
      keepAlive: true,
      hidden: false
    }
  }]
}
const protect = {
  path: '/protect/imagesLevel',
  component: Home,
  svg: 'protect',
  name: i18n.global.t('protect'),
  meta: {
    hidden: false
  },
  children: [{
    path: '/protect/imagesLevel',
    component: () => import('@/views/protect/ImagesLevel.vue'),
    name: i18n.global.t('image'),
    meta: {
      hidden: false
    }
  }, {
    path: '/protect/fliesLevel',
    component: () => import('@/views/protect/FilesLevel.vue'),
    name: i18n.global.t('file'),
    meta: {
      hidden: false
    }
  }]
}

const testVnc = {
  path: '/deviceList',
  component: Home,
  svg: 'recovery',
  name: '设备',
  meta: {
    hidden: false
  },
  children: [{
    path: '/deviceList',
    component: () => import('@/views/DeviceList.vue'),
    name: '测试VNC',
    meta: {
      hidden: false
    }
  }]
}

export { index, SLA, find, protect, testVnc }