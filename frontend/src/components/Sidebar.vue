<script setup>
import {onMounted, ref} from 'vue'
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
      <li class="hover:cursor-pointer hover:text-gray-500" v-for="todoList in todoStore.todoLists" :key="todoList.id" @click="todoStore.fetchTodoList(todoList.id)">
        {{todoList.name}}
      </li>
        <li v-if="isAdding">
          <input
              type="text"
              @keyup.enter="addTodoList"
              class="w-full flex-1 px-4 py-2 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:max-w-xl"
              placeholder="Dodaj zadanie..."
          >
        </li>
        <li>
          <button
              class="w-full flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              @click="isAdding = !isAdding"
          >
            Toggle Add
          </button>
        </li>
      </ul>
    </nav>
    <button @click="handleLogout" :disabled="auth.loading" class="hover:text-gray-500  disabled:opacity-40">Wyloguj</button>
  </aside>
</template>
