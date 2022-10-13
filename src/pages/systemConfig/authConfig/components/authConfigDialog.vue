<template>
  <el-drawer
    custom-class="el-drawer-box"
    v-model="visible"
    direction="rtl"
    :close-on-click-modal="false"
    :size="900"
    @open="openHandler"
  >
    <template #header>
      <div class="header">
        <span>{{ getTitle }}</span>
      </div>
    </template>
    <template #default>
      <el-form :model="formData" :rules="formRules" ref="ruleFormRef" label-width="130px">
        <category title="基本信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="认证名称" prop="authName">
                <el-input v-model="formData.authName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据源认证类型" prop="authType">
                <el-select class="select-full-width" v-model="formData.authType" placeholder="请选择">
                  <el-option v-for="item in authTypeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </category>
        <category title="数据库信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="formData.userName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="dbSchema" prop="dbSchema">
                <el-input v-model="formData.dbSchema" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据库版本" prop="dbVersion">
                <el-input v-model="formData.dbVersion" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="数据库连接串" prop="connectStr">
                <el-input
                  v-model="formData.connectStr"
                  maxlength="100"
                  placeholder="请输入"
                  show-word-limit
                  type="textarea"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </category>
        <category title="API请求信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="API请求地址" prop="requestAddress">
                <el-input v-model="formData.requestAddress" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="API请求方式" prop="requestMethod">
                <el-select class="select-full-width" v-model="formData.requestMethod" placeholder="请选择">
                  <el-option
                    v-for="item in requestMethodList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="API请求超时时长" prop="connectionTimeout">
                <el-input v-model="formData.connectionTimeout" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="API请求重试次数" prop="retryCount">
                <el-input-number v-model="formData.retryCount" :min="1" :max="10" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="API请求参数" prop="requestBody">
                <edit-table ref="editTableBodyRef" :tableList="requestBodyList"></edit-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="API请求头" prop="requestHeader">
                <edit-table ref="editTableHeaderRef" :tableList="requestHeaderList"></edit-table>
              </el-form-item>
            </el-col>
          </el-row>
        </category>
        <category title="API响应信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="响应成功路径" prop="responseOkPath">
                <el-input v-model="formData.responseOkPath" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="响应成功标识" prop="responseOkMark">
                <el-input v-model="formData.responseOkMark" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="响应数据路径" prop="responseDataPath">
                <el-input v-model="formData.responseDataPath" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </category>
      </el-form>
    </template>
    <template #footer>
      <div class="btn-operation">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { getConfigList, setFormField } from '@utils/index';
import { FormInstance } from 'element-plus';
import { computed, reactive, ref, toRefs } from 'vue';
import { createDsAuthAPI, updateDsAuthAPI } from '../api';

const props = defineProps({
  visible: Boolean,
  openType: String,
  currentRow: {
    type: Object
  }
});
const emits = defineEmits(['update:visible', 'submit-success']);
const editTableBodyRef = ref();
const editTableHeaderRef = ref();
const requestBodyList = reactive([]);
const requestHeaderList = reactive([]);
const ruleFormRef = ref<FormInstance>();
const authTypeList = reactive([]);
const requestMethodList = reactive([]);
const formData = reactive({
  authName: '',
  authType: '', //数据源认证类型
  status: '',
  connectStr: '', //数据库连接串
  userName: '',
  password: '',
  dbSchema: '',
  dbVersion: '', // 数据库版本
  requestAddress: '', // API请求地址
  requestMethod: '', // API请求方式
  requestBody: '', //API请求参数
  requestHeader: '', //API请求头
  connectionTimeout: '', //API请求超时时长 单位s Default 60
  retryCount: 0, // API请求重试次数 Default 1
  responseOkPath: '', // 响应成功路径
  responseOkMark: '', // 响应成功标识
  responseDataPath: '' // 响应数据路径
});

const checkRequestBody = (rule: any, value: any, callback: any) => {
  const isValid = editTableBodyRef.value.checkIsValid();
  if (!isValid) {
    callback(new Error('必填'));
  } else {
    callback();
  }
};

const checkRequestHeader = (rule: any, value: any, callback: any) => {
  const isValid = editTableHeaderRef.value.checkIsValid();
  if (!isValid) {
    callback(new Error('必填'));
  } else {
    callback();
  }
};

const formRules = reactive({
  authName: [{ required: true, message: '必填', trigger: 'blur' }],
  authType: [{ required: true, message: '必填', trigger: 'blur' }],
  status: [{ required: true, message: '必填', trigger: 'blur' }],
  connectStr: [{ required: true, message: '必填', trigger: 'blur' }],
  userName: [{ required: true, message: '必填', trigger: 'blur' }],
  password: [{ required: true, message: '必填', trigger: 'blur' }],
  dbSchema: [{ required: true, message: '必填', trigger: 'blur' }],
  dbVersion: [{ required: true, message: '必填', trigger: 'blur' }],
  requestAddress: [{ required: true, message: '必填', trigger: 'blur' }],
  requestBody: [{ required: true, validator: checkRequestBody, trigger: 'blur' }],
  requestHeader: [{ required: true, validator: checkRequestHeader, trigger: 'blur' }],
  requestMethod: [{ required: true, message: '必填', trigger: 'change' }],
  connectionTimeout: [{ required: true, message: '必填', trigger: 'blur' }],
  retryCount: [{ required: true, message: '必填', trigger: 'blur' }],
  responseOkPath: [{ required: true, message: '必填', trigger: 'blur' }],
  responseOkMark: [{ required: true, message: '必填', trigger: 'blur' }],
  responseDataPath: [{ required: true, message: '必填', trigger: 'blur' }]
});
const currentRow = toRefs(props).currentRow;

const getTitle = computed(() => {
  return props.openType === 'Add' ? '新增' : '编辑';
});

const getAuthTypeList = async () => {
  const dataList = await getConfigList('authType');
  authTypeList.length = 0;
  authTypeList.push(...dataList);
};

const getRequestMethodList = async () => {
  const dataList = await getConfigList('requestMethod');
  requestMethodList.length = 0;
  requestMethodList.push(...dataList);
};

const setEditTableList = () => {
  if (props.openType === 'Edit') {
    requestBodyList.length = 0;
    requestHeaderList.length = 0;
    requestBodyList.push(...JSON.parse(currentRow?.value?.requestBody));
    requestHeaderList.push(...JSON.parse(currentRow?.value?.requestHeader));
  }
};

const openHandler = async () => {
  await getRequestMethodList();
  await getAuthTypeList();
  setFormField(formData, currentRow?.value);
  setEditTableList();
};

const submitSuccess = (res: any) => {
  const { code, success } = res.data;
  if (code === 200 && success) {
    cancel();
    emits('submit-success');
  }
};

const createDsAuth = () => {
  createDsAuthAPI(formData).then(res => {
    submitSuccess(res);
  });
};

const updateDsAuth = () => {
  const id = currentRow?.value?.id;
  if (!id) {
    return;
  }
  updateDsAuthAPI(id, formData).then(res => {
    submitSuccess(res);
  });
};

const cancel = () => {
  ruleFormRef.value?.resetFields();
  editTableBodyRef.value.reset();
  editTableHeaderRef.value.reset();
  emits('update:visible', false);
};

const submit = () => {
  const requestHeader = editTableHeaderRef.value.getTableList();
  const requestBody = editTableBodyRef.value.getTableList();
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      formData.requestBody = JSON.stringify(requestBody);
      formData.requestHeader = JSON.stringify(requestHeader);
      if (props.openType === 'Add') {
        createDsAuth();
      } else if (props.openType === 'Edit') {
        updateDsAuth();
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.el-drawer-box {
  .header {
    display: flex;
    align-items: center;
  }
  .el-row {
    :deep .el-col:nth-of-type(2) {
      padding-left: 15px;
    }
  }
  .btn-operation {
    text-align: right;
  }
}
</style>
