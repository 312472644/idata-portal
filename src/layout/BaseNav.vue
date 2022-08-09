<template>
  <div class="base-nav-container">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>page one</el-breadcrumb-item>
      <el-breadcrumb-item>page two</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
</script>
<style lang="scss">
.base-nav-container {
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
