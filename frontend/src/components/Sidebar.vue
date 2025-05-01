<template>
  <aside class="w-full m-2 mb-1 bg-gray-800 text-white p-6 shadow-md flex flex-col rounded-lg">
    <nav class="space-y-4 flex-1" >
      <ul class="space-y-2">
      <li
          v-for="(todoList, index) in todoStore?.todoLists || []"
          :key="todoList.id"
      >
        <label
            class="block w-full hover:text-gray-400 transition duration-300 cursor-pointer"
            @click="todoStore.loading ? null : (
              selectedList = todoList.id,
              todoStore.fetchTodoList(todoList.id)
            )"
            :class="todoStore.loading ? 'cursor-wait hover:text-gray-100' : ''"
        >
            <input
                :value="todoList.id"
                v-model="selectedList"
                :disabled="todoStore.loading"
                type="radio"
                name="lists"
                class="mr-2 checked:ml-4 peer hidden"
            >
          <span :class="`peer-checked:ml-4 w-2 h-2 rounded-full inline-block transition-all ${todoList?.color.name || 'bg-blue-500'}`"></span>
            {{todoList.name}}
        </label>
      </li>
        <li class="text-center">
          <button
              class=" flex-1 px-2 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              @click="isAdding = true"
          >
            + Nowa lista
          </button>
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

const auth = useAuthStore()
const todoStore = useTodoStore()
const isAdding = ref(true)
const selectedList= ref(null)

const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}
onMounted(async () => {
  await todoStore.fetchTodoLists()
  if (!todoStore.todoList) {
    await todoStore.fetchTodoLists()
    if (todoStore.todoLists.length > 0) {
      await todoStore.fetchTodoList(todoStore.todoLists[0].id)
      selectedList.value = todoStore.todoLists[0].id
    }
  }
})
async function addTodoList(){

}

</script>
