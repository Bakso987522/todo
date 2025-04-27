<template>
  <li class="flex justify-between items-center p-2 bg-gray-700 border border-gray-400 rounded-lg shadow-sm">
    <span class="break-words w-full pr-4" :class="{ 'line-through text-gray-400': item.is_done }">
      {{ item.name }}
    </span>
    <button
        @click="$emit('remove', item.id)"
        class="text-sm text-red-500 hover:text-red-600 transition whitespace-nowrap"
    >
      Usuń
    </button>
  </li>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['remove'])
</script>
