<script setup lang='ts'>
import { ref } from 'vue';
import { useLayout } from '~/layouts/composables/layout';

const { onConfigSidebarToggle } = useLayout();

const model = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      navigateTo({ path: '/' });
    },
  },
  {
    label: 'Categories',
    icon: '',
    command: () => {
      navigateTo({ path: '/categories' });
    },
  },
  {
    label: 'Categories',
    icon: '',
    command: () => {
      navigateTo({ path: '/common/categories'})
    }
  },
  {
    label: 'Types',
    icon: '',
    command: () => {
      navigateTo({ path: '/common/types'})
    }
  },
  {
    label: 'Accounts',
    icon: '',
    command: () => {
      navigateTo({ path: '/common/accounts'})
    }
  },
  {
    label: 'Vendors',
    icon: '',
    command: () => {
      navigateTo({ path: '/common/vendors'})
    }
  },
  {
    label: 'Statuses',
    icon: '',
    command: () => {
      navigateTo({ path: '/common/statuses'})
    }
  },
  {
    label: 'Conditions',
    icon: '',
    command: () => {
      navigateTo({ path: '/common/conditions'})
    }
  },
  {
    label: 'Users',
    icon: '',
    command: () => {
      navigateTo({ path: '/common/users'})
    }
  },
]);

const onConfigButtonClick = () => {
  onConfigSidebarToggle();
};
</script>

<template>
  <Menu :model='model'></Menu>

  <Button
    icon='pi pi-cog'
    text
    rounded
    severity='secondary'
    @click='onConfigButtonClick'
    label='Settings'
  ></Button>
</template>

<style lang='scss' scoped></style>
