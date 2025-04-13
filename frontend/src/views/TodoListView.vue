<template>
  <div class="w-full mt-10 p-6 ">
    <h2 class="text-2xl font-bold mb-4">Moje zadania</h2>

    <div class="flex flex-col sm:flex-row gap-2 mb-4">
      <input
          v-model="newTask"
          @keyup.enter="addTask"
          class="flex-1 px-4 py-2 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:max-w-xl"
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
          class="flex justify-between items-center p-2 bg-gray-700 border border-gray-400 rounded-lg shadow-sm"
      >
        <span class="break-words w-full pr-4">{{ task }}</span>
        <button
            @click="removeTask(index)"
            class="text-sm text-red-500 hover:text-red-600 transition whitespace-nowrap"
        >
          Usuń
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const isLogged = useAuthStore().isLogged
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
