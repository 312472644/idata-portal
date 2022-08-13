<template>
  <el-dialog v-model="visible" title="新增权限" width="30%" :close-on-click-modal="false" @close="cancel">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
// import { ref } from 'vue';
defineProps({
  visible: Boolean,
});

const emits = defineEmits(['update:visible']);

const cancel = () => {
  emits('update:visible', false);
};

const confirm = () => {
  cancel();
};
</script>
