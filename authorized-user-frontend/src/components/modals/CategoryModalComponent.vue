<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from 'vue';
import { useForm } from 'vee-validate';
import { useToast } from "primevue/usetoast";
import { capitalizeFirstLetter } from '@/helpers/string-helper';
import formSchema from '@/form-schematics/category';
import { useCategoryStore } from '@/stores/category';

const dialogRef: any = inject("dialogRef");
const mode: Ref<'create' | 'edit'> = ref('create');

const { create } = useCategoryStore();
const toast = useToast();

const spinnerState = ref(false);

const { values, errors, defineInputBinds, meta } = useForm({
  validationSchema: formSchema,
});
const name = defineInputBinds('name');

onMounted(() => {
  mode.value = dialogRef.value.options.global.mode;
});

const closeDialog = (data: any) => {
  dialogRef.value.close(data);
};

async function onSubmit() {
  spinnerState.value = true;
  const result = await create(values.name);
  if (result.status) {
    closeDialog({
      status: 'success',
    });
    return;
  }
  toast.add({ severity: 'error', summary: 'Error!', detail: result.data.message, group: 'bc', life: 3000 });
  spinnerState.value = false;
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex flex-column gap-2">
      <div class="d-flex flex-column gap-2">
        <label for="username">Name</label>
        <InputText v-bind="name" :class="{ 'p-invalid': errors.name }" />
        <span class="text-danger" v-if="errors.name">{{ capitalizeFirstLetter(errors.name) }}</span>
      </div>
    </div>
    <div class="d-flex justify-content-end gap-2 mt-4">
      <template v-if="!spinnerState">
        <Button type="button" label="Close" severity="secondary" @click="closeDialog"></Button>
        <Button type="submit" :label="capitalizeFirstLetter(mode)" :disabled="!meta.valid"></Button>
      </template>
      <ProgressSpinner v-else style="width:40px; height:40px" strokeWidth="7" />
    </div>
    <Toast position="bottom-center" group="bc" />
  </form>
</template>