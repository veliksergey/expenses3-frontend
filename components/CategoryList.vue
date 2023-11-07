<script setup lang='ts'>
const categoryStore = useCategoryStore();
</script>

<template>
  <div>

  <pre>{{categoryStore.categories}}</pre>
  </div>
</template>