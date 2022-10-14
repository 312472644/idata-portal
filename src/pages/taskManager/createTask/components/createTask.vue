<template>
  <card class="grid-box">
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef" label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="taskName" label="任务名">
            <el-input v-model="formData.taskName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="taskStatus" label="任务状态">
            <el-input v-model="formData.taskStatus" placeholder="请输入"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"
          ><el-form-item prop="executePlan" label="执行计划">
            <el-input v-model="formData.executePlan" placeholder="请输入"></el-input>
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
      <el-row>
        <el-col :span="8">
          <el-form-item prop="timeStampField" label="时间戳字段">
            <el-input v-model="formData.timeStampField" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="localStorage" label="是否本地存储">
            <el-radio-group v-model="formData.localStorage">
              <el-radio label="Y" size="large">是</el-radio>
              <el-radio label="N" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="storageTime" label="本地存储时长">
            <el-input v-model="formData.storageTime" placeholder="请输入"></el-input>
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
import { createTaskAPI, getTaskDetailAPI, updateTaskAPI } from '../api';
import { ElMessage, FormInstance } from 'element-plus';
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { setFormField } from '@utils/index';

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const queryParam = route.query;
const formData = reactive({
  taskName: '',
  taskStatus: '',
  executePlan: '',
  startReadDataTime: '',
  timeStampField: '',
  localStorage: '',
  storageTime: '',
  createdBy: 'xiongxiong'
});
const formRules = reactive({
  taskName: [{ required: true, message: '必填', trigger: 'blur' }],
  taskStatus: [{ required: true, message: '必填', trigger: 'blur' }],
  executePlan: [{ required: true, message: '必填', trigger: 'blur' }],
  startReadDataTime: [{ required: true, message: '必填', trigger: 'change' }],
  timeStampField: [{ required: true, message: '必填', trigger: 'blur' }],
  localStorage: [{ required: true, message: '必填', trigger: 'change' }],
  storageTime: [{ required: true, message: '必填', trigger: 'blur' }]
});

const nextPage = (taskId: string) => {
  router.push({
    path: '/taskManager/createTask',
    query: {
      ...route.query,
      taskId,
      active: 2
    }
  });
};

const getTaskDetail = () => {
  const taskId = queryParam.taskId as string;
  if (!taskId) {
    return;
  }
  getTaskDetailAPI(taskId).then(res => {
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

const createTask = () => {
  createTaskAPI(formData).then(res => {
    submitSuccess(res);
  });
};

const updateTask = () => {
  const taskId = route.query.taskId as string;
  if (!taskId) {
    return;
  }
  updateTaskAPI(taskId, formData).then(res => {
    submitSuccess(res);
  });
};

const submit = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (queryParam.operationType === 'Edit') {
        updateTask();
      } else {
        createTask();
      }
    }
  });
};

onMounted(() => {
  getTaskDetail();
});
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
}
</style>
