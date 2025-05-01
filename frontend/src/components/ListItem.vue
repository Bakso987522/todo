<template>
<li
    :key="item.id"
    class="flex justify-between items-center p-2 bg-gray-700 border border-gray-400 rounded-lg shadow-sm relative animate-in fade-in slide-in-from-bottom duration-500"
    :class="item.deadline ? 'pt-4' : ''"
>
<!-- Checkbox -->
<input
    type="checkbox"
    class="mr-3 w-4 h-4 rounded-full"
    :checked="item.is_done"
    @change="emit('toggleDone', item.id)"
    :class="[color, item.deadline ? '-translate-y-1' : '']"
/>

<!-- Name of task -->
<span
    class="text-gray-400 mr-3 absolute left-11 top-1 text-xs font-thins"
>
          {{item.deadline}}
        </span>
<span
    class="break-words w-full pr-4"
    :class="{ 'line-through text-gray-400 opacity-60': item.is_done }"
>
          {{ item.name }}
        </span>

<!-- More/menu -->
<div class="relative">
  <p v-if="item?.tag?.name">{{ item.tag.name }}</p>
  <button @click="toggleMenu(index)" class="text-white px-2 translate-y-1 hover:text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M4 13.5V19h5.5L19 9.5l-5.5-5.5L4 13.5z" />
    </svg>
  </button>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-300 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg>


  <div
      v-if="openMenuIndex === index"
      class="absolute right-0 mt-2 w-24 bg-white text-gray-800 rounded shadow-lg"
  >
    <button
        @click="emit('editTask', index)"
        class="block w-full text-left px-4 py-2 hover:bg-gray-200"
    >
      Edytuj
    </button>
    <button
        @click="emit('removeTask', index)"
        class="block w-full text-left px-4 py-2 hover:bg-gray-200"
    >
      Usuń
    </button>
  </div>
</div>
</li>
</template>
<script setup>
import { ref } from 'vue'


const openMenuIndex = ref(null)
const props = defineProps({
  item: Object,
  color: String,
})
const emit = defineEmits([
  'toggleDone',
  'editTask',
  'removeTask'
])
function toggleMenu(index) {
  openMenuIndex.value = openMenuIndex.value === index ? null : index
}
</script>