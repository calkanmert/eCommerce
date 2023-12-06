<script setup lang="ts">
import { ref, defineAsyncComponent, markRaw } from 'vue';
import type Column from 'primevue/column';
import { useDialog } from 'primevue/usedialog';
import { useToast } from "primevue/usetoast";

const selected = ref();
const dialog = useDialog();
const toast = useToast();

const CategoryModalComponent = defineAsyncComponent(() => import('@/components/modals/CategoryModalComponent.vue'));

const categories: any = ref([
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  {
    name: 'Garden',
    numberOfProducts: 5,
  },
  {
    name: 'Office',
    numberOfProducts: 90,
  },
  
]);

const loading = false;

const columns = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    field: 'numberOfProducts',
    header: 'Number of Products',
    sortable: true,
  },
];

const lazyParams = {
  first: 0,
  rows: 10,
  page: 0,
  sortField: 'garden',
  sortOrder: -1,
  search: null,
};

const lazyResult = {
  data: '',
  totalRecords: categories.value.length,
};

function buildQuery() {
  const sortField = lazyParams.sortField;
  const sortOrder = lazyParams.sortOrder;
  const search = lazyParams.search;
  const rows = lazyParams.rows;
  const page = lazyParams.page;
  const url = new URL('http://localhost:/3200');
  url.searchParams.append("param1", "değer1");
}

function loadCategories(data: any) {
  console.log(data);
}

function showCreateCategoryModal() {
  const dialogRef = dialog.open(CategoryModalComponent, {
    global: {
      mode: 'create',
    },    
    props: {
      header: 'Create Category',
      style: {
        width: '25vw',
      },
      draggable: false,
      modal: true,
    },
    onClose: (options: any) => {
      if (options.data?.status === 'success') {
        toast.add({ severity: 'success', summary: 'Success!', detail: 'Category Created.', group: 'bc', life: 3000 });
      }
    },
  });
}
</script>

<template>
  <h1 class="h3 mb-3">Category</h1>
  <div class="row">
    <div class="col-md-12">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <DataTable
              ref="dt"
              v-model:selection="selected"
              selectionMode="multiple" 
              showGridlines
              :value="categories"
              columnResizeMode="fit"
              dataKey="name" 
              tableStyle="min-width: 50rem"
              :rows="lazyParams.rows"
              :first="0"
              paginator
              lazy
              :totalRecords="lazyResult.totalRecords"
              :loading="loading"
              @page="loadCategories($event)"
              @sort="loadCategories($event)"
            >
              <template #header>
                <div class="d-flex justify-content-between">
                  <Button icon="pi pi-plus" size="small" text rounded @click="showCreateCategoryModal"></Button>
                  <div class="d-flex gap-2">
                    <span class="p-input-icon-left">
                      <i class="pi pi-search"></i>
                      <InputText placeholder="Search" />
                    </span>
                  </div>
                </div>
              </template>
              <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
              <Column v-for="(column, index) in columns" :key="index" :field="column.field" :sortable="column.sortable" :header="column.header">
                <template #body>
                  <template v-if="column.field === 'numberOfProducts'">
                    <Badge severity="primary" value="1"></Badge>
                  </template>
                  <template v-else>
                    {{ categories[index][column.field] }}
                  </template>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DynamicDialog />
  <Toast position="bottom-center" group="bc" />
</template>
