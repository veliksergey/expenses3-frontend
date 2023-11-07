<script setup>
import AppMenu from './AppMenu.vue';
</script>

<template>
    <div class="layout-sidebar">
        <div class="sidebar-header">
            <NuxtLink to='/'>Expenses3</NuxtLink>
        </div>
        <div class="layout-menu-container">
            <AppMenu />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
