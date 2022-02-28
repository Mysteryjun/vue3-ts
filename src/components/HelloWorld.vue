<script setup lang="ts">
import { ref, inject, watchEffect } from "vue";
import { useStore } from "../store";

const store = useStore();

console.log(store.getters.getName);

const title: any = inject("title");
// defineProps<{ msg: string }>()

const count = ref(0);
const add = () => {
  count.value++;
  title.value = "hello";
  store.commit("SET_NAME", "改变后的张三");
  console.log(store.getters.getName);
  // console.log(count.value);
};
watchEffect(() => {
  console.log(count.value);
});
</script>

<template>
  <h1>{{ title }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="add">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
