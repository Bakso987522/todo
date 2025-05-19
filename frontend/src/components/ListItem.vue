<template>
<li
    :key="item.id"
    class="flex group justify-between items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md relative hover:scale-[1.01] transition-transform duration-100"
    :class="item.deadline ? 'pt-4' : ''"
>
<!-- Checkbox -->
<input
    type="checkbox"
    class="mr-3 w-5 h-5 cursor-pointer transition-all duration-300"
    :checked="item.is_done"
    @change="emit('toggleDone', index)"
    :class="[color, item.deadline ? '-translate-y-1' : '']"
/>

<!-- Name of task -->
  <div class="flex-1 ">
      <span v-if="item.deadline" class="text-xs text-gray-400 absolute left-12 top-1">
        {{ item.deadline }}
      </span>
    <p
        class="text-white break-words break-all pr-4 select-text"
        :class="{
          'line-through text-gray-500 opacity-60': item.is_done,
          'mt-1': item.deadline,
          'mb-2': item.tag
        }"
    >
      {{ item.name }}
    </p>
    <p
        v-if="item?.tag?.name"
        class="text-xs italic absolute left-12 bottom-1"
    >
      {{ item.tag.name }}
    </p>
  </div>

    <button
        @click="emit('removeTask', index)"
        class="hover:scale-110 hover:opacity-70 transition-all duration-200 opacity-0 group-hover:opacity-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
</li>
</template>
<script setup>
import { ref } from 'vue'


const hover = ref(false)

const props = defineProps({
  item: Object,
  color: String,
  index: Number
})
const emit = defineEmits([
  'toggleDone',
  'editTask',
  'removeTask'
])
</script>