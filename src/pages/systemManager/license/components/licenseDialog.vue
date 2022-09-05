<template>
  <el-dialog
    v-model="visible"
    :title="getTitle"
    width="30%"
    :close-on-click-modal="false"
    @close="cancel"
    @open="openHandler"
  >
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef" label-width="100px">
      <el-form-item prop="license" label="名称">
        <el-input v-model="formData.license" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="hostInfo" label="主机信息">
        <el-input v-model="formData.hostInfo" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-input v-model="formData.status" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="effDate" label="受影响时间">
        <el-date-picker
          class="select-full-width"
          v-model="formData.effDate"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="请选择"
        />
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
import { updateLicenseAPI, createLicenseAPI } from '../api';
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
  license: '',
  hostInfo: '',
  status: '',
  effDate: '',
});
const formRules = reactive({
  license: [{ required: true, message: '必填', trigger: 'blur' }],
  hostInfo: [{ required: true, message: '必填', trigger: 'blur' }],
  status: [{ required: true, message: '必填', trigger: 'blur' }],
  effDate: [{ required: true, message: '必填', trigger: 'change' }],
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

const createRule = () => {
  createLicenseAPI(formData).then(res => {
    submitSuccess(res);
  });
};

const updateLicense = () => {
  const id = currentRow?.value?.id;
  if (!id) {
    return;
  }
  updateLicenseAPI(id, formData).then(res => {
    submitSuccess(res);
  });
};

const submit = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (props.openType === 'Add') {
        createRule();
      } else if (props.openType === 'Edit') {
        updateLicense();
      }
    }
  });
};
</script>
