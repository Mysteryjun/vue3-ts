<template>
  <div class="login-container">
    <div class="img_box">
      <img class="logo" :src="logo" />
      <div
        :class="item.current ? item.className + ' active' : item.className"
        v-for="item in Carousel"
        :key="item.className"
      ></div>
      <div class="btn_group">
        <div class="prev_icon" @click="prev">
          <img :src="prevImg" alt="ms" />
        </div>
        <div class="next_icon" @click="next">
          <img :src="prevImg" alt="ms" />
        </div>
      </div>
    </div>
    <div class="login_form_box">
      <!-- 下载客户端+帮助 -->
      <div class="tool">
        <div class="help">
          <img :src="helpImg" alt="ms" width="16" height="16" />
          <span>{{ $t("help") }}</span>
        </div>
        <div class="agent">
          <img :src="agentImg" alt="ms" width="20" height="20" />
          <span>{{ $t("manage") }}</span>
        </div>
      </div>
      <!-- 登录框 -->
      <div class="login_box">
        <img :src="logoSvg" alt="ms" width="213" height="39" />
        <el-form
          ref="loginForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm login-form"
        >
          <el-form-item prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              :placeholder="$t('userName')"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              :placeholder="$t('password')"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item style="width: 100%; margin-bottom: 5px">
            <el-button
              type="success"
              style="width: 100%"
              @click="handleSubmit"
              :loading="logining"
              >{{ $t("loginBtn") }}</el-button
            >
          </el-form-item>
          <!-- <div class="cs-regtips"><span>USB-KEY模式登录</span></div> -->
        </el-form>
      </div>
      <!-- copyright -->
      <div class="copyright">
        <span>©2017-2021 </span>
        <a href="http://www.datasure.cn/" class="link">DataSure</a>
        <span> Co., Ltd, All Rights Reserved.</span>
      </div>
    </div>
    <!-- <Agent :agentVisible="agentVisible" @agentClose="agentClose"></Agent>
    <Help :helpVisible="helpVisible" @helpClose="helpClose"></Help> -->
  </div>
</template>
<script setup lang="ts">
import qs from "qs";
import { login } from "@/api/user";
import { ref,Ref, reactive,  getCurrentInstance,ComponentInternalInstance } from "vue";
import { setToken } from "@/utils/auth";
// import { useRoute, useRouter } from "vue-router";

import logo from "@/assets/images/login/logo.png";
import logoSvg from "@/assets/images/login/logo.svg";
import prevImg from "@/assets/images/login/prev.svg";
import helpImg from "@/assets/images/login/help.svg";
import agentImg from "@/assets/images/header/agent.svg";

const { proxy } = getCurrentInstance() as ComponentInternalInstance ;
console.log(getCurrentInstance());
console.log(proxy);

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const Carousel = reactive([
  { className: "background_img background_img0", current: true },
  { className: "background_img background_img1", current: false },
  { className: "background_img background_img2", current: false },
]);
// const route = useRoute()
// const router = useRouter()
let ruleForm = reactive({
  userName: "admin",
  password: "123",
});
const loginForm:Ref<any> = ref(null);
let rules = reactive({
  userName: [{ required: true, message: t("userNameReqiured"), trigger: "blur" }],
  password: [{ required: true, message: t("passwordReqiured"), trigger: "blur" }],
});
let logining:Ref<boolean> = ref(false); //登录锁
const prev = () => {
  let currentIndex = 0;
  Carousel.forEach((item, index) => {
    if (item.current) {
      if (index == 0) {
        currentIndex = Carousel.length - 1;
      } else {
        currentIndex = index - 1;
      }
      item.current = false;
    }
  });
  Carousel[currentIndex].current = true;
};
const next = () => {
  let currentIndex = 0;
  Carousel.forEach((item, index) => {
    if (item.current) {
      if (index == Carousel.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex = index + 1;
      }
      item.current = false;
    }
  });
  Carousel[currentIndex].current = true;
};
// console.log("路由",$route);
// $router.push('/dashboard')
const handleSubmit = async () => {
  loginForm.value.validate((valid:boolean) => {
    // proxy.$refs.loginForm.validate((valid) => {
    if (valid) {
      //验证成功
      logining.value = true;
      // console.log(ruleForm);
      login(
        qs.stringify({
          userName: ruleForm.userName,
          userPwd: ruleForm.password,
          userLoginType: 0,
        })
      )
        .then((res) => {
          console.log(res);
          logining.value = false;
          if (res.msgCode == 30000) {
            setToken(ruleForm.userName);
            const redirect: any = proxy?.$route.query.redirect;
            // console.log(redirect);
            if (redirect) {
              proxy?.$router.push({ path: redirect });
            } else {
              proxy?.$router.push({ path: "/index" });
            }
          }
        })
        .catch((err) => {
          logining.value = false;
        });
    } else {
      //未按要求输入
      console.log("error submit!!");
      return false;
    }
  });
};
</script>
<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  display: flex;
  .img_box {
    flex: 3;
    position: relative;
    .logo {
      position: absolute;
      left: 52px;
      top: 40px;
      width: 232px;
      height: 34px;
      z-index: 1;
      object-fit: contain;
    }
    .background_img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s;
      &.active {
        opacity: 1;
      }
    }
    .background_img0 {
      background-image: url("@/assets/images/login/login-background.png");
      background-size: cover;
      background-position: center center;
    }
    .background_img1 {
      background-image: url("@/assets/images/login/login-background1.png");
      background-size: cover;
      background-position: center center;
    }
    .background_img2 {
      background-image: url("@/assets/images/login/login-background2.png");
      background-size: cover;
      background-position: center center;
    }
    .btn_group {
      position: absolute;
      bottom: 30px;
      right: 10%;
      display: flex;
      .prev_icon {
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.2s;
        &:hover {
          opacity: 1;
        }
      }
      .next_icon {
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.2s;
        transform: rotateY(180deg);
        margin-left: 20px;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .login_form_box {
    flex: 1;
    position: relative;
    .tool {
      overflow: hidden;
      cursor: pointer;
      color: #7f7f7f;
      .agent {
        float: right;
        display: flex;
        width: 140px;
        height: 60px;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: #e9ecef;
        }
        span {
          margin-left: 10px;
        }
      }
      .help {
        float: right;
        display: flex;
        width: 140px;
        height: 60px;
        align-items: center;
        justify-content: center;
        img {
          opacity: 0.3;
        }
        &:hover {
          background-color: #e9ecef;
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .login_box {
      margin-left: 72px;
      margin-top: 175px;
      .login-form {
        width: 360px;
        margin-top: 40px;
      }
    }
    .copyright {
      position: absolute;
      bottom: 10px;
      left: 72px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #aaa;
      .link {
        color: #00b400;
        margin: auto 5px;
        text-decoration: underline;
      }
    }
  }
}
</style>
