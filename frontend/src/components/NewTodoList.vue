<template>
  <div class="flex flex-col md:flex-row max-w-6xl mx-auto gap-4">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold mb-4">Dodaj nową listę todo</h2>
      <input
          v-model="name"
          type="text"
          placeholder="Nazwa nowej listy"
          required
          class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
          v-model="description"
          placeholder="Opis nowej listy"
          class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
      <input
          v-model="color"
          type="color"
          class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
          type="submit"
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
      >
        Dodaj
      </button>
    </form>
<TodoList />
  </div>

</template>

<script setup>
import { ref } from 'vue'
import TodoList from "@/components/TodoList.vue";

const name = ref('')
const description = ref('')
const color = ref('#ffffff')

function handleSubmit() {
  const newList = {
    name: name.value,
    description: description.value,
    color: color.value,
  }
  console.log('New Todo List:', newList)
  // Add logic to store the new list
}
</script>