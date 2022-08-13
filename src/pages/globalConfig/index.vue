<template>
  <div>全局配置</div>
</template>
<script lang="ts" setup>
import service from '../../service';
service({
  method: 'GET',
  url: 'services/gamingDatabase/tier_rank_list.php?timezone=8&appid=1&api_version=9.9.9&plate=web&platform=web&language_id=1&gameID=1&ts=1660367510&server_id=1&key_page=&sign=7F9001691F78C147C7AC84DC51779B7B',
});
</script>
<style lang="scss" scoped></style>
