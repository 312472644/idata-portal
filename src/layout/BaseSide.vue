<template>
  <el-scrollbar height="100vh" class="base-side-container fixed-left">
    <el-menu
      :router="true"
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      v-for="item in menuList"
      :key="item.path"
    >
      <el-sub-menu v-if="!item?.meta?.hidden" :index="item.path">
        <template #title>
          <el-icon v-if="item?.meta?.icon"><component :is="item?.meta?.icon" /></el-icon>
          <span>{{ item?.meta?.title }}</span>
        </template>
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.path">
          {{ subItem?.meta?.title }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import routes from '../routers/routes';

const route = useRoute();
const menuList = reactive(routes);

const activeMenu = ref<string>('');

watch(
  route,
  newValue => {
    activeMenu.value = newValue.path;
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.base-side-container {
  float: left;
  width: $side-width;
  height: calc(100vh - $base-head-height);
  border-right: 1px solid #ebecee;
  background: #fff;
  z-index: 999;
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
