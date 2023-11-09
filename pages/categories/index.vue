<script setup lang="ts">
import { useCategoryStore, type Category } from '~/stores/category.store';
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import { useConfirm } from "primevue/useconfirm";

// init store & get list
const categoryStore = useCategoryStore();
categoryStore.getList(false);

// filters
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// export
const categoryTableRef = ref<DataTable>();
const exportCSV = () => {
  categoryTableRef.value?.exportCSV();
};

// edit 
const onEdit = (category?: Category) => {
  if (!category) {
    category = {name: '', tags: []};
  }
  categoryStore.selectedCategory = {...category};
  categoryStore.displayEditDialog = true;
}

// delete 
const confirm = useConfirm();
const confirmDeletion = (category: Category) => {
  confirm.require({
    message: `Are you sure you want to delete category "${category?.name}"?`,
    header: 'Delete Category?',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    rejectIcon: 'pi pi-times',
    acceptIcon: 'pi pi-trash',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    defaultFocus: 'reject',
    accept: () => {
      categoryStore.delete(category?.id || 0);
    },
  })
}
</script>

<template>
  <div>
    <!-- table -->
    <DataTable
      ref="categoryTableRef"
      :value="categoryStore.categories"
      data-key="id"
      scrollable
      :striped-rows="true"
      :filters="filters"
      :global-filter-fields="['name', 'tags']"
      :loading="categoryStore.isLoadingList || categoryStore.isSaving || categoryStore.isDeleting"
      export-filename="Categories"
    >
      <!-- table header -->
      <template #header>
        <div class="flex justify-content-between">
          <!-- table name -->
          <div class="flex align-items-center justify-content-center text-xl text-900 font-bold">Categories</div>

          <!-- search box  -->
          <div class="flex align-items-center justify-content-center">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters.global.value" placeholder="Search" />
            </span>
          </div>

          <!-- new & export btns -->
          <div class="flex align-items-center justify-content-end">
            <Button label="Add" icon="pi pi-plus" severity="success" class="mr-2" @click="onEdit()" />
            <Button icon="pi pi-external-link" label="Export" @click="exportCSV()" />
          </div>
        </div>
      </template>

      <!-- column: id -->
      <Column field="id" header="ID" style="width: 4%; min-width: 2rem"></Column>

      <!-- column: name  -->
      <Column field="name" header="Name" style="width: 25%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" ref="nameInput" />
        </template>
      </Column>

      <!-- column: tags -->
      <Column field="tags" header="Tags" style="width: 30%">
        <template #body="{ data, field }">
          <Chip v-for="tag in data[field]" :key="tag" :label="tag" class="mr-1">{{ tag }}</Chip>
        </template>
        <template #editor="{ data, field }">
          <Chips v-model="data[field]" separator="," :add-on-blur="true" :allow-duplicate="false" />
        </template>
      </Column>

      <!-- column: actions -->
      <Column :row-editor="true" style="width: 8%; min-width: 8rem" frozen align-frozen="right">
        <template #body="{data}">

          <!-- edit btn -->
          <Button icon="pi pi-pencil" size="small" text rounded severity="secondary" v-tooltip.top="'Edit'" @click="onEdit(data)" />

          <!-- delete btn -->
          <Button icon="pi pi-trash" size="small" text rounded severity="danger" v-tooltip.top="'Delete'" @click="confirmDeletion(data)" />

        </template>
      </Column>
    </DataTable>

    <!-- create/edit dialog -->
    <CategoryFormDialog v-if="categoryStore.displayEditDialog && categoryStore.selectedCategory"/>
    <!-- delete dialog -->
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>
