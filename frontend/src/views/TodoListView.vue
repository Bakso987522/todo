<template>
  <div v-if="todoStore.todoList"
      :class="todoStore.todoList.color"
  class="max-w-5xl mx-auto m-4 mt-4 p-8 rounded-lg shadow-md"
  >
    <h2 class="text-2xl font-bold mb-4">{{ todoStore.todoList.name }}</h2>
    <p class="text-gray-400 mb-2">{{ todoStore.todoList.description }}</p>

    <!-- Formularz dodawania zadania -->
    <div class="flex flex-col sm:flex-row gap-2 mb-4 md:max-w-5xl">
      <input
          id="new-task"
          v-model="newItem"
          @focus="newTaskActive = true"
          @blur="newTaskActive = false"
          @keyup.enter="addItem"
          placeholder="Dodaj zadanie..."
          class="flex-1 px-4 py-2 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
          @click="addItem"
          class="px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition"
          :class="todoStore.todoList.color"
      >
        Dodaj zadanie
      </button>
    </div>
    <div v-if="newTaskMenu" class="flex flex-col sm:flex-row gap-2 mb-4">
      <div class="flex flex-col">
      <p>Do kiedy?</p>
      <input
          type="date"
          :min="new Date().toISOString().split('T')[0]"
          @focus="newTaskActive = true"
          @blur="newTaskActive = false"
          v-model="deadline"
          class="block px-2 py-1 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
      </div>
      <div class="flex flex-col">
      <p>Hasło kluczowe?</p>
        <input
            type="text"
            v-model="keyword"
            @focus="newTaskActive = true"
            @blur="newTaskActive = false"
            class="px-2 py-1 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="#hashtag np. #praca"
      >
      </div>
    </div>

    <!-- Task list -->
    <ul v-if="tasks.length" class="space-y-2 md:max-w-5xl">
      <li
          v-for="(item, index) in tasks"
          :key="item.id"
          class="flex justify-between items-center p-2 bg-gray-700 border border-gray-400 rounded-lg shadow-sm relative"
          :class="item.deadline ? 'pt-4' : ''"
      >
        <!-- Checkbox -->
        <input
            type="checkbox"
            class="mr-3 w-4 h-4 rounded-full"
            :checked="item.is_done"
            @change="toggleDone(index)"
            :class="[todoStore.todoList.color, item.deadline ? '-translate-y-1' : '']"
        />

        <!-- Name of task -->
        <span
            class="text-gray-400 mr-3 absolute left-11 top-1 text-xs font-thins"
        >
          {{item.deadline}}
        </span>
        <span
            class="break-words w-full pr-4"
            :class="{ 'line-through text-gray-400': item.is_done }"
        >
          {{ item.name }}
        </span>

        <!-- More/menu -->
        <div class="relative">
          <button @click="toggleMenu(index)" class="text-white px-2 translate-y-1 hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M4 13.5V19h5.5L19 9.5l-5.5-5.5L4 13.5z" />
            </svg>
          </button>

          <div
              v-if="openMenuIndex === index"
              class="absolute right-0 mt-2 w-24 bg-white text-gray-800 rounded shadow-lg"
          >
            <button
                @click="editTask(index)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Edytuj
            </button>
            <button
                @click="removeTask(index)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Usuń
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Case when no tasks -->
    <p v-else class="text-gray-400">Brak zadań do wyświetlenia.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTodoStore } from '@/stores/todoStore'

const authStore = useAuthStore()
const todoStore = useTodoStore()

const newItem = ref('')
const openMenuIndex = ref(null)
const newTaskActive = ref(false)
const newTaskMenu = computed(() =>{
  return newTaskActive.value || newItem.value.trim() !== ''
    })

const tasks = computed(() => todoStore.todoList?.todo_items || [])


async function addItem() {
  if (newItem.value.trim()) {
    await todoStore.addTodoItem(newItem.value)
    newItem.value = ''
  }
}
onMounted(async () => {
  if (!todoStore.todoList) {
    await todoStore.fetchTodoLists()
    if (todoStore.todoLists.length > 0) {
      await todoStore.fetchTodoList(todoStore.todoLists[0].id)
    }
  }
})


function removeTask(index) {
  tasks.value.splice(index, 1)
}

function toggleMenu(index) {
  openMenuIndex.value = openMenuIndex.value === index ? null : index
}

async function toggleDone(index) {
  const task = tasks.value[index]
  task.is_done = !task.is_done
  await todoStore.updateTodoItem(task.id, { is_done: task.is_done })
}

function editTask(index) {
  console.log('Edytuj zadanie:', tasks.value[index])
}
</script>
