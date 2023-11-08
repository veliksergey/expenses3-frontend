<script setup lang='ts'>
import { useCategoryStore, type Category } from '~/stores/category.store';
import {FilterMatchMode} from 'primevue/api';
import DataTable from 'primevue/datatable';

// init store & get list
const categoryStore = useCategoryStore();
categoryStore.getList(false);

// filters
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
});

// export
const categoryTableRef = ref<DataTable>();
const exportCSV = () => {
  categoryTableRef.value?.exportCSV();
}

// row edit
const editingRows = ref<Category[]>([]);
const save = () => {
  console.log('-- save()');
  // categoryStore.createOrUpdate(editingRows.value[0]);
  console.log(categoryTableRef.value);
  // categoryTableRef.value?.$emit.editingRows();
}
const onRowEditSave =({newData, index}: {newData: Category, index: number}) => {
  console.log('-- onRowEditSave:', index, newData);
}
const tt = (event: any) => {
  console.log('-- tt:', event)
}
const dd = (event: any) => {
  console.log('-- dd:', event)
}

// save 
const nameInput = ref();
const addNew = () => {
  categoryStore.categories.unshift({
    name: '',
    tags: [],
  });
  editingRows.value = [{...categoryStore.categories[0]}];
  // nextTick(() => {
  //   nameInput.value.$el.focus();
  // });
  setTimeout(() => {
    nameInput.value.$el.focus();
  }, 100);
}
</script>

<template>
  <div>

    {{ editingRows }}

    <!-- table -->
    <DataTable
    scrollable
    @update:editingRows="tt"
    @value-change="dd"
    ref="categoryTableRef" 
    :value="categoryStore.categories"
    data-key="id"
    key="id"
    :striped-rows="true"
    :filters="filters"
    :global-filter-fields="['name', 'tags']"
    :loading="categoryStore.isLoadingList || categoryStore.isCreating || categoryStore.isUpdating || categoryStore.isDeleting"
    edit-mode="row"
    v-model:editing-rows="editingRows"
    @row-edit-save="onRowEditSave"
    export-filename="Categories"
    :pt="{
          table: { style: 'min-width: 50rem' },
          column: {
              bodycell: ({ state }: any) => ({
                  style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem' 
              })
          }
      }"
    >

      <!-- table header -->
      <template #header>
        <div class="flex justify-content-between">

          <!-- table name -->
          <div class="flex align-items-center justify-content-center text-xl text-900 font-bold">Categories</div>

          <!-- search box  -->
          <div class="flex align-items-center justify-content-center">
            <span class="p-input-icon-left">
              <i class="pi pi-search"/>
              <InputText v-model="filters.global.value" placeholder="Search"/>
            </span>
          </div>

          <!-- new & export btns -->
          <div class="flex align-items-center justify-content-end">
            <Button label="Add" icon="pi pi-plus" severity="success" class="mr-2" @click="addNew()"/>
            <Button icon="pi pi-external-link" label="Export" @click="exportCSV()"/>
          </div>
        </div>
      </template>

      <!-- column: id -->
      <Column field="id" header="ID" style="width: 4%; min-width: 2rem;"></Column>

      <!-- column: name  -->
      <Column field="name" header="Name" style="width: 25%">
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" ref="nameInput"/>
        </template>
      </Column>

      <!-- column: tags -->
      <Column field="tags" header="Tags" style="width: 30%">
        <template #body="{data, field}">
          <Chip 
            v-for="tag in data[field]" 
            :key="tag"
            :label="tag"
            class="mr-1"
          >{{ tag }}</Chip>
        </template>
        <template #editor="{ data, field }">
          <Chips 
          v-model="data[field]" 
          separator="," 
          :add-on-blur="true" 
          :allow-duplicate="false"
          />
        </template>
      </Column>
      
      <!-- column: actions -->
      <Column :row-editor="true" style="width: 8%; min-width: 8rem;" frozen align-frozen="right">
        <template #body="{data}">
          <template v-if="editingRows.length && editingRows[0].id === data.id">

            <!-- save icon -->
            <Button icon="pi pi-check" size="small" text rounded severity="success" v-tooltip.top="'Save'" @click="save()"/>

            <!-- cancel editing icon -->
            <Button icon="pi pi-times" size="small" text rounded severity="secondary" v-tooltip.top="'Cancel'" @click="editingRows = []"></Button>

          </template>
          <template v-else>

            <!-- edit icon -->
          <Button icon="pi pi-pencil" size="small" text rounded severity="secondary" v-tooltip.top="'Edit'" @click="editingRows = [data]"/>

          <!-- delete icon -->
          <Button icon="pi pi-trash" size="small" text rounded severity="danger" v-tooltip.top="'Delete'" @click=""/>

          </template>
        </template>
      </Column>

    </DataTable>
  </div>

</template>