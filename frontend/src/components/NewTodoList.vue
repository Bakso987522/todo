<template>
  <div class="flex flex-col md:flex-row max-w-6xl mx-auto gap-4">
    <div class="bg-gray-800 p-8 m-4 rounded-lg ">
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
      <div class="color-picker flex">
        <label
            v-for="c in colors"
            :key="c.id"
            class="inline-block w-4 h-4 mx-auto cursor-pointer relative"
        >
          <input
              type="radio"
              name="colors"
              :value="c.id"
              v-model="color"
              class="hidden"
          >
          <span
              class="block w-5 h-5 rounded-full shadow-xl transition duration-200 ease-in-out"
              :class="[c.name, c.id === color ? 'scale-110 border border-white' : '']"
          ></span>
        </label>
      </div>

<LoadingButton text="Dodaj nową listę"  loadingText="Dodawanie..." :loading="todoStore.loading" />



    </form>
    </div>
    <div class="relative flex-1">
      <div  class="absolute inset-0 z-[999]"></div>
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
import {computed, ref} from 'vue'
import TodoList from "@/components/TodoList.vue";
import {useTodoStore} from "@/stores/todoStore";
import LoadingButton from "@/components/LoadingButton.vue";
import {useUiStore} from "@/stores/uiStore.js";


const uiStore = useUiStore()

const todoStore = useTodoStore()

const colors = computed(() => todoStore.colors)
const name = ref('')
const description = ref('')
const color = ref(1)
const todoList = computed(() => ({
  id: 1,
  name: name.value || 'Tutaj będzie nazwa Twojej listy',
  description: description.value || 'Tutaj będzie opis Twojej listy, ale spokojnie nie jest on wymagany ',
  color: {name: colors?.value.find(c => c.id === color.value).name || 'blue' }
}))

async function handleSubmit() {
  const newList = {
    name: name.value,
    description: description.value,
    color_id: color.value,
  }
  await todoStore.addTodoList(newList)
  uiStore.setTodoView()
  uiStore.currentList = todoStore.todoList.id
}
</script>