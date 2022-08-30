<template>
  <el-dialog
    v-model="visible"
    :title="getTitle"
    width="30%"
    :close-on-click-modal="false"
    @close="cancel"
    @open="openHandler"
  >
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef" label-width="140px">
      <el-form-item prop="taskName" label="任务名">
        <el-input v-model="formData.taskName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="taskStatus" label="任务状态">
        <el-input v-model="formData.taskStatus" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="executePlan" label="执行计划">
        <el-input v-model="formData.executePlan" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="startReadDataTime" label="开始读取数据时间">
        <el-date-picker
          v-model="formData.startReadDataTime"
          class="date-picker"
          type="date"
          placeholder="请选择"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item prop="timeStampField" label="时间戳字段">
        <el-input v-model="formData.timeStampField" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="localStorage" label="是否本地存储">
        <el-radio-group v-model="formData.localStorage">
          <el-radio label="Y" size="large">是</el-radio>
          <el-radio label="N" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="storageTime" label="本地存储时长">
        <el-input v-model="formData.storageTime" placeholder="请输入"></el-input>
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
import { createTaskAPI, updateTaskAPI } from '../api';
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
  taskName: '',
  taskStatus: '',
  executePlan: '',
  startReadDataTime: '',
  timeStampField: '',
  localStorage: '',
  storageTime: '',
});
const formRules = reactive({
  taskName: [{ required: true, message: '必填', trigger: 'blur' }],
  taskStatus: [{ required: true, message: '必填', trigger: 'blur' }],
  executePlan: [{ required: true, message: '必填', trigger: 'blur' }],
  startReadDataTime: [{ required: true, message: '必填', trigger: 'change' }],
  timeStampField: [{ required: true, message: '必填', trigger: 'blur' }],
  localStorage: [{ required: true, message: '必填', trigger: 'change' }],
  storageTime: [{ required: true, message: '必填', trigger: 'blur' }],
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
const createTask = () => {
  createTaskAPI(formData).then(res => {
    submitSuccess(res);
  });
};

// 更新字典
const updateTask = () => {
  const id = currentRow?.value?.id;
  if (!id) {
    return;
  }
  updateTaskAPI(id, formData).then(res => {
    submitSuccess(res);
  });
};

const submit = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (props.openType === 'Add') {
        createTask();
      } else if (props.openType === 'Edit') {
        updateTask();
      }
    }
  });
};
</script>
<style lang="scss" scoped>
:deep .date-picker {
  width: 100%;
  .el-input__wrapper {
    width: 100%;
  }
}
</style>
