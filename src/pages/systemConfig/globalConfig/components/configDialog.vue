<template>
  <el-dialog
    v-model="visible"
    :title="getTitle"
    width="30%"
    :close-on-click-modal="false"
    @close="cancel"
    @open="openHandler"
  >
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef" label-width="80px">
      <el-form-item prop="code" label="编码">
        <el-input v-model="formData.code" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="codeCn" label="中文名称">
        <el-input v-model="formData.codeCn" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="codeEn" label="英文名称">
        <el-input v-model="formData.codeEn" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="configType" label="配置类型">
        <el-input v-model="formData.configType" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="fieldName" label="字段名称">
        <el-input v-model="formData.fieldName" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { reactive, toRefs, ref, computed } from 'vue';
import { updateDicAPI, createDicAPI } from '../api';
import { setFormField } from '@utils/index';

const props = defineProps({
  visible: Boolean,
  openType: String,
  currentRow: {
    type: Object,
  },
});

const emits = defineEmits(['update:visible', 'submit-success']);
const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  code: '',
  codeCn: '',
  codeEn: '',
  configType: '',
  fieldName: '',
});
const formRules = reactive({
  code: [{ required: true, message: '必填', trigger: 'blur' }],
  codeCn: [{ required: true, message: '必填', trigger: 'blur' }],
  codeEn: [{ required: true, message: '必填', trigger: 'blur' }],
  configType: [{ required: true, message: '必填', trigger: 'blur' }],
  fieldName: [{ required: true, message: '必填', trigger: 'blur' }],
});
const currentRow = toRefs(props).currentRow;

const getTitle = computed(() => {
  return props.openType === 'Add' ? '新增' : '编辑';
});

const openHandler = () => {
  setFormField(formData, currentRow?.value);
};

const cancel = () => {
  ruleFormRef.value?.resetFields();
  emits('update:visible', false);
};

const submitSuccess = (res: any) => {
  const { code, success } = res.data;
  if (code === 200 && success) {
    cancel();
    emits('submit-success');
  }
};

// 新增字典
const createDic = () => {
  createDicAPI(formData).then(res => {
    submitSuccess(res);
  });
};

// 更新字典
const updateDic = () => {
  const id = currentRow?.value?.id;
  if (!id) {
    return;
  }
  updateDicAPI(id, formData).then(res => {
    submitSuccess(res);
  });
};

const submit = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (props.openType === 'Add') {
        createDic();
      } else if (props.openType === 'Edit') {
        updateDic();
      }
    }
  });
};
</script>
