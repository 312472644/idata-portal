<script setup lang="ts">
import { ref, defineProps, Ref } from 'vue';

defineProps<{ msg: string }>();

const count: Ref<number> = ref(0);
</script>

<template>
  <div>
    <h1 class="h1">{{ msg }}</h1>
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<style lang="scss" scope>
.h1 {
  color: #42b983;
}
</style>
