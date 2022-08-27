<template>
  <div class="register-container">
    <div class="register-warp">
      <el-form size="large" ref="ruleFormRef" :model="registerForm" :rules="rules">
        <h3 class="title">用户注册</h3>
        <el-form-item prop="userName">
          <el-input placeholder="账号" v-model="registerForm.userName" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="registerForm.password" />
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input placeholder="确认密码" type="password" v-model="registerForm.checkPassword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" auto-insert-space class="btn-login" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
// import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { registerAPI } from '../../api';
// const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const registerForm = reactive({
  userName: '',
  password: '',
  checkPassword: '',
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (registerForm.password !== '') {
      ruleFormRef.value?.validateField('checkPassword', () => null);
    }
    callback();
  }
};

const validateCfmPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerForm.password) {
    callback(new Error('两次密码输入不一致'));
  } else {
    callback();
  }
};

const rules = reactive({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPassword: [{ validator: validateCfmPass, trigger: 'blur' }],
});

const register = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      const params = {
        userName: registerForm.userName,
        password: registerForm.password,
      };
      registerAPI(params).then(res => {
        const { code, data } = res.data;
        if (code === 200) {
          ElMessage({
            message: '注册成功',
            type: 'success',
          });
          sessionStorage.setItem('token', JSON.stringify(data.token));
        }
      });
    }
  });
};
</script>
<style lang="scss" scoped>
.register-container {
  padding-top: 10%;
  height: 100vh;
  background: url('../../assets/login.svg') no-repeat;
  background-position: 100%;
  background-size: 100%;
  .register-warp {
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
