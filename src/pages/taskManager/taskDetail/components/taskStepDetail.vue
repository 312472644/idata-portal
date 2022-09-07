<template>
  <category v-for="(item, index) in props.data" :key="index" :title="'步骤' + (index + 1)">
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label="步骤名称">{{ item.stepName }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="步骤序号">{{ item.stepSeq }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="源数据类型">{{ item.sourceDsType }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始读取数据时间">{{ item.startReadDataTime }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间戳字段">{{ item.timeStampField }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="目标数据源类型">{{ item.targetDsType }}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="更新数据">{{ item.updateData }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="更新key">{{ item.updateKey }}</el-form-item>
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
