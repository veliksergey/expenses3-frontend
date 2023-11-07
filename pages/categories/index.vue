<script setup lang='ts'>
import { useCategoryStore } from '~/stores/category.store';

const categoryStore = useCategoryStore();
const fillCategories = () => {
  categoryStore.getList(true);
}

categoryStore.getList(false);
</script>

<template>
  <h2>Categories Page</h2>
  <hr>
  <Button label="Reload" @click="fillCategories()" size="small"></Button>
  <br>
  <CategoryList></CategoryList>

  <!-- <pre>
    {{categoryStore.categories}}
  </pre> -->

</template>