<template>
  <card class="grid-box">
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef" label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="stepName" label="步骤名称">
            <el-input v-model="formData.stepName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="stepSeq" label="步骤序号">
            <el-input v-model="formData.stepSeq" placeholder="请输入"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sourceDsId" label="源数据源类型">
            <el-select
              class="select-full-width"
              v-model="formData.sourceDsId"
              placeholder="请选择"
              @change="sourceDsTypeChange"
            >
              <el-option
                v-for="item in sourceDsTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="startReadDataTime" label="开始读取数据时间">
            <el-date-picker
              v-model="formData.startReadDataTime"
              class="date-picker"
              type="date"
              placeholder="请选择"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8">
          <el-form-item prop="timeStampField" label="时间戳字段">
            <el-input v-model="formData.timeStampField" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="8">
          <el-form-item prop="targetDsId" label="目标数据源类型">
            <el-select
              class="select-full-width"
              v-model="formData.targetDsId"
              placeholder="请选择"
              @change="targetDsTypeChange"
            >
              <el-option
                v-for="item in targetDsTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="updateData" label="更新数据">
            <el-radio-group v-model="formData.updateData">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="updateKey" label="更新key">
            <el-input v-model="formData.updateKey" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </card>
</template>
<script lang="ts" setup>
import { createTaskStepAPI, getTaskStepDetailAPI, updateTaskStepAPI } from '../api';
import { ElMessage, FormInstance } from 'element-plus';
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { setFormField } from '@utils/index';

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const queryParam = route.query;
const formData = reactive({
  taskId: (queryParam?.taskId as string) || '',
  stepName: '',
  stepSeq: '',
  sourceDsType: '',
  sourceDsId: '',
  startReadDataTime: '',
  targetDsType: '',
  targetDsId: '',
  // timeStampField: '',
  updateData: '',
  updateKey: ''
});
const formRules = reactive({
  stepName: [{ required: true, message: '必填', trigger: 'blur' }],
  stepSeq: [{ required: true, message: '必填', trigger: 'blur' }],
  sourceDsType: [{ required: true, message: '必填', trigger: 'change' }],
  startReadDataTime: [{ required: true, message: '必填', trigger: 'change' }],
  timeStampField: [{ required: true, message: '必填', trigger: 'blur' }],
  targetDsType: [{ required: true, message: '必填', trigger: 'change' }],
  updateData: [{ required: true, message: '必填', trigger: 'change' }],
  updateKey: [{ required: true, message: '必填', trigger: 'blur' }]
});
const sourceDsTypeOptions = reactive([
  { label: '数据源1', value: '1' },
  { label: '数据源2', value: '2' }
]);

const targetDsTypeOptions = reactive([
  { label: '目标数据源1', value: '1' },
  { label: '目标数据源2', value: '2' }
]);

const nextPage = (taskStepId: string) => {
  router.push({
    path: '/taskManager/createTask',
    query: {
      ...route.query,
      taskStepId,
      active: 3
    }
  });
};

const sourceDsTypeChange = val => {
  formData.sourceDsType = sourceDsTypeOptions.find(item => item.value === val)?.label || '';
};
const targetDsTypeChange = val => {
  formData.targetDsType = targetDsTypeOptions.find(item => item.value === val)?.label || '';
};

const getTaskDetail = () => {
  const taskId = queryParam.taskId as string;
  if (!taskId) {
    return;
  }
  getTaskStepDetailAPI(taskId).then(res => {
    const { data = {} } = res.data;
    setFormField(formData, data);
  });
};

const cancel = () => {
  router.push({
    path: '/taskManager/taskList'
  });
};

const submitSuccess = (res: any) => {
  const { code, success, data } = res.data;
  if (code === 200 && success) {
    ElMessage({
      message: '操作成功',
      type: 'success'
    });
    nextPage(data.id);
  }
};

const createTaskStep = () => {
  createTaskStepAPI(formData).then(res => {
    submitSuccess(res);
  });
};

const updateTaskStep = () => {
  updateTaskStepAPI(formData.taskId, formData).then(res => {
    submitSuccess(res);
  });
};

const submit = () => {
  const taskId = route.query.taskId as string;
  if (!taskId) {
    return;
  }
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (queryParam.operationType === 'Edit') {
        updateTaskStep();
      } else {
        createTaskStep();
      }
    }
  });
};

onMounted(() => {
  // getTaskDetail();
});
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
}
</style>
