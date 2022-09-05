<template>
  <div class="category">
    <div class="category-title">{{ props.title }}</div>
    <div class="category-body">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
});
</script>
<style lang="scss" scoped>
.category {
  position: relative;
  .category-title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 12px;
    &::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 14px;
      background: #409eff;
      left: 0;
      bottom: 0;
      top: 3px;
    }
  }
  .category-body {
    padding-top: 20px;
  }
}
</style>
