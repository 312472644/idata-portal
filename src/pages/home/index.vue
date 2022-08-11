<template>
  <div class="h1">useState:{{ stateMap.title }}</div>
  <el-button @click="change">change</el-button>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { useState } from '../../hooks';

const store = useStore();
const stateMap = useState('common', ['title']);

const change = () => {
  store.commit('changeNavList', '2222');
};
</script>

<style lang="scss" scope></style>
