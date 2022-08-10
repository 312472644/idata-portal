<template>
  <el-scrollbar height="100vh" class="base-side-container fixed-left">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="1-1">权限设置</el-menu-item>
        <el-menu-item index="1-2">规则配置</el-menu-item>
        <el-menu-item index="1-3">日志追踪</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.base-side-container {
  width: $side-width;
  height: calc(100vh - $base-head-height);
  border-right: 1px solid #ebecee;
  &.fixed-left {
    position: fixed;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-item {
    &.is-active {
      background-color: #e6f1ff;
    }
  }
}
</style>
