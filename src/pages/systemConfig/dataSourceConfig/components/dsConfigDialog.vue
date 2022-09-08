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
              <el-form-item label="数据源名称" prop="dsName">
                <el-input v-model="formData.dsName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据源类型" prop="dsType">
                <el-input v-model="formData.dsType" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据源认证id" prop="dsAuthId">
                <el-input v-model="formData.dsAuthId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </category>
        <category title="数据库信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态" prop="status">
                <el-input v-model="formData.status" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表名" prop="tableName">
                <el-input v-model="formData.tableName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="sql语句" prop="sqlStr">
                <el-input v-model="formData.sqlStr" placeholder="请输入" type="textarea" :rows="3"></el-input>
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
                    v-for="item in requestMethodOptions"
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
              <el-form-item label="API请求参数" prop="requestBody">
                <el-input v-model="formData.requestBody" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="API请求头" prop="requestHeader">
                <el-input v-model="formData.requestHeader" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="API请求超时时长" prop="connectionTimeout">
                <el-input v-model.number="formData.connectionTimeout" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="API请求重试次数" prop="retryCount">
                <el-input-number v-model="formData.retryCount" :min="1" :max="10" />
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
        <category title="API分页信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否分页" prop="paging">
                <el-radio-group v-model="formData.paging">
                  <el-radio label="Y">是</el-radio>
                  <el-radio label="N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="formData.paging === 'Y'">
            <el-col :span="12">
              <el-form-item label="分页路径" prop="pageNoPath">
                <el-input v-model="formData.pageNoPath" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="每页大小路径" prop="pageSizePath">
                <el-input v-model="formData.pageSizePath" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="formData.paging === 'Y'">
            <el-col :span="12">
              <el-form-item label="总记录路径" prop="totalPath">
                <el-input v-model="formData.totalPath" placeholder="请输入"></el-input>
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
import { setFormField } from '@utils/index';
import { FormInstance } from 'element-plus';
import { computed, reactive, ref, toRefs } from 'vue';
import { createDSConfigAPI, updateDSConfigAPI } from '../api';

const props = defineProps({
  visible: Boolean,
  openType: String,
  currentRow: {
    type: Object
  }
});
const emits = defineEmits(['update:visible', 'submit-success']);
const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  dsName: '',
  dsType: '', //数据源认证类型
  status: '',
  sqlStr: '', //数据库连接串
  tableName: '',
  dsAuthId: '',
  requestAddress: '', // API请求地址
  requestMethod: '', // API请求方式
  requestBody: '', //API请求参数
  requestHeader: '', //API请求头
  connectionTimeout: 60, //API请求超时时长 单位s Default 60
  retryCount: 0, // API请求重试次数 Default 1
  responseOkPath: '', // 响应成功路径
  responseOkMark: '', // 响应成功标识
  responseDataPath: '', // 响应数据路径
  paging: 'N', // 是否分页
  pageNoPath: '', //是否分页路径
  pageSizePath: '', // 每页大小路径
  totalPath: '' // 总记录路径
});
const formRules = reactive({
  dsName: [{ required: true, message: '必填', trigger: 'blur' }],
  dsType: [{ required: true, message: '必填', trigger: 'blur' }],
  status: [{ required: true, message: '必填', trigger: 'blur' }],
  sqlStr: [{ required: true, message: '必填', trigger: 'blur' }],
  tableName: [{ required: true, message: '必填', trigger: 'blur' }],
  requestAddress: [{ required: true, message: '必填', trigger: 'blur' }],
  requestBody: [{ required: true, message: '必填', trigger: 'blur' }],
  requestMethod: [{ required: true, message: '必填', trigger: 'change' }],
  requestHeader: [{ required: true, message: '必填', trigger: 'blur' }],
  connectionTimeout: [{ required: true, message: '必填', trigger: 'blur' }],
  retryCount: [{ required: true, message: '必填', trigger: 'blur' }],
  responseOkPath: [{ required: true, message: '必填', trigger: 'blur' }],
  responseOkMark: [{ required: true, message: '必填', trigger: 'blur' }],
  responseDataPath: [{ required: true, message: '必填', trigger: 'blur' }],
  paging: [{ required: true, message: '必填', trigger: 'blur' }],
  pageNoPath: [{ required: true, message: '必填', trigger: 'blur' }],
  pageSizePath: [{ required: true, message: '必填', trigger: 'blur' }],
  totalPath: [{ required: true, message: '必填', trigger: 'blur' }]
});
const currentRow = toRefs(props).currentRow;
const requestMethodOptions = reactive([
  { label: 'POST', value: 'POST' },
  { label: 'GET', value: 'GET' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'PUT', value: 'PUT' }
]);

const getTitle = computed(() => {
  return props.openType === 'Add' ? '新增' : '编辑';
});

const openHandler = () => {
  setFormField(formData, currentRow?.value);
};

const submitSuccess = (res: any) => {
  const { code, success } = res.data;
  if (code === 200 && success) {
    cancel();
    emits('submit-success');
  }
};

const createDsConfig = () => {
  createDSConfigAPI(formData).then(res => {
    submitSuccess(res);
  });
};

const updateDsConfig = () => {
  const id = currentRow?.value?.id;
  if (!id) {
    return;
  }
  updateDSConfigAPI(id, formData).then(res => {
    submitSuccess(res);
  });
};

const cancel = () => {
  ruleFormRef.value?.resetFields();
  emits('update:visible', false);
};

const submit = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (props.openType === 'Add') {
        createDsConfig();
      } else if (props.openType === 'Edit') {
        updateDsConfig();
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
    :deep .el-col:first-of-type {
      padding-right: 15px;
    }
  }
  .btn-operation {
    text-align: right;
  }
}
</style>
