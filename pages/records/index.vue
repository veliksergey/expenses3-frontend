<script setup lang="ts">
import { useRecordStore, type Record } from '~/stores/record.store';
import DataTable from 'primevue/datatable';
import { TypeEnum } from '~/models/type.model';
import type { MenuItem } from 'primevue/menuitem';

const recordStore = useRecordStore();
recordStore.getList();

// export
// const recordTableRef = ref<DataTable>();
// const exportCSV = () => {
//   recordTableRef.value?.exportCSV();
// };

// create/edit
const onCreateClick = () => {};
const onEditClick = (record: Record) => {};

const addItems: MenuItem[] = [
  {
    label: 'Expense',
    icon: 'pi pi-minus-circle',
    command: () => onAdd(TypeEnum.OUT)
  },
  {
    label: 'Income',
    icon: 'pi pi-plus-circle',
    command: () => onAdd(TypeEnum.IN)
  },
  {
    label: 'Loan Payment',
    icon: 'pi pi-minus-circle',
    command: () => onAdd(TypeEnum.LOAN_OUT)
  },
  {
    label: 'Loan Borrowing',
    icon: 'pi pi-plus-circle',
    command: () => onAdd(TypeEnum.LOAN_IN)
  },
  {
    label: 'Subscription Out',
    icon: 'pi pi-minus-circle',
    command: () => onAdd(TypeEnum.SUBSCRIPTION_OUT)
  },
  {
    label: 'Subscription In',
    icon: 'pi pi-plus-circle',
    command: () => onAdd(TypeEnum.SUBSCRIPTION_IN)
  },
];
const onAdd = (typeEnum: TypeEnum = TypeEnum.OUT) => {
  console.log('-- onAdd()', typeEnum);
}

// delete
// ToDo: delete
</script>

<template>
  <div>
    <DataTable ref="recordTableRef" :value="recordStore.list" data-key="id" scrollable :striped-rows="true" :loading="recordStore.isLoadingList || recordStore.isSaving || recordStore.isDeleting" export-filename="Records">
      <!-- table header -->
      <template #header>
        <div class="flex justify-content-between">
          <!-- table name -->
          <div class="flex align-items-center justify-content-center text-xl text-900 font-bold">Records</div>

          <!-- search box -->
          <!-- ToDo: search box -->

          <!-- action btns -->
          <div class="flex align-items-center justify-content-end">
            <SplitButton icon="pi pi-plus" severity="success" class="mr-2" @click="onAdd()" :model="addItems"/>
          </div>
        </div>
      </template>
      
      <Column field="id" header="ID" style="width: 4%; min-width: 2rem"></Column>

    </DataTable>
  </div>
</template>
