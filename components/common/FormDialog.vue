<script setup lang="ts">
import { useCommonStore, type CommonModel } from '~/stores/common.store';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
const commonStore = useCommonStore();

const props = defineProps({
  modelName: {type: String,required: true,},
  capitalizedModelName: {type: String,required: true,},
});

const { defineComponentBinds, handleSubmit, resetForm, errors } = useForm({
  validationSchema: yup.object({
    id: yup.number(),
    name: yup.string().required().trim().label('Name'),
    description: yup.string().trim().label('Description'), // ToDo: max length
    tags: yup.array().label('Tags'),
  }),
  initialValues: { ...commonStore.selected },
});

const form = ref({
  name: defineComponentBinds('name'),
  tags: defineComponentBinds('tags'),
  description: defineComponentBinds('description'),
});

const isNew = computed((): boolean => (commonStore.selected?.id ? false : true));
const dialogHeader = computed(() => (commonStore.selected?.id ? `Update ${props.capitalizedModelName}` : `Create ${props.capitalizedModelName}`));

const hideDialog = () => {
  commonStore.selected = null;
  commonStore.displayEditDialog = false;
};

const onSubmit = handleSubmit((values) => {
  commonStore.createOrUpdate(props.modelName, values as CommonModel);
});
</script>

<template>
  <Dialog v-model:visible="commonStore.displayEditDialog" modal :header="dialogHeader" :style="{ width: '40rem' }">
    <form @submit.prevent="onSubmit()">
      <div class="field">
        <label for="name">Name</label>
        <InputText v-bind.trim="form.name" aria-describedby="name-help" :autofocus="isNew" :class="{ 'p-invalid': errors.name }" />
        <small id="name-help" class="p-error">
          {{ errors.name }}
        </small>
      </div>

      <div class="field">
        <label for="tags">Tags:</label>
        <Chips v-bind="form.tags" separator="," :add-on-blur="true" :allow-duplicate="false" />
      </div>

      <div class="field">
        <label for="description">Description:</label>
        <Textarea v-bind="form.description"/>
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
