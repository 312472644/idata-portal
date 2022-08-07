<template>
  <div class="h1">
    {{ msg }}
    <el-button type="primary">Primary</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';

const msg: Ref<string> = ref('Home');
</script>

<style lang="scss" scope>
.h1 {
  color: #42b983;
}
</style>
