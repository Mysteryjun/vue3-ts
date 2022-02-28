<template>
  <div @click="test" class="header-right">
    <span class="cs-right logout" @click="logout">{{ $t("exit") }}</span>
    <span class="cs-right">{{ userName }}</span>
    <span class="user-icon cs-right">{{ userName.substring(0, 1).toUpperCase() }}</span>
    <svg-icon class="svg-icon cs-right" icon-class="question" />
    <svg-icon class="svg-icon cs-right" icon-class="message" />
    <el-dropdown trigger="click" class="changeLang" @command="changeLang">
      <div class="el-dropdown-link">
        {{ currentLang }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languages"
            :key="item.code"
            :disabled="item.code == language"
            :command="item.code"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, ComponentInternalInstance } from "vue";
import { changeFav } from "@/api/user";
import { appStoreHook } from "@/pinia/modules/app";
import { userStoreHook } from "@/pinia/modules/user";
const store = appStoreHook();
const userStore = userStoreHook();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const userName = userStore.userName;
const userId = userStore.userId;
const language = store.language;
// console.log(language.value);
const languages: Array<any> = reactive([
  {
    code: "zh_CN",
    name: "简体中文",
  },
  {
    code: "zh_TW",
    name: "繁体中文",
  },
  {
    code: "en_US",
    name: "English",
  },
]);
const currentLang = ref(languages.find((item) => item.code == language).name);
// console.log(userName);
const changeLang = (command: any) => {
  let langCode = languages.findIndex((item) => item.code == command) + 1;
  console.log(langCode);
  changeFav({
    userId: userId,
    language: langCode,
  }).then((res) => {
    console.log(res);
    if (res.success) {
      window.location.reload();
    }
  });
};
const logout = () => {
  proxy?.$router.push("/login");
};
const props = defineProps({
  message: String,
  default: () => "",
});
// const curLang =
const emit = defineEmits(["on-callback"]);
const test = (): void => {
  emit("on-callback", props["message"] + " " + userName);
};
</script>

<style lang="scss" scoped></style>
