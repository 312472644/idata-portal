<template>
  <el-scrollbar :data-collapse="stateMap.menuCollapse" :style="getSideWidth" class="base-side-container fixed-left">
    <el-menu :router="true" :collapse="stateMap.menuCollapse" :default-active="activeMenu">
      <div v-for="item in menuList" :key="item.path">
        <el-sub-menu v-if="!item?.meta?.hidden" :index="item.path">
          <template #title>
            <span :class="['icon', 'iconfont', item?.meta?.icon]"></span>
            <span class="menu-title">{{ item?.meta?.title }}</span>
          </template>
          <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.path">
            {{ subItem?.meta?.title }}
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useState } from '../hooks';
import routes from '../routers/routes';

const route = useRoute();
const stateMap = useState('common', ['menuCollapse']);

const menuList = reactive(routes);
const activeMenu = ref<string>('');
const dyStyle = ref<string>('height:100vh;');

watch(
  route,
  newValue => {
    activeMenu.value = newValue.path;
  },
  { immediate: true }
);

const getSideWidth = computed(() => {
  const width = stateMap.menuCollapse ? '65px' : '210px';
  return `${dyStyle.value}width:${width} !important`;
});
</script>
<style lang="scss" scoped>
.base-side-container {
  float: left;
  width: $side-width !important;
  height: calc(100vh - $base-head-height);
  border-right: 1px solid #ebecee;
  background: var(--el-menu-bg-color);
  z-index: 999;
  transition: width 0.3s linear;
  &.fixed-left {
    position: fixed;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-item {
    &.is-active,
    &.is-active:hover {
      color: #fff;
      background: linear-gradient(30deg, #4767d9, #5878e7, #5b7bea);
    }
    &:hover {
      background-color: unset;
    }
  }
  :deep .el-sub-menu.is-active {
    .el-sub-menu__title {
      color: #fff;
    }
  }
  .menu-title {
    margin-left: 10px;
  }
  &[data-collapse='true'] {
    :deep .el-sub-menu__icon-arrow {
      display: none;
    }
    :deep .menu-title {
      overflow: hidden;
    }
  }
  &[data-collapse='false'] {
    :deep .menu-title {
      overflow: auto;
    }
  }
  :deep .el-sub-menu .el-menu {
    background-color: #373d58;
  }
}
</style>
