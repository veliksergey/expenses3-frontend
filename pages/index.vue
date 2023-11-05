
<template>
  <div class="">
    <Sidebar v-model:visible="visible">
      <h2>Sidebar</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="visible = true" />

    <hr>

    <div class="redish">Redish</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
