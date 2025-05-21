<template>
  <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
    <label class="flex items-center gap-2 text-sm text-white">
      Sortuj według:
      <select
          v-model="sortBy"
          @change="applySort"
          class="bg-gray-700 text-white rounded px-2 py-1 focus:outline-none"
      >
        <option value="created_at">Data dodania</option>
        <option value="name">Nazwa</option>
        <option value="deadline">Termin</option>
        <option value="tag.name">Tag</option>
      </select>
    </label>

    <label class="flex items-center gap-2 text-sm text-white">
      Kierunek:
      <select
          v-model="sortDirection"
          @change="applySort"
          class="bg-gray-700 text-white rounded px-2 py-1 focus:outline-none"
      >
        <option value="desc">Malejąco</option>
        <option value="asc">Rosnąco</option>
      </select>
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()

const sortBy = ref('created_at')
const sortDirection = ref('desc')

watch(
    () => [...(todoStore.todoList?.todo_items || [])].map(i => i.id).join(),
    () => {
      applySort()
    }
)

function applySort() {
  todoStore.sortTodoItems(sortBy.value, sortDirection.value)
}
</script>
