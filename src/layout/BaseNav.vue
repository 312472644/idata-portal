<template>
  <div class="base-nav-container">
    <el-breadcrumb class="bread-crumb" :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in navList" :key="item" :to="item.path" :replace="true">
        {{ item?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import routes from '../routers/routes';
import { INav } from '@interface/index';

const route = useRoute();
const navList: INav[] = reactive([]);

const getNavList = (newValue: INav) => {
  const parentRoute = routes.find(item => {
    return (item?.children || []).find(subItem => subItem.path === newValue.path);
  });
  if (parentRoute) {
    const { path, meta = {} } = parentRoute;
    navList.push({ title: meta.title as string, path });
  }
  navList.push(newValue);
};

watch(
  route,
  newValue => {
    navList.length = 0;
    getNavList({ title: newValue.meta.title as string, path: newValue.path });
  },
  { immediate: true }
);
</script>
<style lang="scss">
.base-nav-container {
  display: flex;
  align-items: center;
  height: 40px;
}
.el-breadcrumb {
  .el-breadcrumb__inner.is-link {
    font-size: 12px;
    color: #a6acb5;
    font-weight: normal;
  }
  .el-breadcrumb__item:last-of-type {
    .is-link {
      color: #333;
    }
  }
}
</style>
