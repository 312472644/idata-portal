<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Card',
});
</script>
<style lang="scss" scoped>
.card {
  padding: 15px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 1px 1px 5px #d8dae4;
}
</style>
