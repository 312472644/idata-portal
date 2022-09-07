<template>
  <el-form>
    <el-row>
      <el-col :span="8">
        <el-form-item label="任务名称">{{ props.data.taskName }}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="任务状态">{{ props.data.taskStatus }}</el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="执行计划">{{ props.data.executePlan }}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开始读取数据时间">{{ props.data.startReadDataTime }}</el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="时间戳字段">{{ props.data.timeStampField }}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否本地存储">{{ props.data.localStorage }}</el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="本地存储时长">{{ props.data.storageTime }}</el-form-item>
      </el-col>
    </el-row>
  </el-form>
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
