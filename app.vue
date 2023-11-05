<script setup lang="ts">
import AppAlert from '~/components/shared/AppAlert.vue';

interface Person {
  firstName: string;
  lastName: string;
  age?: number;
}
const me: Person = {
  firstName: 'Serqio',
  lastName: 'Vella'
}
const appConfig = useAppConfig()
</script>

<template>
  <NuxtPage/>
</template>
