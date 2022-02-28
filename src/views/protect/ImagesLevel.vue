<template>
  <header class="clearfix">
    <Common></Common>
  </header>
  <section class="container">{{ $t("image") }}<Vnc></Vnc></section>
</template>
<script setup>
import Common from "@/components/header/index.vue";
import Vnc from "@/components/vnc/index.vue";
</script>

<style lang="scss" scoped></style>
