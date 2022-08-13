<template>
  <div class="login-container">
    <div class="login-warp">
      <el-form size="large" ref="ruleFormRef" :model="loginForm" :rules="rules">
        <h3 class="title">用户登录</h3>
        <el-form-item prop="userAccount">
          <el-input placeholder="账号" v-model="loginForm.userAccount" />
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input placeholder="密码" type="password" v-model="loginForm.userPassword" />
        </el-form-item>
        <el-form-item>
          <el-checkbox label="记住密码" size="large" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" auto-insert-space class="btn-login" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const loginForm = reactive({
  userAccount: '',
  userPassword: '',
});

const rules = reactive<FormRules>({
  userAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const login = async () => {
  await ruleFormRef.value?.validate(valid => {
    if (valid) {
      router.push('/');
    }
  });
};
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
}
</style>
