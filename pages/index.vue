<script setup lang='ts'>
const categoryStore = useCategoryStore();

categoryStore.getOne(2, true);
</script>

<template>
  <h2>Home Page</h2>
  tt:
  <p>{{ categoryStore.selectedCategory }}</p>
</template>