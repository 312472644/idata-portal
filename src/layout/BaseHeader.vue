<template>
  <div :data-collapse="stateMap.menuCollapse" class="base-header-container fixed-top">
    <div class="logo-collapse" :style="getSideWidth">
      <div class="logo">
        <img :src="logo" />
        <span class="logo-text">IData</span>
      </div>
    </div>
    <el-icon class="collapse-icon" :size="22" color="#4f5059" @click="expand" v-show="iconCollapse">
      <Expand />
    </el-icon>
    <el-icon class="collapse-icon" :size="22" color="#4f5059" @click="expand" v-show="!iconCollapse"><Fold /></el-icon>
    <div role="operation" class="operation">
      <ul class="operation-box">
        <li class="operation-item">
          <el-icon color="#8d95a0" class="icon" title="通知" :size="20"><Bell /></el-icon>
        </li>
        <li class="operation-item">
          <el-icon color="#8d95a0" class="icon" title="网页全屏" :size="20" @click="fullScreen"><FullScreen /></el-icon>
        </li>
        <li class="operation-item">
          <el-dropdown popper-class="operation-dropdown-popper" trigger="click">
            <span class="el-dropdown-link">
              <img :src="avatar" class="avatar" />
              <span class="avatar-user" :title="userInfo?.userName">{{ userInfo?.userName }}</span>
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useState } from '../hooks';
import { computed, reactive, ref } from 'vue';
import { geCachetUserInfo } from '@utils/index';

const router = useRouter();
const store = useStore();
const stateMap = useState('common', ['menuCollapse']);
const dyStyle = ref<string>('');
const userInfo = reactive(geCachetUserInfo());
const iconCollapse = ref<boolean>(false);

const applicationExit = () => {
  sessionStorage.clear();
  router.push('/login');
};

const fullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};

const expand = () => {
  store.commit('changeMenuCollapse', !stateMap.menuCollapse);
  setTimeout(() => {
    iconCollapse.value = !iconCollapse.value;
  }, 300);
};

const getSideWidth = computed(() => {
  const width = stateMap.menuCollapse ? '64px' : '209px';
  return `${dyStyle.value}width:${width} !important`;
});
</script>
<style lang="scss">
.base-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $base-head-height;
  padding-right: 15px;
  background: #fcfcfc;
  border-bottom: 1px solid #ebecee;
  &[data-collapse='true'] {
    .collapse-icon {
      left: 79px;
    }
  }
  &.fixed-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .logo {
    display: flex;
    align-items: center;
    > img {
      width: 32px;
      height: 32px;
    }
    .logo-text {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin-left: 12px;
    }
  }
  .operation {
    padding-right: 5px;
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
  .logo-collapse {
    display: flex;
    align-items: center;
    width: 209px;
    height: 50px;
    background: var(--el-menu-bg-color);
    padding-left: 20px;
    transition: width 0.3s linear;
  }
  .collapse-icon {
    position: absolute;
    left: 225px;
    cursor: pointer;
    transition: left 0.3s linear;
  }
  .avatar-user {
    display: inline-block;
    padding: 0 5px;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.operation-dropdown-popper {
  .el-dropdown-menu__item {
    width: 60px;
  }
}
</style>
