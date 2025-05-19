<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Number,
  colors: Array
})

const emit = defineEmits(['update:modelValue'])

const color = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', Number(val))
})
</script>

<template>
  <div class="color-picker flex gap-2 flex-wrap">
    <label
        v-for="c in colors"
        :key="c.id"
        class="cursor-pointer"
    >
      <input
          type="radio"
          name="color"
          :value="c.id"
          v-model="color"
          class="hidden"
      />
      <span
          class="block w-5 h-5 rounded-full shadow-inner transition duration-200"
          :class="[
          c.name,
          c.id === color ? 'scale-110 ring-2 ring-white' : ''
        ]"
      ></span>
    </label>
  </div>
</template>
