<script setup lang="ts">
import { useCategoryStore, type Category } from '~/stores/category.store';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const categoryStore = useCategoryStore();

const { defineComponentBinds, handleSubmit, resetForm, errors } = useForm({
  validationSchema: yup.object({
    id: yup.number(),
    name: yup.string().required().trim().label('Name'),
    tags: yup.array().label('Tags'),
    }),
  initialValues: {...categoryStore.selectedCategory}
});

const form = ref({
  name: defineComponentBinds('name'),
  tags: defineComponentBinds('tags'),
});

const isNew = computed((): boolean => categoryStore.selectedCategory?.id ? false : true);
const dialogHeader = computed(() => categoryStore.selectedCategory?.id ? 'Update Category' : 'Create Category');

const hideDialog = () => {
  categoryStore.selectedCategory = null;
  categoryStore.displayEditDialog = false;
};

const onSubmit = handleSubmit((values) => {
  categoryStore.createOrUpdate(values as Category);
});
</script>

<template>
  <Dialog v-model:visible="categoryStore.displayEditDialog" modal :header="dialogHeader" :style="{ width: '40rem' }">
    <form @submit.prevent="onSubmit()">
      <div class="field">
        <label for="name">Full name</label>
        <InputText v-bind.trim="form.name" aria-describedby="name-help" :autofocus="isNew" :class="{ 'p-invalid': errors.name }" />
        <small id="name-help" class="p-error">
          {{ errors.name }}
        </small>
      </div>

      <div class="field">
        <label for="tags">Tags:</label>
        <Chips v-bind="form.tags" separator="," :add-on-blur="true" :allow-duplicate="false" />
      </div>
    </form>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" severity="secondary" text @click="hideDialog()" />
      <Button label="Save" icon="pi pi-check" text severity="success" @click="onSubmit()" />
    </template>
  </Dialog>
</template>

<style lang="scss">
.field > * {
  display: block;
  width: 100%;
}
</style>
