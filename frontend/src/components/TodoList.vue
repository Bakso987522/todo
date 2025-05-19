<template>
  <div v-auto-animate v-if="todoList?.id && !loading &&  useUiStore().colors"
       :class="useUiStore().activeColor"
       class="relative max-w-5xl mx-auto m-4 mt-4 p-8 rounded-lg shadow-md max-h-fit transition-all animate-in fade-in duration-500"
  >
    <svg
        v-if="readonly" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye absolute top-4 right-4 text-gray-400">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    <button
        v-else
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200"
        @click="readonly = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
      <path d="M11 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>


    </button>
    <div v-if="!readonly">
    <h2 class="text-2xl font-bold mb-4">{{ todoList.name }}</h2>
    <p class="text-gray-400 mb-2">{{ todoList.description }}</p>
    </div>
  <div v-else class="flex flex-col">
    <h2 class="absolute top-4 left-4 italic">Widok edycji - tytuł, opis, kolor</h2>
    <input v-model="todoList.name" class="text-2xl font-bold border-none focus:outline-none w-full bg-transparent mb-4 mt-5" placeholder="Tutaj wpisz tytuł" autofocus>
    <input v-model="todoList.description" class="text-gray-400 mb-2 border- focus:outline-none w-full bg-transparent" placeholder="Tutaj możesz wpisać opis">
    <ColorPicker v-model="todoList.color_id" :colors="useUiStore().colors" class="my-3"/>

  </div>

    <div class="flex flex-col sm:flex-row gap-2 mb-4 md:max-w-5xl">

      <input
          v-if="!readonly"
          id="new-task"
          v-model="newItem"
          @focus="newTaskActive = true"
          @blur="newTaskActive = false"
          @keyup.enter="emitAddItem"
          placeholder="Dodaj zadanie..."
          class="flex-1 px-4 py-2 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />


    <LoadingButton
        v-else
        text="Anuluj"
        :color="uiStore.activeColor"
        @click="readonly= false"
    />
      <LoadingButton
          v-if="!readonly"
          text="Dodaj zadanie"
          :loading="adding"
          loadingText="Dodawanie..."
          @click="emitAddItem"
          :color="uiStore.activeColor"
      />
      <LoadingButton text="Zapisz zmiany"
                     :color="uiStore.activeColor"
                     :loading="loading"
                     loadingText="Zapisywanie..."
                     @click="handleSave"
                     v-else
      />
    </div>

    <div
        v-if="newTaskMenu"
    >
      <div class="overflow-hidden flex flex-col sm:flex-row gap-2 mb-4">
        <div class="flex flex-col">
          <p>Do kiedy?</p>
          <input
              type="date"
              :min="new Date().toISOString().split('T')[0]"
              v-model="deadline"
              class="block px-2 py-1 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div class="flex flex-col">
          <p>Hasło kluczowe?</p>
          <input
              type="text"
              v-model="tagName"
              class="px-2 py-1 border text-gray-800 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="#hashtag np. #praca"
          />
        </div>
      </div>
    </div>

<ul v-auto-animate class="relative space-y-2 md:max-w-5xl" :class="readonly ? 'pointer-events-none' : ''">
      <ListItem
          v-if="todoItems.length"
          v-for="(item, index) in todoItems"
          :key="item.id"
          :item="item"
          :index="index"
          @toggleDone="$emit('toggle-done', index)"
          @editTask="$emit('edit-task', index)"
          @removeTask="$emit('remove-task', index)"
      />
        <li v-else class="text-gray-400">Brak zadań do wyświetlenia.</li>
</ul>

  </div>

  <div v-else class="flex-1 w-full h-full bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
    <div class="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ListItem from "@/components/ListItem.vue";
import LoadingButton from "@/components/LoadingButton.vue";
import {useUiStore} from "@/stores/uiStore.js";
import ColorPicker from "@/components/ColorPicker.vue";
const uiStore = useUiStore()
const readonly = ref(false)
const props = defineProps({
  todoList: Object,
  todoItems: Array,
  loading: {
    type: Boolean,
    default: false
  },
  adding: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['add-item', 'toggle-done', 'remove-task', 'edit-task', 'edit-list'])
const newItem = ref('')
const newTaskActive = ref(false)
const deadline = ref(null)
const tagName = ref('')

const newTaskMenu = computed(() => newTaskActive.value || newItem.value.trim() !== '')

function emitAddItem() {
  if (newItem.value.trim()) {
    emit('add-item', {
      name: newItem.value,
      deadline: deadline.value ?? null,
      tag: tagName.value ?? null
    })
    newItem.value = ''
  }
}
</script>
