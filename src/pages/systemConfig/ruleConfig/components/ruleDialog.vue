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
      <el-form-item prop="ruleName" label="规则名称">
        <el-input v-model="formData.ruleName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="ruleType" label="规则类型">
        <el-select class="select-full-width" v-model="formData.ruleType" placeholder="请选择">
          <el-option v-for="item in ruleTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="ruleStatus" label="规则状态">
        <el-input v-model="formData.ruleStatus" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="ruleLanguage" label="规则语言">
        <el-input v-model="formData.ruleLanguage" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="ruleCode" label="规则代码">
        <el-input v-model="formData.ruleCode" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item prop="comments" label="规则描述">
        <el-input v-model="formData.comments" :rows="2" type="textarea" placeholder="请输入"></el-input>
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
import { updateRuleAPI, createRuleAPI } from '../api';
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
  ruleName: '',
  ruleType: '',
  ruleStatus: '',
  ruleLanguage: '',
  ruleCode: '',
  comments: '',
});
const formRules = reactive({
  ruleName: [{ required: true, message: '必填', trigger: 'blur' }],
  ruleType: [{ required: true, message: '必填', trigger: 'change' }],
  ruleStatus: [{ required: true, message: '必填', trigger: 'blur' }],
  ruleLanguage: [{ required: true, message: '必填', trigger: 'blur' }],
  ruleCode: [{ required: true, message: '必填', trigger: 'blur' }],
});
const ruleTypeOptions = reactive([
  { label: '下拉引擎', value: '0' },
  { label: '表达式', value: '1' },
]);
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
  createRuleAPI(formData).then(res => {
    submitSuccess(res);
  });
};

const updateRule = () => {
  const id = currentRow?.value?.id;
  if (!id) {
    return;
  }
  updateRuleAPI(id, formData).then(res => {
    submitSuccess(res);
  });
};

const submit = () => {
  ruleFormRef.value?.validate(valid => {
    if (valid) {
      if (props.openType === 'Add') {
        createRule();
      } else if (props.openType === 'Edit') {
        updateRule();
      }
    }
  });
};
</script>
