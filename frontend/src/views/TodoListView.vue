<template>
  <div class="max-w-screen-md mx-auto mt-5">
    <h1 v-if="!isLogged" class="text-2xl font-bold text-red-600 mb-9">Zaloguj się, aby zachować zawartość listy</h1>
    <h2 class="text-2xl font-bold mb-4">Moje zadania</h2>
    <div class="flex gap-2 mb-4">
      <input
          v-model="newTask"
          @keyup.enter="addTask"
          class="flex-1 px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Dodaj zadanie..."
      />
      <button
          @click="addTask"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Dodaj zadanie
      </button>
    </div>

    <ul class="space-y-2">
      <li
          v-for="(task, index) in tasks"
          :key="index"
          class="flex max-w-auto justify-between items-center p-2 break-words bg-gray-700 border border-gray-400 rounded-lg shadow-sm"
      >
        <span>{{ task }}</span>
        <button
            @click="removeTask(index)"
            class="text-sm text-red-500 hover:text-red-600 transition"
        >
          Usuń
        </button>
      </li>
    </ul>


  </div>
</template>

<script setup>
import { ref } from 'vue'
const isLogged = ref(false);
const newTask = ref('')
const tasks = ref([])

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

function removeTask(index) {
  tasks.value.splice(index, 1)
}
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded mb-4;
}
</style>
