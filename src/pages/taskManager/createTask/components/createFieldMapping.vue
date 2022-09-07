<template>
  <card class="grid-box">
    <el-form :model="formData" :rules="formRules" ref="ruleFormRef" label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sourceFieldName" label="源字段名称">
            <el-input v-model="formData.sourceFieldName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sourceFieldType" label="源字段类型">
            <el-input v-model="formData.sourceFieldType" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="sourceFieldLength" label="源字段长度">
            <el-input v-model="formData.sourceFieldLength" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="targetFieldType" label="目标字段类型">
            <el-input v-model="formData.targetFieldType" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="targetFieldName" label="目标字段名称">
            <el-input v-model="formData.targetFieldName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="targetFieldLength" label="目标字段长度">
            <el-input v-model="formData.targetFieldLength" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="seqNo" label="序号">
            <el-input v-model="formData.seqNo" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="changeData" label="转换数据">
            <el-radio-group v-model="formData.changeData">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="changeRule" label="转换规则">
            <el-input v-model="formData.changeRule" placeholder="请输入"></el-input>
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
import { createFieldMappingAPI, getFieldMappingDetailAPI, updateFieldMappingAPI } from '../api';
import { ElMessage, FormInstance } from 'element-plus';
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { setFormField } from '@utils/index';

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const queryParam = route.query;
const formData = reactive({
  id: '',
  taskId: queryParam?.taskId as string,
  taskStepId: queryParam?.taskStepId as string,
  sourceFieldName: '', // 源字段名称
  sourceFieldType: '', // 源字段类型
  sourceFieldLength: 0, // 源字段长度
  targetFieldName: '', // 目标字段名称
  targetFieldLength: 0, // 目标字段长度
  targetFieldType: '',
  seqNo: 0, // 序号
  changeData: '', // 装换数据：是/否
  changeRule: '' // 装换规则
});
const formRules = reactive({
  taskStepId: [{ required: true, message: '必填', trigger: 'blur' }],
  sourceFieldName: [{ required: true, message: '必填', trigger: 'blur' }],
  sourceFieldLength: [{ required: true, message: '必填', trigger: 'blur' }],
  targetFieldName: [{ required: true, message: '必填', trigger: 'blur' }],
  targetFieldLength: [{ required: true, message: '必填', trigger: 'blur' }],
  targetDsType: [{ required: true, message: '必填', trigger: 'blur' }],
  changeData: [{ required: true, message: '必填', trigger: 'change' }],
  seqNo: [{ required: true, message: '必填', trigger: 'blur' }],
  changeRule: [{ required: true, message: '必填', trigger: 'blur' }],
  sourceFieldType: [{ required: true, message: '必填', trigger: 'blur' }],
  targetFieldType: [{ required: true, message: '必填', trigger: 'blur' }]
});

const nextPage = () => {
  router.push({
    path: '/taskManager/taskList'
  });
};

const getFieldMappingDetail = () => {
  const taskId = queryParam.taskId as string;
  const operationType = queryParam.operationType;
  if (!taskId || operationType !== 'Edit') {
    return;
  }
  getFieldMappingDetailAPI(taskId).then(res => {
    const { data = [] } = res.data;
    if (data.length > 0) {
      setFormField(formData, data[0]);
    }
  });
};

const cancel = () => {
  router.push({
    path: '/taskManager/taskList'
  });
};

const submitSuccess = (res: any) => {
  const { code, success } = res.data;
  if (code === 200 && success) {
    ElMessage({
      message: '操作成功',
      type: 'success'
    });
    nextPage();
  }
};

const createFieldMapping = () => {
  createFieldMappingAPI(formData).then(res => {
    submitSuccess(res);
  });
};

const updateFieldMapping = () => {
  const taskId = route.query.taskId as string;
  if (!taskId) {
    return;
  }
  updateFieldMappingAPI(formData.id, formData).then(res => {
    submitSuccess(res);
  });
};

const submit = () => {
  if (!formData.taskStepId) {
    return;
  }
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (queryParam.operationType === 'Edit') {
        updateFieldMapping();
      } else {
        createFieldMapping();
      }
    }
  });
};

onMounted(() => {
  getFieldMappingDetail();
});
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
}
</style>
