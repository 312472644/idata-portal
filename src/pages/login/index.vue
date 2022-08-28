<template>
  <div class="login-container">
    <div class="login-warp">
      <el-form size="large" ref="ruleFormRef" :model="loginForm" :rules="rules">
        <h3 class="title">用户登录</h3>
        <el-form-item prop="userName">
          <el-input placeholder="账号" v-model="loginForm.userName" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <div class="form-item-tools">
            <el-checkbox v-model="isChecked" label="记住密码" size="large" />
            <el-link :underline="false" type="primary" @click="toRegister">账号注册</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" auto-insert-space class="btn-login" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { getUrlParams } from '@utils/index';
import { userLogin } from '@utils/business';

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const isChecked = ref(false);
const loginForm = reactive({
  userName: '',
  password: '',
});

const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const setCacheLoginInfo = () => {
  if (isChecked.value) {
    const loginInfo = {
      ...loginForm,
      checked: isChecked.value,
    };
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
  } else {
    localStorage.removeItem('loginInfo');
  }
};

const getCacheLoginInfo = () => {
  const cacheLoginInfo = localStorage.getItem('loginInfo');
  if (cacheLoginInfo) {
    const loginInfo = JSON.parse(cacheLoginInfo);
    const { password, userName, checked } = loginInfo;
    loginForm.password = password;
    loginForm.userName = userName;
    isChecked.value = checked;
  }
};

const toMainPage = () => {
  if (location.href.indexOf('referrer') > -1) {
    const referrer = getUrlParams('referrer');
    if (referrer) {
      location.href = decodeURIComponent(referrer);
    }
  } else {
    router.push('/');
  }
};

const login = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      userLogin(loginForm).then(() => {
        setCacheLoginInfo();
        toMainPage();
      });
    }
  });
};

const toRegister = () => {
  router.push('/register');
};

onMounted(() => {
  getCacheLoginInfo();
});
</script>
<style lang="scss" scoped>
.login-container {
  padding-top: 10%;
  height: 100vh;
  background: url('../../assets/login.svg') no-repeat;
  background-position: 100%;
  background-size: 100%;
  .login-warp {
    border-radius: 10px;
    margin: 0 auto;
    width: 400px;
    padding: 30px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgb(0 0 0 / 10%);
  }
  .title {
    margin: 0 auto 40px;
    text-align: center;
    color: #505458;
  }
  .btn-login {
    width: 100%;
  }

  .form-item-tools {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
