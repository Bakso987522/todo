<template>
  <button
      :disabled="loading"
      class="flex items-center justify-center gap-2 px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition duration-300"
      :class="color"
      @click="emit('click')"
  >
    <span
        v-if="loading && spin"
        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    ></span>
    <span>{{ loading ? loadingText : text }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true },
  loading: { type: Boolean, default: false },
  loadingText: { type: String, default: 'Ładowanie...' },
  color: { type: String, default: 'bg-blue-500' },
  spin: { type: Boolean, default: true }
})

const emit = defineEmits([
    'click'
])
</script>
