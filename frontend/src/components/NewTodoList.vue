<template>
  <div class="flex flex-col lg:flex-row max-w-6xl mx-auto gap-2 mt-6 md:mt-2">
    <div class="bg-gray-800 p-4 md:p-8  lg:m-4 rounded-lg w-full lg:w-1/3 h-1/2">
      <h2 class="text-2xl font-bold mb-4">Dodaj nową listę todo</h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 text-gray-800">
        <input
            v-model="name"
            type="text"
            placeholder="Nazwa nowej listy"
            required
            class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
            v-model="description"
            placeholder="Opcjonalnie opis nowej listy"
            class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <p class="text-gray-400">Kolor listy</p>
        <ColorPicker v-model="todoStore.tempTodoList.color_id" :colors="colors" />
        <LoadingButton
            text="Dodaj nową listę"
            loadingText="Dodawanie..."
            :loading="todoStore.loading"
        />
      </form>
    </div>
    <div class="relative flex-1 w-full lg:w-2/3">
      <div class="absolute inset-0 z-40 group"></div>
      <TodoList
          :todoList="todoList"
          :todoItems="[
          { id: 1, name: 'Przykładowe zadanie ', is_done: false },
          { id: 1, name: 'Przykładowe zadanie z datą i tagiem', is_done: false, deadline: '2023-09-30', tag: {name: '#praca'} },
          { id: 2, name: 'Zrobione zadanie', is_done: true }
        ]"
          :loading="false"
          :adding="false"
          :readonly="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TodoList from "@/components/TodoList.vue"
import { useTodoStore } from "@/stores/todoStore"
import LoadingButton from "@/components/LoadingButton.vue"
import { useUiStore } from "@/stores/uiStore.js"
import ColorPicker from "@/components/ColorPicker.vue"

const uiStore = useUiStore()
const todoStore = useTodoStore()

const colors = computed(() => uiStore.colors)
const name = ref('')
const description = ref('')
const todoList = computed(() => ({
  id: 1,
  name: name.value || 'Tutaj będzie nazwa Twojej listy',
  description: description.value || 'Tutaj będzie opis Twojej listy, ale spokojnie nie jest on wymagany ',
  color:  uiStore.activeColor
}))

async function handleSubmit() {
  const newList = {
    name: name.value,
    description: description.value,
    color_id: todoStore.tempTodoList.color_id,
  }
  await todoStore.addTodoList(newList)
  uiStore.setTodoView()
  if(todoStore.error){
    await todoStore.initializeTodoLists()
  }else{
    uiStore.currentList = todoStore.todoList?.id
    uiStore.showConfirmationNotification('Pomyślnie dodano nową listę')
  }

}
</script>
