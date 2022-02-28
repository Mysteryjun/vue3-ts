<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
interface Props {
  iconClass?: string;
  className?: string;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  iconClass: "",
  className: "",
  color: "",
});
const { iconClass, className } = props;
const iconName = computed(() => `#icon-${iconClass}`);
const svgClass = computed(() => {
  if (className) {
    return `svg-icon ${className}`;
  }
  return "svg-icon";
});
</script>

<style scope lang="scss">
.sub-el-icon,
.nav-icon {
  display: inline-block;
  font-size: 15px;
  margin-right: 12px;
  position: relative;
}

.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
