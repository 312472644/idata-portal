<template>
  <el-dialog v-model="dialogVisible" :width="500" title="登录" :close-on-click-modal="false">
    <el-form :model="loginForm" :rules="rules" ref="loginElForm">
      <el-form-item prop="userName">
        <el-input placeholder="账号" v-model="loginForm.userName" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item class="btn-form-item">
        <el-button auto-insert-space size="default" @click="close">取消</el-button>
        <el-button type="primary" auto-insert-space size="default" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { userLogin } from '@utils/business';
import { FormInstance, FormRules } from 'element-plus';
import { useStore } from 'vuex';
import useState from '@hooks/useState';

const store = useStore();
const { isTokenTimeout } = useState('common', ['isTokenTimeout']);
console.log('isTokenTimeout', isTokenTimeout);
const dialogVisible = ref(isTokenTimeout);
const loginForm = reactive({
  userName: '',
  password: '',
});
const loginElForm = ref<FormInstance>();
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
const close = () => {
  store.commit('changeIsTokenTimeout', false);
};
const login = () => {
  loginElForm?.value?.validate(valid => {
    if (valid) {
      userLogin(loginForm).then(() => {
        close();
      });
    }
  });
};
</script>
<style lang="scss" scoped>
:deep .btn-form-item {
  .el-form-item__content {
    justify-content: center;
  }
}
</style>
