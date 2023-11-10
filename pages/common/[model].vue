<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import { useConfirm } from "primevue/useconfirm";
const route = useRoute();
const commonStore = useCommonStore();

const modelName = ref<string>('');
const capitalizedModelName = computed(() => {
    return modelName.value[0].toUpperCase() + modelName.value.slice(1);
});

// init
watch(route, (value) => {
    modelName.value = value.params.model.toString() || '';
    commonStore.getList(modelName.value);
}, {deep: true, immediate: true});

const filters = ref({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS}
});

const tableRef = ref<DataTable>();
const exportCSV = () => {
    tableRef.value?.exportCSV();
}

// edit
const onEditClick = (model?: CommonModel) => {
    if (!model) {
        model = {name: '', tags: []};
    }
    commonStore.selected = {...model};
    commonStore.displayEditDialog = true;
}

// delete 
const confirm = useConfirm();
const confirmDeletion = (model: CommonModel) => {
  confirm.require({
    message: `Are you sure you want to delete "${model?.name}"?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    rejectIcon: 'pi pi-times',
    acceptIcon: 'pi pi-trash',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    defaultFocus: 'reject',
    accept: () => {
      commonStore.delete(modelName.value, model?.id || 0);
    },
  })
}
</script>

<template>
  <div>
    <!-- table -->
    <DataTable
      ref="tableRef"
      :value="commonStore.list"
      data-key="id"
      scrollable
      :striped-rows="true"
      :filters="filters"
      :global-filter-fields="['name', 'tags']"
      :loading="commonStore.isLoadingList || commonStore.isSaving || commonStore.isDeleting"
      :export-filename="capitalizedModelName"
    >
      <!-- table header -->
      <template #header>
        <div class="flex justify-content-between">
          <!-- table name -->
          <div class="flex align-items-center justify-content-center text-xl text-900 font-bold">{{ capitalizedModelName }}</div>

          <!-- search box  -->
          <div class="flex align-items-center justify-content-center">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters.global.value" placeholder="Search" />
            </span>
          </div>

          <!-- new & export btns -->
          <div class="flex align-items-center justify-content-end">
            <Button label="Add" icon="pi pi-plus" severity="success" class="mr-2" @click="onEditClick()" />
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
    <CommonFormDialog 
        v-if="commonStore.displayEditDialog && commonStore.selected"
        :modelName="modelName"
        :capitalizedModelName="capitalizedModelName"
    />
    <!-- delete dialog -->
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>
