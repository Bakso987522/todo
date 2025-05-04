<template>
  <div v-if="todoStore.todoList.id && !todoStore.loading"
       :class="todoStore.todoList.color.name"
       class="max-w-5xl mx-auto m-4 mt-4 p-8 rounded-lg shadow-md transition animate-in fade-in duration-500"
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
      <LoadingButton
          text="Dodaj zadanie"
          :loading="todoStore.adding"
          loadingText="Dodawanie..."
          @click="addItem"
          :color="todoStore.todoList.color.name"
      />
    </div>
    <transition
      enter-active-class="animate-in fade-in slide-in-from-top duration-500"
      leave-active-class="animate-out fade-out slide-out-to-top duration-500 delay-500"
      >
    <div v-show="newTaskMenu" class="flex flex-col sm:flex-row gap-2 mb-4">
      <div class="flex flex-col">
        <p>Do kiedy?</p>
        <input
            type="date"
            @change="test"
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
            v-model="tagName"
            @focus="newTaskActive = true"
            @blur="newTaskActive = false"
            class="px-2 py-1 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="#hashtag np. #praca"
        >
      </div>
    </div>
    </transition>

    <!-- Task list -->
    <ul v-if="tasks.length" class="space-y-2 md:max-w-5xl">
<ListItem
    v-for="(item, index) in tasks"
    :key="item.id"
    :item="item"
    :index="index"
    @toggleDone="toggleDone"
    @editTask="editTask"
    @removeTask="removeTask"
/>
    </ul>


    <!-- Case when no tasks -->
    <p v-else class="text-gray-400">Brak zadań do wyświetlenia.</p>
  </div>
  <div
      v-else
      class="flex-1 w-full h-full bg-gray-900 bg-opacity-80 flex items-center justify-center z-50"
  >
    <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>



</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTodoStore } from '@/stores/todoStore'
import ListItem from "@/components/ListItem.vue";
import LoadingButton from "@/components/LoadingButton.vue";

const authStore = useAuthStore()
const todoStore = useTodoStore()

const newItem = ref('')
const openMenuIndex = ref(null)
const newTaskActive = ref(false)
const deadline = ref(null)
const tagName = ref('')
const newTaskMenu = computed(() =>{
  return newTaskActive.value || newItem.value.trim() !== ''
})

const tasks = computed(() => todoStore.todoList?.todo_items || [])
async function addItem() {
  if (newItem.value.trim()) {
    await todoStore.addTodoItem(newItem.value, deadline.value ?? null, tagName.value ?? null)
    newItem.value = ''
  }
}
function removeTask(index) {
  tasks.value.splice(index, 1)
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
