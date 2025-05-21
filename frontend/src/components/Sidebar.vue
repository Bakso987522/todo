<template>
  <aside class="w-full m-2 mb-1 bg-gray-800 text-white p-6 shadow-md flex flex-col rounded-lg">
    <nav class="space-y-4 flex-1" >

      <ul v-auto-animate class="space-y-2">
      <li
          v-for="(todoList, index) in lists"
          :key="todoList.id"
      >
        <label
            class="block w-full hover:text-gray-400 transition duration-300 cursor-pointer"
            @click="todoStore.loading ? null : (
              uiStore.currentList = todoList.id,
              todoStore.fetchTodoList(uiStore.currentList),
              uiStore.setTodoView()
            )"
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
            {{todoList.name}}
        </label>
      </li>
        <li class="text-center">
          <LoadingButton
              text="+ Nowa lista"
              :loading="uiStore.currentTodoView === 'newtodolist'"
              loadingText="+ Nowa lista"
              @click="(uiStore.setNewTodoView(), selectedList = null)"
              :spin=false
          />
        </li>
      </ul>
    </nav>

    <LoadingButton
        text="Wyloguj"
        :loading="auth.loading"
        loadingText="Wylogowywanie..."
        @click="handleLogout"
    />

  </aside>
</template>
<script setup>
import {onMounted, ref, computed} from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import router from '@/router/index.js'
import {useTodoStore} from '@/stores/todoStore.js'
import LoadingButton from "@/components/LoadingButton.vue";
import {useUiStore} from "@/stores/uiStore.js";

const auth = useAuthStore()
const todoStore = useTodoStore()
const selectedList= ref(null)
const uiStore = useUiStore()

const lists = computed(() =>
    (todoStore?.todoLists || []).filter(list => !list.deleted)
)

const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}
onMounted(() => {
  todoStore.initializeTodoLists()
})

</script>
