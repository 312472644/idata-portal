<template>
  <div class="base-header-container">
    <div class="logo">
      <img :src="logo" />
      <span class="logo-text">IData</span>
    </div>
    <div role="operation">
      <ul class="operation-box">
        <li class="operation-item">
          <el-icon color="#8d95a0" class="icon" title="通知" :size="20"><Bell /></el-icon>
        </li>
        <li class="operation-item">
          <el-icon color="#8d95a0" class="icon" title="网页全屏" :size="20"><FullScreen /></el-icon>
        </li>
        <li class="operation-item">
          <el-dropdown popper-class="operation-dropdown-popper" trigger="click">
            <span class="el-dropdown-link">
              <img :src="avatar" class="avatar" />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="applicationExit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from '@assets/icon/logo.svg';
import avatar from '@assets/avatar.jpg';
import { ElMessage } from 'element-plus';

const applicationExit = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
</script>
<style lang="scss">
.base-header-container {
  display: flex;
  align-items: center;
  padding: $content-lr-padding;
  justify-content: space-between;
  height: $base-head-height;
  background-color: #fcfcfc;
  border-bottom: 1px solid #ebecee;
  .logo {
    display: flex;
    align-items: center;
    > img {
      width: 24px;
      height: 24px;
    }
    .logo-text {
      color: #333;
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .operation-box {
    display: flex;
    align-items: center;
    .operation-item:not(:last-of-type) {
      padding-right: 10px;
    }
    .icon {
      cursor: pointer;
    }
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
.operation-dropdown-popper {
  .el-dropdown-menu__item {
    width: 60px;
  }
}
</style>
