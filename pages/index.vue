<script setup lang='ts'>
const commonStore = useCommonStore();

setTimeout(() => {
  commonStore.getList('categories');
}, 1000);
</script>

<template>
  <h2>Home Page</h2>
  tt:
  <p>{{ commonStore.list }}</p>
</template>