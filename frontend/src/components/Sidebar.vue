<template>
  <aside class="w-full m-2 mb-1 bg-gray-800 text-white p-6 shadow-md flex flex-col rounded-lg">
    <nav class="space-y-4 flex-1">
      <ul v-auto-animate class="space-y-2">
        <li
            v-for="(todoList, index) in lists"
            :key="todoList.id"
        >
          <label
              class="block w-full hover:text-gray-400 transition duration-300 cursor-pointer"
              @click="todoStore.loading ? null : handleListClick(todoList.id)"
              :class="todoStore.loading ? 'cursor-wait hover:text-gray-100' : ''"
          >
            <input
                :value="todoList.id"
                v-model="uiStore.currentList"
                :disabled="todoStore.loading"
                type="radio"
                name="lists"
                class="mr-2 checked:ml-4 peer hidden"
            >
            <span :class="`peer-checked:ml-4 w-2 h-2 rounded-full inline-block transition-all ${uiStore.colors.find(c => c.id === todoList?.color_id)?.name || 'bg-blue-500'}`"></span>
            {{ todoList.name }}
          </label>
        </li>
        <li class="text-center">
          <LoadingButton
              text="+ Nowa lista"
              :loading="uiStore.currentTodoView === 'newtodolist'"
              loadingText="+ Nowa lista"
              @click="handleNewListClick"
              :spin="false"
          />
        </li>
      </ul>
    </nav>

    <LoadingButton
        v-if="auth.isAdmin"
        text="Admin panel"
        @click="handleAdminPanelClick"
        color="red"
        class="mb-2"
        :disabled="router.currentRoute.value.path === '/adminpanel'"
    />

    <LoadingButton
        text="Wyloguj"
        :loading="auth.loading"
        loadingText="Wylogowywanie..."
        @click="handleLogoutClick"
    />
  </aside>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useTodoStore } from '@/stores/todoStore.js'
import { useUiStore } from '@/stores/uiStore.js'
import router from '@/router/index.js'
import LoadingButton from "@/components/LoadingButton.vue"

const auth = useAuthStore()
const todoStore = useTodoStore()
const uiStore = useUiStore()
const selectedList = ref(null)
const emit = defineEmits(['close'])

const lists = computed(() =>
    (todoStore?.todoLists || []).filter(list => !list.deleted)
)

const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}

const handleLogoutClick = async () => {
  await handleLogout()
  emit('close')
}

const handleAdminPanelClick = () => {
  uiStore.setAdminPanelView()
  emit('close')
}

const handleListClick = (listId) => {
  uiStore.currentList = listId
  todoStore.fetchTodoList(listId)
  uiStore.setTodoView()
  emit('close')
}

const handleNewListClick = () => {
  uiStore.setNewTodoView()
  selectedList.value = null
  emit('close')
}

onMounted(() => {
  todoStore.initializeTodoLists()
})
</script>
