<template>
  <el-dialog
    v-model="visible"
    @open="openHandler"
    title="编辑用户"
    width="30%"
    :close-on-click-modal="false"
    @close="cancel"
  >
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef">
      <el-form-item prop="userName" label="用户名">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { reactive, toRefs, ref } from 'vue';
import { updateUserAPI } from '../api';

const props = defineProps({
  visible: Boolean,
  currentRow: {
    type: Object,
  },
});

const emits = defineEmits(['update:visible']);
const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  userName: '',
});
const formRules = reactive({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
});
const currentRow = toRefs(props).currentRow;

const openHandler = () => {
  formData.userName = currentRow?.value?.userName;
};

const cancel = () => {
  emits('update:visible', false);
};

const confirm = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      updateUserAPI({
        id: currentRow?.value?.id,
        userName: formData.userName,
      }).then(res => {
        console.log('res', res);
      });
    }
  });
};
</script>
