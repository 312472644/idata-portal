<template>
  <div class="not-found">
    <div class="not-found-bg">
      <img :src="notFound" />
    </div>
    <div class="operation">
      <div class="not-found-text">Page Not Found</div>
      <div class="bnt-to-home"><el-button type="primary" round @click="toHome">返回主页</el-button></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import notFound from '@assets/404.jpg';

import { useRouter } from 'vue-router';
const router = useRouter();

const toHome = () => {
  router.replace('/');
};
</script>
<style lang="scss" scoped>
.not-found {
  height: 100vh;
  background: #f7f7f9;
  .not-found-bg {
    text-align: center;
  }
  .operation {
    text-align: center;
    transform: translateY(-50px);
  }
  .not-found-text {
    font-size: 18px;
    font-weight: bold;
  }
  .bnt-to-home {
    padding-top: 10px;
  }
}
</style>
