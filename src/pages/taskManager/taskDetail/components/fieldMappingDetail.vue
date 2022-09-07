<template>
  <category v-for="(item, index) in props.data" :key="index" :title="'字段映射' + (index + 1)">
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label="源字段名称">{{ item.sourceFieldName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="源字段类型">{{ item.sourceFieldType }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="源字段长度">{{ item.sourceFieldLength }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="目标字段名称">{{ item.targetFieldName }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="目标字段类型">{{ item.targetFieldType }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="目标字段长度">{{ item.sourceFieldLength }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="序号">{{ item.seqNo }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转换数据">{{ item.changeData }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="转换规则">{{ item.changeRule }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </category>
</template>
<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});
</script>
<style lang="scss" scoped></style>
