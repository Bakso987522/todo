<template>
  <tr class="hidden lg:table-row align-middle">
    <td class="p-2">{{ user.id }}</td>
    <td class="p-2">{{ user.email }}</td>
    <td class="p-2">
      <select v-model="role_id" class="input w-full mt-4">
        <option :value="1">user</option>
        <option :value="2">admin</option>
      </select>
    </td>
    <td class="p-2">
      <select v-model="max_lists" class="input w-full mt-4">
        <option :value="null">Bez limitu</option>
        <option v-for="n in listLimits" :key="n" :value="n">{{ n }}</option>
      </select>
    </td>
    <td class="p-2">
      <select v-model="max_tasks_per_list" class="input w-full mt-4">
        <option :value="null">Bez limitu</option>
        <option v-for="n in taskLimits" :key="n" :value="n">{{ n }}</option>
      </select>
    </td>
    <td class="p-2">
      <LoadingButton text="Zapisz"
                     :loading="admin.loading && hasChanges"
                     loadingText=""
                     @click="emitUpdate"
                     class="w-full bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1.5 rounded text-sm disabled:opacity-50"
                     :disabled="!hasChanges"
      ></LoadingButton>
    </td>
  </tr>

  <tr class="lg:hidden border-t border-gray-700">
    <td colspan="6" class="p-4 text-sm">
      <div class="mb-2"><strong>ID:</strong> {{ user.id }}</div>
      <div class="mb-2"><strong>Email:</strong> {{ user.email }}</div>

      <div class="mb-2">
        <label class="block text-gray-400 text-xs mb-1">Rola</label>
        <select v-model="role_id" class="input w-full">
          <option :value="1">user</option>
          <option :value="2">admin</option>
        </select>
      </div>

      <div class="mb-2">
        <label class="block text-gray-400 text-xs mb-1">Listy</label>
        <select v-model="max_lists" class="input w-full">
          <option :value="null">Bez limitu</option>
          <option v-for="n in listLimits" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="mb-2">
        <label class="block text-gray-400 text-xs mb-1">Zadania</label>
        <select v-model="max_tasks_per_list" class="input w-full">
          <option :value="null">Bez limitu</option>
          <option v-for="n in taskLimits" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <LoadingButton text="Zapisz"
                      :loading="admin.loading && hasChanges"
                      loadingText="Zapisuję..."
                      @click="emitUpdate"
                      class="w-full bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1.5 rounded text-sm disabled:opacity-50"
                      :disabled="!hasChanges"
                     ></LoadingButton>
    </td>
  </tr>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useAdminStore} from "@/stores/adminStore.js";
import LoadingButton from "@/components/LoadingButton.vue";
const admin = useAdminStore();
const props = defineProps({
  user: Object,
  listLimits: Array,
  taskLimits: Array,
});

const emit = defineEmits(['updated']);

const role_id = ref(props.user.role_id);
const max_lists = ref(props.user.max_lists);
const max_tasks_per_list = ref(props.user.max_tasks_per_list);

const hasChanges = computed(() => {
  return (
      role_id.value !== props.user.role_id ||
      max_lists.value !== props.user.max_lists ||
      max_tasks_per_list.value !== props.user.max_tasks_per_list
  );
});

function emitUpdate() {
  emit('updated', {
    id: props.user.id,
    role_id: role_id.value,
    max_lists: max_lists.value,
    max_tasks_per_list: max_tasks_per_list.value,
  });
}




</script>
