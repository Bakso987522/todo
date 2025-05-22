<template>
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
    <form class="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4" v-auto-animate>
      <input
          v-model="filters.email"
          placeholder="Szukaj po emailu"
          class="input bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
          v-model="filters.role"
          class="input bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Wszystkie role</option>
        <option v-for="role in roles" :key="role.id ?? 'all'" :value="role.name">
          {{ role.name }}
        </option>
      </select>
    </form>

    <div class="overflow-hidden transition-all duration-500 rounded border border-gray-700 w-full min-h-[50vh]">
      <table class="w-full table-auto text-sm align-middle table-">
        <thead class="bg-gray-700 text-gray-300 uppercase text-xs">
        <tr class="lg:table-row hidden">
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Rola</th>
          <th class="p-3 text-left">Listy</th>
          <th class="p-3 text-left">Zadania</th>
          <th class="p-3 text-left">Akcje</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-700"  v-auto-animate>
        <UserItem
            v-for="user in users.data"
            :key="user.id"
            :user="user"
            :list-limits="listLimits"
            :task-limits="taskLimits"
            @updated="emitUpdate"
        />
        </tbody>
      </table>
    </div>

    <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex gap-4">
        <LoadingButton
            text="Poprzednia"
            :loading="admin.loading && activeButton === 'prev'"
            loadingText=""
            @click="prevPage"
            class="w-32 button gray px-4 py-2 disabled:opacity-50"
            :disabled="!users.prev_page_url"
        />

        <LoadingButton
            text="Następna"
            :loading="admin.loading && activeButton === 'next'"
            loadingText=""
            @click="nextPage"
            class="w-32 button gray px-4 py-2 disabled:opacity-50"
            :disabled="!users.next_page_url"
        />


      </div>

      <div class="flex items-center gap-2 text-sm text-gray-300">
        <span>Pokaż:</span>
        <select
            v-model="perPage"
            class="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
        >
          <option v-for="n in [5,10,15]" :key="n" :value="n">{{ n }}</option>
        </select>
        <span>wyników</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/adminStore';
import UserItem from '@/components/UserItem.vue';
import {debounce} from "lodash";
import LoadingButton from "@/components/LoadingButton.vue";

const admin = useAdminStore();
const emit = defineEmits(['updated']);
const {
  users,
  filters,
  roles,
  page,
  perPage,
  listLimits,
  taskLimits,
} = storeToRefs(admin);

onMounted(() => {
  admin.fetchUsers();
});

const debouncedFilter = debounce(() => {
  page.value = 1;
  admin.fetchUsers();
}, 500);

watch(filters, () => {
  debouncedFilter();
}, { deep: true });

watch(perPage, () => {
  admin.setPerPage(perPage.value);
});

onUnmounted(() => {
  debouncedFilter.cancel();
});
function emitUpdate(payload) {
  emit('updated', payload);
}
const activeButton = ref(null);

async function prevPage() {
  if (users.value.prev_page_url && page.value > 1) {
    activeButton.value = 'prev';
    await admin.setPage(page.value - 1);
    activeButton.value = null;
  }
}

async function nextPage() {
  if (users.value.next_page_url) {
    activeButton.value = 'next';
    await admin.setPage(page.value + 1);
    activeButton.value = null;
  }
}


</script>
