<script setup>
import {onMounted, ref, computed} from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import router from '@/router/index.js'
import {useTodoStore} from '@/stores/todoStore.js'

const auth = useAuthStore()
const todoStore = useTodoStore()
const isAdding = ref(true)
const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}
onMounted(async () => {
  await todoStore.fetchTodoLists()
})
async function addTodoList(){

}

</script>
<template>
  <aside class="w-full m-2 mb-1 bg-gray-800 text-white p-6 shadow-md flex flex-col rounded-lg">

    <nav class="space-y-4 flex-1" >
      <ul class="space-y-2">
      <li
          class="hover:cursor-pointer hover:text-gray-500"
          :class="todoStore.todoList?.id === todoList.id ? 'ml-3' : ''"
          v-for="todoList in todoStore?.todoLists || []"
          :key="todoList.id"
          @click="todoStore.fetchTodoList(todoList.id)">
        <span :class="`w-2 h-2 rounded-full inline-block ${todoList?.color || 'bg-blue-500'}`"></span>
            {{todoList.name}}
      </li>
        <li class="text-center">
          <button
              class=" flex-1 px-2 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              @click="isAdding = !isAdding"
          >
            + Nowa lista
          </button>
        </li>
      </ul>
    </nav>
    <button @click="handleLogout" :disabled="auth.loading" class="hover:text-gray-500 text-xl  disabled:opacity-40">Wyloguj</button>
  </aside>
</template>
