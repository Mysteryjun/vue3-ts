import { createApp } from 'vue'
import App from './App.vue'

// import { store, key } from '@/store'
import router from "@/router"
import { setupStore } from '@/pinia'
// svg引入
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/svg/index.vue'
import elementIcons from '@/components/svg/svgIcon'
import i18n from "@/lang";

import globalMoment from "@/plugins/moment";
import directive from "@/directive";

import ECharts from 'vue-echarts'
import { use } from "echarts/core";
// 控制台 warning   Added non-passive event listener to a scroll-blocking 'mousewheel' event. Co
import 'default-passive-events'

// 手动引入 ECharts 各模块来减小打包体积
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  LineChart
} from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent
]);

const app = createApp(App)
app.use(router)
// 引入 pinia
setupStore(app)
app.use(elementIcons)
app.use(i18n)
// 传入 injection key
// app.use(store, key)
globalMoment(app);
directive(app)
app.mount('#app')
app.component('svg-icon', SvgIcon)
app.component('v-chart', ECharts)
